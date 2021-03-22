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
import { readFileSync } from '../helpers/file-helper';
import { BpmnElement, BpmnVisualization, ShapeBpmnElementKind } from '../../src/bpmn-visualization';
import { FlowKind } from '../../src/model/bpmn/internal/edge/FlowKind';
import { expectSvgElementClassAttribute, expectSvgEvent, expectSvgPool, expectSvgSequenceFlow, expectSvgTask, HtmlElementLookup } from './helpers/html-utils';
import { ExpectedBaseBpmnElement, expectEndEvent, expectPool, expectSequenceFlow, expectServiceTask, expectStartEvent, expectTask } from '../unit/helpers/bpmn-semantic-utils';

const bpmnContainerId = 'bpmn-visualization-container';
const bpmnVisualization = initializeBpmnVisualization();

function initializeBpmnVisualization(): BpmnVisualization {
  // insert bpmn container
  const containerDiv = document.createElement('div');
  containerDiv.id = bpmnContainerId;
  document.body.insertBefore(containerDiv, document.body.firstChild);
  // initialize bpmn-visualization
  return new BpmnVisualization({ container: bpmnContainerId });
}

describe('DOM only checks', () => {
  it('DOM should contains BPMN elements when loading simple-start-task-end.bpmn', async () => {
    bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));

    const htmlElementLookup = new HtmlElementLookup(bpmnVisualization);
    htmlElementLookup.expectStartEvent('StartEvent_1');
    htmlElementLookup.expectTask('Activity_1');
    htmlElementLookup.expectEndEvent('EndEvent_1');
  });
});

function expectStartEventBpmnElement(bpmnElement: BpmnElement, expected: ExpectedBaseBpmnElement): void {
  expectStartEvent(bpmnElement.bpmnSemantic, expected);
  expectSvgEvent(bpmnElement.htmlElement);
}

function expectEndEventBpmnElement(bpmnElement: BpmnElement, expected: ExpectedBaseBpmnElement): void {
  expectEndEvent(bpmnElement.bpmnSemantic, expected);
  expectSvgEvent(bpmnElement.htmlElement);
}

function expectSequenceFlowBpmnElement(bpmnElement: BpmnElement, expected: ExpectedBaseBpmnElement): void {
  expectSequenceFlow(bpmnElement.bpmnSemantic, expected);
  expectSvgSequenceFlow(bpmnElement.htmlElement);
}

function expectTaskBpmnElement(bpmnElement: BpmnElement, expected: ExpectedBaseBpmnElement): void {
  expectTask(bpmnElement.bpmnSemantic, expected);
  expectSvgTask(bpmnElement.htmlElement);
}

function expectServiceTaskBpmnElement(bpmnElement: BpmnElement, expected: ExpectedBaseBpmnElement): void {
  expectServiceTask(bpmnElement.bpmnSemantic, expected);
  expectSvgTask(bpmnElement.htmlElement);
}

function expectPoolBpmnElement(bpmnElement: BpmnElement, expected: ExpectedBaseBpmnElement): void {
  expectPool(bpmnElement.bpmnSemantic, expected);
  expectSvgPool(bpmnElement.htmlElement);
}

