import { JsonConvert, JsonConverter, OperationMode, ValueCheckingMode } from 'json2typescript';
import { AbstractConverter, ensureIsArray } from './AbstractConverter';
import ShapeBpmnElement from '../../../../model/bpmn/shape/ShapeBpmnElement';
import { ShapeBpmnElementKind } from '../../../../model/bpmn/shape/ShapeBpmnElementKind';
import { Semantic } from '../Definitions';
import SequenceFlow from '../../../../model/bpmn/edge/SequenceFlow';

const convertedFlowNodeBpmnElements: ShapeBpmnElement[] = [];
const convertedLaneBpmnElements: ShapeBpmnElement[] = [];
const convertedSequenceFlows: SequenceFlow[] = [];

const flowNodeKinds = Object.values(ShapeBpmnElementKind).filter(kind => {
  return kind != ShapeBpmnElementKind.LANE;
});

export function findFlowNodeBpmnElement(id: string): ShapeBpmnElement {
  return convertedFlowNodeBpmnElements.find(i => i.id === id);
}

export function findLaneBpmnElement(id: string): ShapeBpmnElement {
  return convertedLaneBpmnElements.find(i => i.id === id);
}

export function findSequenceFlow(id: string): SequenceFlow {
  return convertedSequenceFlows.find(i => i.id === id);
}

// TODO : To move in a singleton object to use here and in the BpmnJsonParser
const jsonConvert: JsonConvert = new JsonConvert();
jsonConvert.operationMode = OperationMode.ENABLE;
jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
//////////////////////////////////////////////////////////////

@JsonConverter
export default class SemanticConverter extends AbstractConverter<Semantic> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize(processes: Array<any> | any): Semantic {
    try {
      // Deletes everything in the array, which does hit other references. More performant.
      convertedFlowNodeBpmnElements.length = 0;
      convertedLaneBpmnElements.length = 0;
      convertedSequenceFlows.length = 0;

      ensureIsArray(processes).forEach(process => this.parseProcess(process));

      const sequenceFlows = convertedSequenceFlows;
      const shapeBpmnElements = convertedLaneBpmnElements.concat(convertedLaneBpmnElements);

      return { shapeBpmnElements, sequenceFlows };
    } catch (e) {
      // TODO error management
      console.log(e as Error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseProcess(process: { [index: string]: any }): void {
    flowNodeKinds.forEach(kind => this.buildFlowNodeBpmnElement(process[kind], kind));

    // containers
    this.buildLaneBpmnElement(process[ShapeBpmnElementKind.LANE]);
    this.buildLaneSetBpmnElement(process['laneSet']);

    // flows
    this.buildSequenceFlow(process['sequenceFlow']);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildFlowNodeBpmnElement(bpmnElements: Array<any> | any, kind: ShapeBpmnElementKind): void {
    ensureIsArray(bpmnElements).forEach(bpmnElement => convertedFlowNodeBpmnElements.push(new ShapeBpmnElement(bpmnElement.id, bpmnElement.name, kind)));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildLaneSetBpmnElement(laneSet: any): void {
    if (laneSet) {
      this.buildLaneBpmnElement(laneSet.lane);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildLaneBpmnElement(lanes: Array<any> | any): void {
    ensureIsArray(lanes).forEach(lane => {
      const laneShape = new ShapeBpmnElement(lane.id, lane.name, ShapeBpmnElementKind.LANE);
      convertedLaneBpmnElements.push(laneShape);
      this.assignParent(lane);
    });
  }

  private assignParent(lane: any) {
    ensureIsArray(lane.flowNodeRef).forEach(flowNodeRef => {
      const shapeBpmnElement = findFlowNodeBpmnElement(flowNodeRef);
      if (shapeBpmnElement) {
        shapeBpmnElement.parentId = lane.id;
      } else {
        // TODO error management
        console.log('Lane element with id ' + flowNodeRef + ' is not found');
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private buildSequenceFlow(bpmnElements: Array<any> | any): void {
    const t = jsonConvert.deserializeArray(ensureIsArray(bpmnElements), SequenceFlow);
    convertedSequenceFlows.push(...t);
  }
}

@JsonConverter
export class SequenceFlowConverter extends AbstractConverter<SequenceFlow> {
  deserialize(data: string): SequenceFlow {
    return findSequenceFlow(data);
  }
}
