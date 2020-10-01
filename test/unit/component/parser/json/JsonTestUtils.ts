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
import { ShapeBaseElementType, CallActivityType, MarkerType, SubProcessType, EventType } from '../../../../../src/model/bpmn/internal/shape';
import BPMNShape from '../../../../../src/model/bpmn/internal/shape/Shape';
import { defaultBpmnJsonParser } from '../../../../../src/component/parser/json/BpmnJsonParser';
import BPMNEdge from '../../../../../src/model/bpmn/internal/edge/Edge';
import InternalBPMNModel from '../../../../../src/model/bpmn/internal/BpmnModel';
import { ShapeBpmnActivity, ShapeBpmnCallActivity, ShapeBpmnEvent, ShapeBpmnSubProcess } from '../../../../../src/model/bpmn/internal/shape/ShapeBpmnElement';
import { SequenceFlowType } from '../../../../../src/model/bpmn/internal/edge/SequenceFlowType';
import Label from '../../../../../src/model/bpmn/internal/Label';
import { SequenceFlow } from '../../../../../src/model/bpmn/internal/edge/Flow';
import { FlowType } from '../../../../../src/model/bpmn/internal/edge/FlowType';
import { BpmnJsonModel } from '../../../../../src/model/bpmn/json/BPMN20';
import { MessageVisibleKind } from '../../../../../src/model/bpmn/json/BPMNDI';
import { Point } from '../../../../../src/model/bpmn/json/DC';

export interface ExpectedShape {
  shapeId: string;
  bpmnElementId: string;
  bpmnElementName: string;
  bpmnElementType: ShapeBaseElementType;
  parentId?: string;
  bounds?: ExpectedBounds;
  isHorizontal?: boolean;
}

export interface ExpectedActivityShape extends ExpectedShape {
  bpmnElementMarkers?: MarkerType[];
}

export interface ExpectedCallActivityShape extends ExpectedActivityShape {
  bpmnElementCallActivityType?: CallActivityType;
}

interface ExpectedEdge {
  edgeId: string;
  bpmnElementId: string;
  bpmnElementName?: string;
  bpmnElementSourceRefId: string;
  bpmnElementTargetRefId: string;
  waypoints: Point[];
  messageVisibleKind?: MessageVisibleKind;
}

export interface ExpectedSequenceEdge extends ExpectedEdge {
  bpmnElementSequenceFlowType?: SequenceFlowType;
}

export interface ExpectedFont {
  name?: string;
  size?: number;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrikeThrough?: boolean;
}

export interface ExpectedBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function parseJson(json: BpmnJsonModel): InternalBPMNModel {
  return defaultBpmnJsonParser().parse(json);
}

export function parseJsonAndExpect(
  json: BpmnJsonModel,
  numberOfExpectedPools: number,
  numberOfExpectedLanes: number,
  numberOfExpectedFlowNodes: number,
  numberOfExpectedEdges: number,
): InternalBPMNModel {
  const model = parseJson(json);
  expect(model.lanes).toHaveLength(numberOfExpectedLanes);
  expect(model.pools).toHaveLength(numberOfExpectedPools);
  expect(model.flowNodes).toHaveLength(numberOfExpectedFlowNodes);
  expect(model.edges).toHaveLength(numberOfExpectedEdges);
  return model;
}

export function parseJsonAndExpectOnlyLanes(json: BpmnJsonModel, numberOfExpectedLanes: number): InternalBPMNModel {
  return parseJsonAndExpect(json, 0, numberOfExpectedLanes, 0, 0);
}

export function parseJsonAndExpectOnlyPoolsAndLanes(json: BpmnJsonModel, numberOfExpectedPools: number, numberOfExpectedLanes: number): InternalBPMNModel {
  return parseJsonAndExpect(json, numberOfExpectedPools, numberOfExpectedLanes, 0, 0);
}

export function parseJsonAndExpectOnlyPools(json: BpmnJsonModel, numberOfExpectedPools: number): InternalBPMNModel {
  return parseJsonAndExpect(json, numberOfExpectedPools, 0, 0, 0);
}

export function parseJsonAndExpectOnlyPoolsAndFlowNodes(json: BpmnJsonModel, numberOfExpectedPools: number, numberOfExpectedFlowNodes: number): InternalBPMNModel {
  return parseJsonAndExpect(json, numberOfExpectedPools, 0, numberOfExpectedFlowNodes, 0);
}

export function parseJsonAndExpectOnlyFlowNodes(json: BpmnJsonModel, numberOfExpectedFlowNodes: number): InternalBPMNModel {
  return parseJsonAndExpect(json, 0, 0, numberOfExpectedFlowNodes, 0);
}

export function parseJsonAndExpectOnlyEdges(json: BpmnJsonModel, numberOfExpectedEdges: number): InternalBPMNModel {
  return parseJsonAndExpect(json, 0, 0, 0, numberOfExpectedEdges);
}

export function parseJsonAndExpectOnlyEdgesAndFlowNodes(json: BpmnJsonModel, numberOfExpectedEdges: number, numberOfExpectedFlowNodes: number): InternalBPMNModel {
  return parseJsonAndExpect(json, 0, 0, numberOfExpectedFlowNodes, numberOfExpectedEdges);
}

