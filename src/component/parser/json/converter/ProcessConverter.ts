/* eslint-disable @typescript-eslint/ban-ts-ignore */
/**
 * Copyright 2020 Bonitasoft S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import ShapeBpmnElement, { ShapeBpmnActivity, ShapeBpmnBoundaryEvent, ShapeBpmnEvent } from '../../../../model/bpmn/shape/ShapeBpmnElement';
import { ShapeBpmnElementKind } from '../../../../model/bpmn/shape/ShapeBpmnElementKind';
import { AssociationFlow, SequenceFlow } from '../../../../model/bpmn/edge/Flow';
import { ShapeBpmnEventKind, supportedBpmnEventKinds } from '../../../../model/bpmn/shape/ShapeBpmnEventKind';
import ShapeUtil, { BpmnEventKind } from '../../../../model/bpmn/shape/ShapeUtil';
import { SequenceFlowKind } from '../../../../model/bpmn/edge/SequenceFlowKind';
import { ShapeBpmnSubProcessKind } from '../../../../model/bpmn/shape/ShapeBpmnSubProcessKind';
import { FlowKind } from '../../../../model/bpmn/edge/FlowKind';
import { TProcess } from '../../xml/bpmn-json-model/baseElement/rootElement/rootElement';
import { TBoundaryEvent, TCatchEvent, TThrowEvent } from '../../xml/bpmn-json-model/baseElement/flowNode/event';
import { TActivity, TSubProcess } from '../../xml/bpmn-json-model/baseElement/flowNode/activity/activity';
import { TLane, TLaneSet } from '../../xml/bpmn-json-model/baseElement/baseElement';
import { TFlowNode, TSequenceFlow } from '../../xml/bpmn-json-model/baseElement/flowElement';
import { TAssociation, TTextAnnotation } from '../../xml/bpmn-json-model/baseElement/artifact';
import { AssociationDirectionKind } from '../../../../model/bpmn/edge/AssociationDirectionKind';
import { bpmnEventKinds, findEventDefinitionOfDefinitions } from './EventDefinitionConverter';
import { ensureIsArray } from './ConverterUtil';
import { ShapeBpmnMarkerKind } from '../../../../model/bpmn/shape/ShapeBpmnMarkerKind';
import { TEventBasedGateway } from '../../xml/bpmn-json-model/baseElement/flowNode/gateway';
import { TReceiveTask } from '../../xml/bpmn-json-model/baseElement/flowNode/activity/task';
import { ShapeBpmnSubProcess } from '../../../../model/bpmn/shape/ShapeBpmnElement';

const convertedFlowNodeBpmnElements: Map<string, ShapeBpmnElement> = new Map();
const convertedLaneBpmnElements: Map<string, ShapeBpmnElement> = new Map();
const convertedProcessBpmnElements: Map<string, ShapeBpmnElement> = new Map();
const convertedSequenceFlows: Map<string, SequenceFlow> = new Map();
const convertedAssociationFlows: Map<string, AssociationFlow> = new Map();

const defaultSequenceFlowIds: string[] = [];

export function findFlowNodeBpmnElement(id: string): ShapeBpmnElement {
  return convertedFlowNodeBpmnElements.get(id);
}

export function findLaneBpmnElement(id: string): ShapeBpmnElement {
  return convertedLaneBpmnElements.get(id);
}

export function findProcessBpmnElement(id: string): ShapeBpmnElement {
  return convertedProcessBpmnElements.get(id);
}

export function findSequenceFlow(id: string): SequenceFlow {
  return convertedSequenceFlows.get(id);
}

export function findAssociationFlow(id: string): AssociationFlow {
  return convertedAssociationFlows.get(id);
}

interface EventDefinition {
  kind: ShapeBpmnEventKind;
  counter: number;
}

type FlowNode = TFlowNode | TActivity | TReceiveTask | TEventBasedGateway | TTextAnnotation;

export default class ProcessConverter {
  deserialize(processes: string | TProcess | (string | TProcess)[]): void {
    try {
      convertedFlowNodeBpmnElements.clear();
      convertedLaneBpmnElements.clear();
      convertedProcessBpmnElements.clear();
      convertedSequenceFlows.clear();
      convertedAssociationFlows.clear();

      // Deletes everything in the array, which does hit other references. For better performance.
      defaultSequenceFlowIds.length = 0;

      ensureIsArray(processes).forEach((process) => this.parseProcess(process));
    } catch (e) {
      // TODO error management
      console.error(e as Error);
    }
  }

  parseProcess(process: TProcess): void {
    const processId = process.id;
    convertedProcessBpmnElements.set(processId, new ShapeBpmnElement(processId, process.name, ShapeBpmnElementKind.POOL));

    // flow nodes
    ShapeUtil.flowNodeKinds()
      .filter((kind) => kind != ShapeBpmnElementKind.EVENT_BOUNDARY)
      .forEach((kind) => this.buildFlowNodeBpmnElements(processId, process[kind], kind));
    // process boundary events afterwards as we need its parent activity to be available when building it
    this.buildFlowNodeBpmnElements(processId, process.boundaryEvent, ShapeBpmnElementKind.EVENT_BOUNDARY);

    // containers
    this.buildLaneBpmnElements(processId, process[ShapeBpmnElementKind.LANE]);
    this.buildLaneSetBpmnElements(processId, process['laneSet']);

    // flows
    this.buildSequenceFlows(process[FlowKind.SEQUENCE_FLOW]);
    this.buildAssociationFlows(process[FlowKind.ASSOCIATION_FLOW]);
  }

  private buildFlowNodeBpmnElements(processId: string, bpmnElements: Array<FlowNode> | FlowNode, kind: ShapeBpmnElementKind): void {
    ensureIsArray(bpmnElements).forEach((bpmnElement) => {
      let shapeBpmnElement;

      if (ShapeUtil.isEvent(kind)) {
        shapeBpmnElement = this.buildShapeBpmnEvent(bpmnElement, kind as BpmnEventKind, processId);
      } else if (ShapeUtil.isActivity(kind)) {
        shapeBpmnElement = this.buildShapeBpmnActivity(bpmnElement, kind, processId);
      } else {
        // @ts-ignore We know that the text & name fields are not on all types, but it's already tested
        const name = kind === ShapeBpmnElementKind.TEXT_ANNOTATION ? bpmnElement.text : bpmnElement.name;
        // @ts-ignore We know that the instantiate field is not on all types, but it's already tested
        shapeBpmnElement = new ShapeBpmnElement(bpmnElement.id, name, kind, processId, bpmnElement.instantiate);
      }

      // @ts-ignore We know that the default field is not on all types, but it's already tested
      const defaultFlow = bpmnElement.default;
      if (ShapeUtil.isWithDefaultSequenceFlow(kind) && defaultFlow) {
        defaultSequenceFlowIds.push(defaultFlow);
      }

      if (shapeBpmnElement) {
        convertedFlowNodeBpmnElements.set(shapeBpmnElement.id, shapeBpmnElement);
      }
    });
  }

  private buildShapeBpmnActivity(bpmnElement: TActivity, kind: ShapeBpmnElementKind, processId: string): ShapeBpmnActivity {
    const markers = this.buildMarkers(bpmnElement);

    if (ShapeUtil.isSubProcess(kind)) {
      return this.buildShapeBpmnSubProcess(bpmnElement, processId, markers);
    }

    // @ts-ignore
    return new ShapeBpmnActivity(bpmnElement.id, bpmnElement.name, kind, processId, bpmnElement.instantiate, markers);
  }

  private buildMarkers(bpmnElement: TActivity): ShapeBpmnMarkerKind[] {
    const markers: ShapeBpmnMarkerKind[] = [];
    // @ts-ignore We know that the standardLoopCharacteristics field is not on all types, but it's already tested
    const standardLoopCharacteristics = bpmnElement.standardLoopCharacteristics;
    // @ts-ignore We know that the multiInstanceLoopCharacteristics field is not on all types, but it's already tested
    const multiInstanceLoopCharacteristics = ensureIsArray(bpmnElement.multiInstanceLoopCharacteristics, true)[0];
    if (standardLoopCharacteristics || standardLoopCharacteristics === '') {
      markers.push(ShapeBpmnMarkerKind.LOOP);
    } else if (multiInstanceLoopCharacteristics && multiInstanceLoopCharacteristics.isSequential) {
      markers.push(ShapeBpmnMarkerKind.MULTI_INSTANCE_SEQUENTIAL);
    } else if ((multiInstanceLoopCharacteristics && !multiInstanceLoopCharacteristics.isSequential) || multiInstanceLoopCharacteristics === '') {
      markers.push(ShapeBpmnMarkerKind.MULTI_INSTANCE_PARALLEL);
    }
    return markers;
  }

  private buildShapeBpmnEvent(bpmnElement: TCatchEvent | TThrowEvent, elementKind: BpmnEventKind, processId: string): ShapeBpmnEvent {
    const eventDefinitions = this.getEventDefinitions(bpmnElement);
    const numberOfEventDefinitions = eventDefinitions.map((eventDefinition) => eventDefinition.counter).reduce((counter, it) => counter + it, 0);

    // do we have a None Event?
    if (numberOfEventDefinitions == 0 && ShapeUtil.canHaveNoneEvent(elementKind)) {
      return new ShapeBpmnEvent(bpmnElement.id, bpmnElement.name, elementKind, ShapeBpmnEventKind.NONE, processId);
    }

    if (numberOfEventDefinitions == 1) {
      const eventKind = eventDefinitions[0].kind;
      if (supportedBpmnEventKinds.includes(eventKind)) {
        if (ShapeUtil.isBoundaryEvent(elementKind)) {
          return this.buildShapeBpmnBoundaryEvent(bpmnElement as TBoundaryEvent, eventKind);
        }
        return new ShapeBpmnEvent(bpmnElement.id, bpmnElement.name, elementKind, eventKind, processId);
      }
    }
  }

  private buildShapeBpmnBoundaryEvent(bpmnElement: TBoundaryEvent, eventKind: ShapeBpmnEventKind): ShapeBpmnBoundaryEvent {
    const parent = findFlowNodeBpmnElement(bpmnElement.attachedToRef);

    if (ShapeUtil.isActivity(parent?.kind)) {
      return new ShapeBpmnBoundaryEvent(bpmnElement.id, bpmnElement.name, eventKind, bpmnElement.attachedToRef, bpmnElement.cancelActivity);
    } else {
      // TODO error management
      console.warn('The boundary event %s must be attach to an activity, and not to %s', bpmnElement.id, parent?.kind);
    }
  }

  /**
   * Get the list of eventDefinitions hold by the Event bpmElement
   *
   * @param bpmnElement The BPMN element from the XML data which represents a BPMN Event
   */
  private getEventDefinitions(bpmnElement: TCatchEvent | TThrowEvent): EventDefinition[] {
    const eventDefinitions = new Map<ShapeBpmnEventKind, number>();

    bpmnEventKinds.forEach((eventKind) => {
      // sometimes eventDefinition is simple and therefore it is parsed as empty string "", in that case eventDefinition will be converted to an empty object
      const eventDefinition = bpmnElement[eventKind + 'EventDefinition'];
      const counter = ensureIsArray(eventDefinition, true).length;
      eventDefinitions.set(eventKind, counter);
    });

    ensureIsArray<string>(bpmnElement.eventDefinitionRef).forEach((eventDefinitionRef) => {
      const kind = findEventDefinitionOfDefinitions(eventDefinitionRef);
      eventDefinitions.set(kind, eventDefinitions.get(kind) + 1);
    });

    return Array.from(eventDefinitions.keys())
      .map((kind) => {
        return { kind, counter: eventDefinitions.get(kind) };
      })
      .filter((eventDefinition) => {
        return eventDefinition.counter > 0;
      });
  }

  private buildShapeBpmnSubProcess(bpmnElement: TSubProcess, processId: string, markers: ShapeBpmnMarkerKind[]): ShapeBpmnSubProcess {
    if (!bpmnElement.triggeredByEvent) {
      return new ShapeBpmnSubProcess(bpmnElement.id, bpmnElement.name, ShapeBpmnSubProcessKind.EMBEDDED, processId, markers);
    }
    return new ShapeBpmnSubProcess(bpmnElement.id, bpmnElement.name, ShapeBpmnSubProcessKind.EVENT, processId, markers);
  }

  private buildLaneSetBpmnElements(processId: string, laneSets: Array<TLaneSet> | TLaneSet): void {
    ensureIsArray(laneSets).forEach((laneSet) => {
      this.buildLaneBpmnElements(processId, laneSet.lane);
    });
  }

  private buildLaneBpmnElements(processId: string, lanes: Array<TLane> | TLane): void {
    ensureIsArray(lanes).forEach((lane) => {
      const laneShape = new ShapeBpmnElement(lane.id, lane.name, ShapeBpmnElementKind.LANE, processId);
      convertedLaneBpmnElements.set(lane.id, laneShape);
      this.assignParentOfLaneFlowNodes(lane);
    });
  }

  private assignParentOfLaneFlowNodes(lane: TLane): void {
    ensureIsArray<string>(lane.flowNodeRef).forEach((flowNodeRef) => {
      const shapeBpmnElement = findFlowNodeBpmnElement(flowNodeRef);
      const laneId = lane.id;
      if (shapeBpmnElement) {
        if (!ShapeUtil.isBoundaryEvent(shapeBpmnElement.kind)) {
          shapeBpmnElement.parentId = laneId;
        }
      } else {
        // TODO error management
        console.warn('Unable to assign lane %s as parent: flow node %s is not found', laneId, flowNodeRef);
      }
    });
  }

  private buildSequenceFlows(bpmnElements: Array<TSequenceFlow> | TSequenceFlow): void {
    ensureIsArray(bpmnElements).forEach((sequenceFlow) => {
      const kind = this.getSequenceFlowKind(sequenceFlow);
      const convertedSequenceFlow = new SequenceFlow(sequenceFlow.id, sequenceFlow.name, sequenceFlow.sourceRef, sequenceFlow.targetRef, kind);
      convertedSequenceFlows.set(sequenceFlow.id, convertedSequenceFlow);
    });
  }

  private buildAssociationFlows(bpmnElements: Array<TAssociation> | TAssociation): void {
    ensureIsArray(bpmnElements).forEach((association) => {
      // TODO Remove associationDirection conversion type when we merge/simplify internal model with BPMN json model
      const direction = (association.associationDirection as unknown) as AssociationDirectionKind;
      const convertedAssociationFlow = new AssociationFlow(association.id, undefined, association.sourceRef, association.targetRef, direction);
      convertedAssociationFlows.set(association.id, convertedAssociationFlow);
    });
  }

  private getSequenceFlowKind(sequenceFlow: TSequenceFlow): SequenceFlowKind {
    if (defaultSequenceFlowIds.includes(sequenceFlow.id)) {
      return SequenceFlowKind.DEFAULT;
    } else {
      const sourceShapeBpmnElement = findFlowNodeBpmnElement(sequenceFlow.sourceRef);
      if (sourceShapeBpmnElement && ShapeUtil.isWithDefaultSequenceFlow(sourceShapeBpmnElement.kind) && sequenceFlow.conditionExpression) {
        if (ShapeUtil.isActivity(sourceShapeBpmnElement.kind)) {
          return SequenceFlowKind.CONDITIONAL_FROM_ACTIVITY;
        } else {
          return SequenceFlowKind.CONDITIONAL_FROM_GATEWAY;
        }
      }
    }
    return SequenceFlowKind.NORMAL;
  }
}
