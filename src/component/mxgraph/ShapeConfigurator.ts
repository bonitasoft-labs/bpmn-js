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
import { mxgraph } from 'ts-mxgraph';
import { ShapeBpmnElementKind } from '../../model/bpmn/shape/ShapeBpmnElementKind';
import { EndEventShape, StartEventShape, ThrowIntermediateEventShape, CatchIntermediateEventShape, BoundaryEventShape } from './shape/event-shapes';
import { ExclusiveGatewayShape, ParallelGatewayShape, InclusiveGatewayShape } from './shape/gateway-shapes';
import { ReceiveTaskShape, ServiceTaskShape, TaskShape, UserTaskShape } from './shape/task-shapes';

declare const mxClient: typeof mxgraph.mxClient;
declare const mxShape: typeof mxgraph.mxShape;
declare const mxCellRenderer: typeof mxgraph.mxCellRenderer;
// TODO should be 'typeof mxgraph.mxSvgCanvas2D', current type definition does not declare 'minStrokeWidth'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const mxSvgCanvas2D: any;

export default class ShapeConfigurator {
  public configureShapes(): void {
    this.initMxShapePrototype(mxClient.IS_FF);
    this.registerShapes();
  }

  private registerShapes(): void {
    // events
    mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_END, EndEventShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_START, StartEventShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW, ThrowIntermediateEventShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, CatchIntermediateEventShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_BOUNDARY, BoundaryEventShape);
    // gateways
    mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_EXCLUSIVE, ExclusiveGatewayShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_INCLUSIVE, InclusiveGatewayShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_PARALLEL, ParallelGatewayShape);
    // tasks
    mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK, TaskShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_SERVICE, ServiceTaskShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_USER, UserTaskShape);
    mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_RECEIVE, ReceiveTaskShape);
  }

  private initMxShapePrototype(isFF: boolean): void {
    // this change is needed for adding the custom attributes that permits identification of the BPMN elements
    mxShape.prototype.createSvgCanvas = function() {
      const canvas = new mxSvgCanvas2D(this.node, false);
      canvas.strokeTolerance = this.pointerEvents ? this.svgStrokeTolerance : 0;
      canvas.pointerEventsValue = this.svgPointerEvents;
      canvas.blockImagePointerEvents = isFF;
      const off = this.getSvgScreenOffset();

      if (off != 0) {
        this.node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
      } else {
        this.node.removeAttribute('transform');
      }

      // add attributes to be able to identify elements in DOM
      if (this.state && this.state.cell) {
        this.node.setAttribute('class', 'class-state-cell-style-' + this.state.cell.style);
        this.node.setAttribute('data-cell-id', this.state.cell.id);
      }
      //
      canvas.minStrokeWidth = this.minSvgStrokeWidth;

      if (!this.antiAlias) {
        // Rounds all numbers in the SVG output to integers
        canvas.format = function(value: string) {
          return Math.round(parseFloat(value));
        };
      }

      return canvas;
    };
  }
}
