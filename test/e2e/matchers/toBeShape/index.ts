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
import { ExpectedStateStyle, ExpectedCell, buildCommonExpectedStateStyle, buildCellMatcher, buildReceivedCellWithCommonAttributes } from '../matcherUtils';
import MatcherContext = jest.MatcherContext;
import CustomMatcherResult = jest.CustomMatcherResult;
import {
  ExpectedBoundaryEventModelElement,
  ExpectedEventModelElement,
  ExpectedShapeModelElement,
  ExpectedStartEventModelElement,
  ExpectedSubProcessModelElement,
  getDefaultParentId,
} from '../../ExpectModelUtils';
import { ShapeBpmnElementKind } from '../../../../src/model/bpmn/internal/shape';

function buildExpectedStateStyle(expectedModel: ExpectedShapeModelElement): ExpectedStateStyle {
  const expectedStateStyle = buildCommonExpectedStateStyle(expectedModel);
  expectedStateStyle.shape = !expectedModel.styleShape ? expectedModel.kind : expectedModel.styleShape;
  expectedStateStyle.verticalAlign = expectedModel.verticalAlign ? expectedModel.verticalAlign : 'middle';
  expectedStateStyle.align = expectedModel.align ? expectedModel.align : 'center';
  expectedStateStyle.strokeWidth = undefined;

  return expectedStateStyle;
}

function buildExpectedStyle(
  expectedModel: ExpectedShapeModelElement | ExpectedSubProcessModelElement | ExpectedEventModelElement | ExpectedStartEventModelElement | ExpectedBoundaryEventModelElement,
): string {
  let expectedStyle: string = expectedModel.kind;
  if ('eventKind' in expectedModel) {
    expectedStyle = expectedStyle + `.*bpmn.eventKind=${expectedModel.eventKind}`;
  }
  if ('subProcessKind' in expectedModel) {
    expectedStyle = expectedStyle + `.*bpmn.subProcessKind=${expectedModel.subProcessKind}`;
  }
  if (expectedModel.isInstantiating !== undefined) {
    expectedStyle = expectedStyle + `.*bpmn.isInstantiating=${expectedModel.isInstantiating}`;
  }
  if (expectedModel.markers?.length > 0) {
    expectedStyle = expectedStyle + `.*bpmn.markers=${expectedModel.markers.join(',')}`;
  }
  if ('isInterrupting' in expectedModel) {
    expectedStyle = expectedStyle + `.*bpmn.isInterrupting=${expectedModel.isInterrupting}`;
  }
  return expectedStyle + '.*';
}

function buildExpectedCell(id: string, expectedModel: ExpectedShapeModelElement): ExpectedCell {
  const parentId = expectedModel.parentId;
  const styleRegexp = buildExpectedStyle(expectedModel);

  return {
    id,
    value: expectedModel.label,
    style: expect.stringMatching(styleRegexp),
    edge: false,
    vertex: true,
    parent: { id: parentId ? parentId : getDefaultParentId() },
    state: {
      style: buildExpectedStateStyle(expectedModel),
    },
  };
}

function buildShapeMatcher(matcherName: string, matcherContext: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildCellMatcher(matcherName, matcherContext, received, expected, 'Shape', buildExpectedCell, buildReceivedCellWithCommonAttributes);
}

export function toBeShape(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeShape', this, received, expected);
}

export function toBeCallActivity(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildCellMatcher(
    'toBeCallActivity',
    this,
    received,
    { ...expected, kind: ShapeBpmnElementKind.CALL_ACTIVITY },
    'Shape',
    buildExpectedCell,
    buildReceivedCellWithCommonAttributes,
  );
}

export function toBeSubProcess(this: MatcherContext, received: string, expected: ExpectedSubProcessModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeSubProcess', this, received, { ...expected, kind: ShapeBpmnElementKind.SUB_PROCESS });
}

export function toBeTask(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeTask', this, received, { ...expected, kind: ShapeBpmnElementKind.TASK });
}

export function toBeServiceTask(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeServiceTask', this, received, { ...expected, kind: ShapeBpmnElementKind.TASK_SERVICE });
}

export function toBeUserTask(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeUserTask', this, received, { ...expected, kind: ShapeBpmnElementKind.TASK_USER });
}

export function toBeReceiveTask(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeReceiveTask', this, received, { ...expected, kind: ShapeBpmnElementKind.TASK_RECEIVE });
}

export function toBeSendTask(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeSendTask', this, received, { ...expected, kind: ShapeBpmnElementKind.TASK_SEND });
}

export function toBeManualTask(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeManualTask', this, received, { ...expected, kind: ShapeBpmnElementKind.TASK_MANUAL });
}

export function toBeScriptTask(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeScriptTask', this, received, { ...expected, kind: ShapeBpmnElementKind.TASK_SCRIPT });
}

export function toBeBusinessRuleTask(this: MatcherContext, received: string, expected: ExpectedShapeModelElement): CustomMatcherResult {
  return buildShapeMatcher('toBeBusinessRuleTask', this, received, { ...expected, kind: ShapeBpmnElementKind.TASK_BUSINESS_RULE });
}

function buildEventMatcher(matcherName: string, matcherContext: MatcherContext, received: string, expected: ExpectedStartEventModelElement): CustomMatcherResult {
  return buildShapeMatcher(matcherName, matcherContext, received, { ...expected, verticalAlign: 'top' });
}

export function toBeStartEvent(this: MatcherContext, received: string, expected: ExpectedStartEventModelElement): CustomMatcherResult {
  return buildEventMatcher('toBeStartEvent', this, received, { ...expected, kind: ShapeBpmnElementKind.EVENT_START });
}

export function toBeEndEvent(this: MatcherContext, received: string, expected: ExpectedEventModelElement): CustomMatcherResult {
  return buildEventMatcher('toBeStartEvent', this, received, { ...expected, kind: ShapeBpmnElementKind.EVENT_END });
}

export function toBeIntermediateThrowEvent(this: MatcherContext, received: string, expected: ExpectedEventModelElement): CustomMatcherResult {
  return buildEventMatcher('toBeIntermediateThrowEvent', this, received, { ...expected, kind: ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW });
}

export function toBeIntermediateCatchEvent(this: MatcherContext, received: string, expected: ExpectedEventModelElement): CustomMatcherResult {
  return buildEventMatcher('toBeIntermediateCatchEvent', this, received, { ...expected, kind: ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH });
}

export function toBeBoundaryEvent(this: MatcherContext, received: string, expected: ExpectedBoundaryEventModelElement): CustomMatcherResult {
  return buildEventMatcher('toBeBoundaryEvent', this, received, { ...expected, kind: ShapeBpmnElementKind.EVENT_BOUNDARY });
}
