import { JsonConvert, JsonConverter } from 'json2typescript';
import { AbstractConverter, ensureIsArray } from './AbstractConverter';
import Shape from '../../../../model/bpmn/shape/Shape';
import Bounds from '../../../../model/bpmn/Bounds';
import ShapeBpmnElement from '../../../../model/bpmn/shape/ShapeBpmnElement';
import Edge from '../../../../model/bpmn/edge/Edge';
import BpmnModel, { Shapes } from '../../../../model/bpmn/BpmnModel';
import { findFlowNodeBpmnElement, findLaneBpmnElement, findProcessBpmnElement } from './ProcessConverter';
import JsonParser from '../JsonParser';
import { findProcessRefParticipant, findProcessRefParticipantByProcessRef } from './CollaborationConverter';

function findProcessElement(participantId: string): ShapeBpmnElement {
  const participant = findProcessRefParticipant(participantId);
  if (participant) {
    const originalProcessBpmnElement = findProcessBpmnElement(participant.processRef);
    const name = participant.name || originalProcessBpmnElement.name;
    return new ShapeBpmnElement(participant.id, name, originalProcessBpmnElement.kind, originalProcessBpmnElement.parentId);
  }
}

@JsonConverter
export default class DiagramConverter extends AbstractConverter<BpmnModel> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize(bpmnDiagram: Array<any> | any): BpmnModel {
    try {
      const plane = bpmnDiagram.BPMNPlane;

      const edges = { edges: this.deserializeEdges(plane.BPMNEdge) };
      const shapes = this.deserializeShapes(plane.BPMNShape);

      return { ...shapes, ...edges };
    } catch (e) {
      // TODO error management
      console.log(e as Error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private deserializeShapes(shapes: any): Shapes {
    const convertedShapes: Shapes = { flowNodes: [], lanes: [], pools: [] };

    shapes = ensureIsArray(shapes);

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      const flowNode = this.deserializeShape(shape, (bpmnElement: string) => findFlowNodeBpmnElement(bpmnElement));
      if (flowNode) {
        convertedShapes.flowNodes.push(flowNode);
        continue;
      }

      const lane = this.deserializeShape(shape, (bpmnElement: string) => findLaneBpmnElement(bpmnElement));
      if (lane) {
        convertedShapes.lanes.push(lane);
        continue;
      }

      // TODO logic duplication with flownode and lane management
      const pool = this.deserializeShape(shape, (bpmnElement: string) => findProcessElement(bpmnElement));
      if (pool) {
        convertedShapes.pools.push(pool);
        continue;
      }

      // TODO clarify message (state what we try to do with the unknown element)
      // TODO error management
      console.log('Not possible to find model element with id ' + shape.bpmnElement);
    }

    return convertedShapes;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private deserializeShape(shape: any, findShapeElement: (bpmnElement: string) => ShapeBpmnElement): Shape | undefined {
    let bpmnElement = findShapeElement(shape.bpmnElement);
    if (bpmnElement) {
      const jsonConvert: JsonConvert = JsonParser.getInstance().jsonConvert;
      const bounds = jsonConvert.deserializeObject(shape.Bounds, Bounds);

      if (bpmnElement.parentId) {
        const participant = findProcessRefParticipantByProcessRef(bpmnElement.parentId);
        if (participant) {
          // clone to avoid modifying the reference
          bpmnElement = new ShapeBpmnElement(bpmnElement.id, bpmnElement.name, bpmnElement.kind, participant.id);
        }
      }

      return new Shape(shape.id, bpmnElement, bounds);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private deserializeEdges(edges: any): Edge[] {
    const jsonConvert: JsonConvert = JsonParser.getInstance().jsonConvert;
    return jsonConvert.deserializeArray(ensureIsArray(edges), Edge);
  }
}