export function verifyShape(shape: BPMNShape, expectedShape: ExpectedShape | ExpectedActivityShape | ExpectedCallActivityShape): void {
  expect(shape.id).toEqual(expectedShape.shapeId);
  expect(shape.isHorizontal).toEqual(expectedShape.isHorizontal);

  const bpmnElement = shape.bpmnElement;
  expect(bpmnElement.id).toEqual(expectedShape.bpmnElementId);
  expect(bpmnElement.name).toEqual(expectedShape.bpmnElementName);
  expect(bpmnElement.type).toEqual(expectedShape.bpmnElementType);
  expect(bpmnElement.parentId).toEqual(expectedShape.parentId);

  if (bpmnElement instanceof ShapeBpmnActivity) {
    const expectedActivityShape = expectedShape as ExpectedActivityShape;
    if (expectedActivityShape.bpmnElementMarkers) {
      expect(bpmnElement.markers).toEqual(expectedActivityShape.bpmnElementMarkers);
    } else {
      expect(bpmnElement.markers).toHaveLength(0);
    }

    if (bpmnElement instanceof ShapeBpmnCallActivity) {
      expect(bpmnElement.callActivityType).toEqual((expectedActivityShape as ExpectedCallActivityShape).bpmnElementCallActivityType);
    }
  }

  const bounds = shape.bounds;
  const expectedBounds = expectedShape.bounds;
  expect(bounds.x).toEqual(expectedBounds.x);
  expect(bounds.y).toEqual(expectedBounds.y);
  expect(bounds.width).toEqual(expectedBounds.width);
  expect(bounds.height).toEqual(expectedBounds.height);
}

export function verifyEdge(edge: BPMNEdge, expectedValue: ExpectedEdge | ExpectedSequenceEdge): void {
  expect(edge.id).toEqual(expectedValue.edgeId);
  expect(edge.waypoints).toEqual(expectedValue.waypoints);

  if (expectedValue.messageVisibleKind) {
    expect(edge.messageVisibleKind).toEqual(expectedValue.messageVisibleKind);
  } else {
    expect(edge.messageVisibleKind).toBeUndefined();
  }

  const bpmnElement = edge.bpmnElement;
  expect(bpmnElement.id).toEqual(expectedValue.bpmnElementId);
  expect(bpmnElement.name).toEqual(expectedValue.bpmnElementName);
  expect(bpmnElement.sourceRefId).toEqual(expectedValue.bpmnElementSourceRefId);
  expect(bpmnElement.targetRefId).toEqual(expectedValue.bpmnElementTargetRefId);

  if (bpmnElement instanceof SequenceFlow) {
    expect(edge.bpmnElement.type).toEqual(FlowType.SEQUENCE_FLOW);
    const sequenceEdge = expectedValue as ExpectedSequenceEdge;
    if (sequenceEdge.bpmnElementSequenceFlowType) {
      expect(bpmnElement.sequenceFlowType).toEqual(sequenceEdge.bpmnElementSequenceFlowType);
    } else {
      expect(bpmnElement.sequenceFlowType).toEqual(SequenceFlowType.NORMAL);
    }
  }
}

export function verifySubProcess(model: InternalBPMNModel, type: SubProcessType, expectedNumber: number): void {
  const events = model.flowNodes.filter(shape => {
    const bpmnElement = shape.bpmnElement;
    return bpmnElement instanceof ShapeBpmnSubProcess && (bpmnElement as ShapeBpmnSubProcess).subProcessType === type;
  });
  expect(events).toHaveLength(expectedNumber);
}

export function verifyLabelFont(label: Label, expectedFont?: ExpectedFont): void {
  expect(label).toBeDefined();

  const font = label.font;
  if (expectedFont) {
    expect(font.isBold).toEqual(expectedFont.isBold);
    expect(font.isItalic).toEqual(expectedFont.isItalic);
    expect(font.isStrikeThrough).toEqual(expectedFont.isStrikeThrough);
    expect(font.isUnderline).toEqual(expectedFont.isUnderline);
    expect(font.name).toEqual(expectedFont.name);
    expect(font.size).toEqual(expectedFont.size);
  } else {
    expect(font).toBeUndefined();
  }
}

export function verifyLabelBounds(label: Label, expectedBounds?: ExpectedBounds): void {
  expect(label).toBeDefined();

  const bounds = label.bounds;
  if (expectedBounds) {
    expect(bounds.x).toEqual(expectedBounds.x);
    expect(bounds.y).toEqual(expectedBounds.y);
    expect(bounds.width).toEqual(expectedBounds.width);
    expect(bounds.height).toEqual(expectedBounds.height);
  } else {
    expect(bounds).toBeUndefined();
  }
}

export function parseJsonAndExpectEvent(json: BpmnJsonModel, eventType: EventType, expectedNumber: number): InternalBPMNModel {
  const model = parseJson(json);

  expect(model.lanes).toHaveLength(0);
  expect(model.pools).toHaveLength(0);
  expect(model.edges).toHaveLength(0);

  const events = model.flowNodes.filter(shape => {
    const bpmnElement = shape.bpmnElement;
    return bpmnElement instanceof ShapeBpmnEvent && (bpmnElement as ShapeBpmnEvent).eventKind === eventType;
  });
  expect(events).toHaveLength(expectedNumber);

  return model;
}

export function parseJsonAndExpectOnlySubProcess(json: BpmnJsonModel, type: SubProcessType, expectedNumber: number): InternalBPMNModel {
  const model = parseJson(json);

  expect(model.lanes).toHaveLength(0);
  expect(model.pools).toHaveLength(0);
  expect(model.edges).toHaveLength(0);

  verifySubProcess(model, type, expectedNumber);

  return model;
}
