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
import { ShapeBpmnElementKind, ShapeBpmnEventKind, ShapeBpmnMarkerKind, ShapeBpmnSubProcessKind } from '../../src/model/bpmn/internal/shape';
import { FlowKind } from '../../src/model/bpmn/internal/edge/FlowKind';
import { MessageVisibleKind } from '../../src/model/bpmn/internal/edge/MessageVisibleKind';
import { SequenceFlowKind } from '../../src/model/bpmn/internal/edge/SequenceFlowKind';
import BpmnVisualization from '../../src/component/BpmnVisualization';
import {
  toBeCell,
  toBeCellWithParentAndGeometry,
  toBeSequenceFlow,
  toBeMessageFlow,
  toBeAssociationFlow,
  toBeShape,
  toBeCallActivity,
  toBeTask,
  toBeServiceTask,
  toBeUserTask,
  toBeReceiveTask,
  toBeSendTask,
  toBeManualTask,
} from './matchers';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toBeCell(): R;
      toBeCellWithParentAndGeometry(modelElement: ExpectedCellWithGeometry): R;
      toBeSequenceFlow(modelElement: ExpectedSequenceFlowModelElement): R;
      toBeMessageFlow(modelElement: ExpectedEdgeModelElement): R;
      toBeAssociationFlow(modelElement: ExpectedEdgeModelElement): R;
      toBeShape(modelElement: ExpectedShapeModelElement): R;
      toBeCallActivity(modelElement: ExpectedShapeModelElement): R;
      toBeTask(modelElement: ExpectedShapeModelElement): R;
      toBeServiceTask(modelElement: ExpectedShapeModelElement): R;
      toBeUserTask(modelElement: ExpectedShapeModelElement): R;
      toBeReceiveTask(modelElement: ExpectedShapeModelElement): R;
      toBeSendTask(modelElement: ExpectedShapeModelElement): R;
      toBeManualTask(modelElement: ExpectedShapeModelElement): R;
    }
  }
}

expect.extend({
  toBeCell,
  toBeCellWithParentAndGeometry,
  toBeSequenceFlow,
  toBeMessageFlow,
  toBeAssociationFlow,
  toBeShape,
  toBeCallActivity,
  toBeTask,
  toBeServiceTask,
  toBeUserTask,
  toBeReceiveTask,
  toBeSendTask,
  toBeManualTask,
});

export interface ExpectedCellWithGeometry {
  parentId?: string;
  geometry: mxGeometry;
}

export interface ExpectedFont {
  name?: string;
  size?: number;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrikeThrough?: boolean;
}

export interface ExpectedShapeModelElement {
  label?: string;
  kind?: ShapeBpmnElementKind;
  font?: ExpectedFont;
  parentId?: string;
  /** Only needed when the BPMN shape doesn't exist yet (use an arbitrary shape until the final render is implemented) */
  styleShape?: string;
  verticalAlign?: string;
  align?: string;
  markers?: ShapeBpmnMarkerKind[];
  isInstantiating?: boolean;
  isHorizontal?: boolean;
}

export interface ExpectedEventModelElement extends ExpectedShapeModelElement {
  eventKind: ShapeBpmnEventKind;
}

// TODO find a way to not be forced to pass 'kind'
export interface ExpectedSubProcessModelElement extends ExpectedShapeModelElement {
  subProcessKind: ShapeBpmnSubProcessKind;
}

export interface ExpectedEdgeModelElement {
  label?: string;
  kind?: FlowKind;
  parentId?: string;
  font?: ExpectedFont;
  startArrow?: string;
  endArrow?: string;
  verticalAlign?: string;
  messageVisibleKind?: MessageVisibleKind;
}

export interface ExpectedSequenceFlowModelElement extends ExpectedEdgeModelElement {
  sequenceFlowKind?: SequenceFlowKind;
}

// TODO find a way to not be forced to pass 'kind'
export interface ExpectedBoundaryEventModelElement extends ExpectedEventModelElement {
  isInterrupting?: boolean;
}
export interface ExpectedStartEventModelElement extends ExpectedEventModelElement {
  isInterrupting?: boolean;
}

export const bpmnVisualization = new BpmnVisualization(null);

export function getDefaultParentId(): string {
  return bpmnVisualization.graph.getDefaultParent().id;
}

export function expectModelContainsBpmnEvent(cellId: string, eventModelElement: ExpectedEventModelElement): mxCell {
  expect(cellId).toBeShape({ ...eventModelElement, verticalAlign: 'top' });

  const cell = bpmnVisualization.graph.model.getCell(cellId);
  expect(cell.style).toContain(`bpmn.eventKind=${eventModelElement.eventKind}`);
  return cell;
}

export function expectModelContainsBpmnBoundaryEvent(cellId: string, boundaryEventModelElement: ExpectedBoundaryEventModelElement): void {
  const cell = expectModelContainsBpmnEvent(cellId, { ...boundaryEventModelElement, kind: ShapeBpmnElementKind.EVENT_BOUNDARY });
  expect(cell.style).toContain(`bpmn.isInterrupting=${boundaryEventModelElement.isInterrupting}`);
}

export function expectModelContainsBpmnStartEvent(cellId: string, startEventModelElement: ExpectedStartEventModelElement): void {
  const cell = expectModelContainsBpmnEvent(cellId, { ...startEventModelElement, kind: ShapeBpmnElementKind.EVENT_START });
  expect(cell.style).toContain(`bpmn.isInterrupting=${startEventModelElement.isInterrupting}`);
}

export function expectModelContainsSubProcess(cellId: string, subProcessModelElement: ExpectedSubProcessModelElement): mxCell {
  expect(cellId).toBeShape({
    ...subProcessModelElement,
    kind: ShapeBpmnElementKind.SUB_PROCESS,
    verticalAlign: subProcessModelElement.verticalAlign ? subProcessModelElement.verticalAlign : 'middle',
  });

  const cell = bpmnVisualization.graph.model.getCell(cellId);
  expect(cell.style).toContain(`bpmn.subProcessKind=${subProcessModelElement.subProcessKind}`);
  return cell;
}

export function expectModelContainsPool(cellId: string, modelElement: ExpectedShapeModelElement): void {
  expect(cellId).toBeShape({ ...modelElement, kind: ShapeBpmnElementKind.POOL, styleShape: mxConstants.SHAPE_SWIMLANE, verticalAlign: 'middle' });

  const mxCell = bpmnVisualization.graph.model.getCell(cellId);
  expect(mxCell.style).toContain(`${mxConstants.STYLE_HORIZONTAL}=${modelElement.isHorizontal ? '0' : '1'}`);
}

export function expectModelContainsLane(cellId: string, modelElement: ExpectedShapeModelElement): void {
  expect(cellId).toBeShape({ ...modelElement, kind: ShapeBpmnElementKind.LANE, styleShape: mxConstants.SHAPE_SWIMLANE, verticalAlign: 'middle' });

  const mxCell = bpmnVisualization.graph.model.getCell(cellId);
  expect(mxCell.style).toContain(`${mxConstants.STYLE_HORIZONTAL}=${modelElement.isHorizontal ? '0' : '1'}`);
}