describe('Bpmn Elements registry', () => {
  describe('Get by ids', () => {
    it('Pass several existing ids', async () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));

      const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByIds(['StartEvent_1', 'Flow_2']);
      expect(bpmnElements).toHaveLength(2);

      expectStartEventBpmnElement(bpmnElements[0], { id: 'StartEvent_1', name: 'Start Event 1' });
      expectSequenceFlowBpmnElement(bpmnElements[1], { id: 'Flow_2' });
    });

    it('Pass a single non existing id', async () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));
      const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByIds('unknown');
      expect(bpmnElements).toHaveLength(0);
    });
  });

  describe('Get by kinds', () => {
    it('Pass a single kind related to a single existing element', async () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));
      const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(ShapeBpmnElementKind.TASK);
      expect(bpmnElements).toHaveLength(1);

      expectTaskBpmnElement(bpmnElements[0], { id: 'Activity_1', name: 'Task 1' });
    });

    it('Pass a single kind related to several existing elements', async () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));
      const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(FlowKind.SEQUENCE_FLOW);
      expect(bpmnElements).toHaveLength(2);

      expectSequenceFlowBpmnElement(bpmnElements[0], { id: 'Flow_1', name: 'Sequence Flow 1' });
      expectSequenceFlowBpmnElement(bpmnElements[1], { id: 'Flow_2' });
    });

    it('No elements for this kind', async () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));
      const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(ShapeBpmnElementKind.SUB_PROCESS);
      expect(bpmnElements).toHaveLength(0);
    });

    it('Pass a several kinds that all match existing elements', async () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/registry/1-pool-3-lanes-message-start-end-intermediate-events.bpmn'));
      const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([ShapeBpmnElementKind.EVENT_END, ShapeBpmnElementKind.POOL]);
      expect(bpmnElements).toHaveLength(3);

      expectEndEventBpmnElement(bpmnElements[0], { id: 'endEvent_terminate_1', name: 'terminate end 1' });
      expectEndEventBpmnElement(bpmnElements[1], { id: 'endEvent_message_1', name: 'message end 2' });
      expectPoolBpmnElement(bpmnElements[2], { id: 'Participant_1', name: 'Pool 1' });
    });

    it('Pass a several kinds that match existing and non-existing elements', async () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/registry/1-pool-3-lanes-message-start-end-intermediate-events.bpmn'));
      const bpmnElements = bpmnVisualization.bpmnElementsRegistry.getElementsByKinds([ShapeBpmnElementKind.CALL_ACTIVITY, ShapeBpmnElementKind.TASK_SERVICE]);
      expect(bpmnElements).toHaveLength(2);

      expectServiceTaskBpmnElement(bpmnElements[0], { id: 'serviceTask_1_2', name: 'Service Task 1.2' });
      expectServiceTaskBpmnElement(bpmnElements[1], { id: 'serviceTask_2_1', name: 'Service Task 2.1' });
    });
  });
});

