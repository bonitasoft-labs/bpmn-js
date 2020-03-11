import { JsonConverter } from 'json2typescript';
import { AbstractConverter, ensureIsArray } from './AbstractConverter';
import ShapeBpmnElement from '../../../../model/bpmn/shape/ShapeBpmnElement';
import { ShapeBpmnElementKind } from '../../../../model/bpmn/shape/ShapeBpmnElementKind';

const convertedShapeBpmnElements: ShapeBpmnElement[] = [];
const convertedLaneBpmnElements: ShapeBpmnElement[] = [];

export function findShapeBpmnElement(id: string): ShapeBpmnElement {
  return convertedShapeBpmnElements.find(i => i.id === id);
}

export function findLaneBpmnElement(id: string): ShapeBpmnElement {
  return convertedLaneBpmnElements.find(i => i.id === id);
}

@JsonConverter
export default class ShapeModelConverter extends AbstractConverter<ShapeBpmnElement[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buildShapeBpmnElement(bpmnElements: Array<any> | any, kind: ShapeBpmnElementKind): void {
    ensureIsArray(bpmnElements).map(bpmnElement => convertedShapeBpmnElements.push(new ShapeBpmnElement(bpmnElement.id, bpmnElement.name, kind)));
  }

  buildLaneBpmnElement(bpmnElements: Array<any> | any, kind: ShapeBpmnElementKind): void {
    ensureIsArray(bpmnElements).map(bpmnElement => convertedLaneBpmnElements.push(new ShapeBpmnElement(bpmnElement.id, bpmnElement.name, kind)));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseProcess(process: { startEvent: any; userTask: any; lane: any }): void {
    this.buildShapeBpmnElement(process.startEvent, ShapeBpmnElementKind.EVENT_START);
    this.buildShapeBpmnElement(process.userTask, ShapeBpmnElementKind.TASK_USER);

    this.buildLaneBpmnElement(process.lane, ShapeBpmnElementKind.LANE);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deserialize(processes: Array<any> | any): ShapeBpmnElement[] {
    // Deletes everything in the array, which does hit other references. More performant.
    convertedShapeBpmnElements.length = 0;
    convertedLaneBpmnElements.length = 0;

    ensureIsArray(processes).map(process => this.parseProcess(process));
    return convertedShapeBpmnElements;
  }
}

@JsonConverter
export class ShapeBpmnElementConverter extends AbstractConverter<ShapeBpmnElement> {
  deserialize(data: string): ShapeBpmnElement {
    return findShapeBpmnElement(data);
  }
}