describe('Bpmn Elements registry - CSS class management', () => {
  describe('Add classes', () => {
    it('Add one or several classes to one or several BPMN elements', () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/registry/1-pool-3-lanes-message-start-end-intermediate-events.bpmn'));
      const htmlElementLookup = new HtmlElementLookup(bpmnVisualization);

      // default classes
      htmlElementLookup.expectServiceTask('serviceTask_1_2');
      htmlElementLookup.expectEndEvent('endEvent_message_1');

      // add a single class to a single element
      bpmnVisualization.bpmnElementsRegistry.addCssClasses('serviceTask_1_2', 'class1');
      htmlElementLookup.expectServiceTask('serviceTask_1_2', ['class1']);

      // add several classes to several elements
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(['endEvent_message_1', 'serviceTask_1_2'], ['class2', 'class3']);
      htmlElementLookup.expectServiceTask('serviceTask_1_2', ['class1', 'class2', 'class3']);
      htmlElementLookup.expectEndEvent('endEvent_message_1', ['class2', 'class3']);
    });

    it('BPMN element does not exist', () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));
      const htmlElementLookup = new HtmlElementLookup(bpmnVisualization);

      const nonExistingBpmnId = 'i-do-not-exist-for-add';
      htmlElementLookup.expectNoElement(nonExistingBpmnId);
      // this call ensures that there is not issue on the rendering part
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(nonExistingBpmnId, 'class1');
    });
  });

  describe('Remove classes', () => {
    it('Remove one or several classes to one or several BPMN elements', () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/registry/1-pool-3-lanes-message-start-end-intermediate-events.bpmn'));
      const htmlElementLookup = new HtmlElementLookup(bpmnVisualization);

      // default classes
      htmlElementLookup.expectUserTask('userTask_0');
      htmlElementLookup.expectLane('lane_01');

      // remove a single class from a single element
      bpmnVisualization.bpmnElementsRegistry.addCssClasses('userTask_0', 'class1');
      htmlElementLookup.expectUserTask('userTask_0', ['class1']); // TODO do we keep this check
      bpmnVisualization.bpmnElementsRegistry.removeCssClasses('userTask_0', 'class1');
      htmlElementLookup.expectUserTask('userTask_0');

      // remove several classes from several elements
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(['lane_01', 'userTask_0'], ['class1', 'class2', 'class3']);
      bpmnVisualization.bpmnElementsRegistry.removeCssClasses(['lane_01', 'userTask_0'], ['class1', 'class3']);
      htmlElementLookup.expectLane('lane_01', ['class2']);
      htmlElementLookup.expectUserTask('userTask_0', ['class2']);
    });

    it('BPMN element does not exist', () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));
      const htmlElementLookup = new HtmlElementLookup(bpmnVisualization);

      const nonExistingBpmnId = 'i-do-not-exist-for-removal';
      htmlElementLookup.expectNoElement(nonExistingBpmnId);
      // this call ensures that there is not issue on the rendering part
      bpmnVisualization.bpmnElementsRegistry.removeCssClasses(nonExistingBpmnId, 'class1');
    });
  });

  describe('Toggle classes', () => {
    it('Toggle one or several classes to one or several BPMN elements', () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/registry/1-pool-3-lanes-message-start-end-intermediate-events.bpmn'));
      const htmlElementLookup = new HtmlElementLookup(bpmnVisualization);

      // toggle a classes for a single element
      bpmnVisualization.bpmnElementsRegistry.toggleCssClasses('gateway_01', 'class1');
      bpmnVisualization.bpmnElementsRegistry.toggleCssClasses('gateway_01', ['class1', 'class2']);
      htmlElementLookup.expectExclusiveGateway('gateway_01', ['class2']);

      // toggle a classes for several elements
      bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(['lane_02', 'gateway_01'], ['class1', 'class2', 'class3']);
      bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(['lane_02', 'gateway_01'], ['class1', 'class3', 'class4']);
      htmlElementLookup.expectLane('lane_02', ['class2', 'class4']);
      htmlElementLookup.expectExclusiveGateway('gateway_01', ['class4']);
    });

    it('BPMN element does not exist', () => {
      bpmnVisualization.load(readFileSync('../fixtures/bpmn/simple-start-task-end.bpmn'));
      const htmlElementLookup = new HtmlElementLookup(bpmnVisualization);

      const nonExistingBpmnId = 'i-do-not-exist-for-toggle';
      htmlElementLookup.expectNoElement(nonExistingBpmnId);
      // this call ensures that there is not issue on the rendering part
      bpmnVisualization.bpmnElementsRegistry.toggleCssClasses(nonExistingBpmnId, 'class1');
    });
  });
});

describe('Bpmn Elements registry - Add Overlay', () => {
  it('Add one overlay to BPMN element', () => {
    bpmnVisualization.load(readFileSync('../fixtures/bpmn/registry/1-pool-3-lanes-message-start-end-intermediate-events.bpmn'));
    const htmlElementLookup = new HtmlElementLookup(bpmnVisualization);

    // default classes
    htmlElementLookup.expectServiceTask('serviceTask_1_2');

    // add a single overlay to a single element
    const overlayLabel = '123';
    bpmnVisualization.bpmnElementsRegistry.addOverlay('serviceTask_1_2', { label: overlayLabel, position: 'top-left' });
    const svgOverlayGroupElementQuery = `#${bpmnVisualization.graph.container.id} > svg > g > g:nth-child(3) > g[data-bpmn-id="serviceTask_1_2"]`;

    const overlayGrouplement = document.querySelector<SVGGElement>(svgOverlayGroupElementQuery);
    expect(overlayGrouplement.querySelector('g > text').innerHTML).toEqual(overlayLabel);
    expectSvgElementClassAttribute(overlayGrouplement, 'overlay-badge');
  });
});
