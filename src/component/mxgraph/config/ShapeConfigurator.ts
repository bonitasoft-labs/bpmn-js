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
import { mxgraph } from '../initializer';
import { ShapeBpmnElementKind } from '../../../model/bpmn/internal/shape';
import { BoundaryEventShape, CatchIntermediateEventShape, EndEventShape, StartEventShape, ThrowIntermediateEventShape } from '../shape/event-shapes';
import { EventBasedGatewayShape, ExclusiveGatewayShape, InclusiveGatewayShape, ParallelGatewayShape } from '../shape/gateway-shapes';
import {
  BusinessRuleTaskShape,
  CallActivityShape,
  ManualTaskShape,
  ReceiveTaskShape,
  ScriptTaskShape,
  SendTaskShape,
  ServiceTaskShape,
  SubProcessShape,
  TaskShape,
  UserTaskShape,
} from '../shape/activity-shapes';
import { TextAnnotationShape } from '../shape/text-annotation-shapes';
import { MessageFlowIconShape } from '../shape/flow-shapes';
import { StyleIdentifier } from '../StyleUtils';
import { computeAllBpmnClassNames, extractBpmnKindFromStyle } from '../style-helper';
import { Badge, Position } from "../../registry/badge-registry";
import { mxSvgCanvas2D } from "mxgraph";
import {A, G, Path, Shape, SVG} from "@svgdotjs/svg.js";

interface Coordinate { x: number; y: number; }
interface BadgePaint { relativeCoordinate: Coordinate; text?: string; backgroungColor?: string; textColor?: string; }


function drawBadgeOnTask(canvas: G, rect: Coordinate, badge: BadgePaint, drawBackground: (link: A, badgeSize: number) => Shape): void {
  const badgeSize = 20;

  const absoluteBadgeX = rect.x - badgeSize / 2 + badge.relativeCoordinate.x;
  const absoluteBadgeY = rect.y - badgeSize / 2 + badge.relativeCoordinate.y;

  const link = canvas.group().link('https://github.com/process-analytics/bpmn-visualization-js');
  const background = drawBackground(link, badgeSize).x(absoluteBadgeX).y(absoluteBadgeY);
  if(badge.backgroungColor) {
    background.fill(badge.backgroungColor);
  }
  link.text(badge.text).fill(badge.textColor? badge.textColor : 'black').x(absoluteBadgeX + (badgeSize / 2)).y(absoluteBadgeY + 6).font({size: 10, anchor: 'middle'});
}

function drawBadgeOnEdge(canvas: G, markerPosition: string): void {
  const badgeSize = 35;

  (canvas.findOne('path:nth-child(2)') as Path).marker(markerPosition, badgeSize, badgeSize, function(add) {
    const link = add.link('https://github.com/process-analytics/bpmn-visualization-js');

    // From https://thenounproject.com/term/owl/147407/
    link.image('/static/img/owl-147407.png').size(badgeSize, badgeSize);
  });
}

export default class ShapeConfigurator {
  public configureShapes(): void {
    this.initMxShapePrototype();
    this.registerShapes();
  }

  private registerShapes(): void {
    // events
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_END, EndEventShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_START, StartEventShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_INTERMEDIATE_THROW, ThrowIntermediateEventShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH, CatchIntermediateEventShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.EVENT_BOUNDARY, BoundaryEventShape);
    // gateways
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_EVENT_BASED, EventBasedGatewayShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_EXCLUSIVE, ExclusiveGatewayShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_INCLUSIVE, InclusiveGatewayShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.GATEWAY_PARALLEL, ParallelGatewayShape);
    // activities
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.SUB_PROCESS, SubProcessShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.CALL_ACTIVITY, CallActivityShape);
    // tasks
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK, TaskShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_SERVICE, ServiceTaskShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_USER, UserTaskShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_RECEIVE, ReceiveTaskShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_SEND, SendTaskShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_MANUAL, ManualTaskShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_SCRIPT, ScriptTaskShape);
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TASK_BUSINESS_RULE, BusinessRuleTaskShape);
    // artifacts
    mxgraph.mxCellRenderer.registerShape(ShapeBpmnElementKind.TEXT_ANNOTATION, TextAnnotationShape);

    // shapes for flows
    mxgraph.mxCellRenderer.registerShape(StyleIdentifier.BPMN_STYLE_MESSAGE_FLOW_ICON, MessageFlowIconShape);
  }

  private initMxShapePrototype(): void {
    // The following is copied from the mxgraph mxShape implementation then converted to TypeScript and enriched for bpmn-visualization
    // It is needed for adding the custom attributes that permits identification of the BPMN elements in the DOM
    mxgraph.mxShape.prototype.createSvgCanvas = function () {
      const canvas = new mxgraph.mxSvgCanvas2D(this.node, false);
      canvas.strokeTolerance = this.pointerEvents ? this.svgStrokeTolerance : 0;
      canvas.pointerEventsValue = this.svgPointerEvents;
      // TODO remove this commented code (has been removed in mxgraph@4.1.1
      //((canvas as unknown) as mxgraph.mxSvgCanvas2D).blockImagePointerEvents = isFF;
      const off = this.getSvgScreenOffset();

      if (off != 0) {
        this.node.setAttribute('transform', 'translate(' + off + ',' + off + ')');
      } else {
        this.node.removeAttribute('transform');
      }

      // START bpmn-visualization CUSTOMIZATION
      // add attributes to be able to identify elements in DOM
      if (this.state && this.state.cell) {
        // 'this.state.style' = the style definition associated with the cell
        // 'this.state.cell.style' = the style applied to the cell: 1st draw: style name = bpmn shape name
        const cell = this.state.cell;
        // dialect = strictHtml is set means that current node holds an html label


        let allBpmnClassNames = computeAllBpmnClassNames(extractBpmnKindFromStyle(cell), this.dialect === mxgraph.mxConstants.DIALECT_STRICTHTML);
        const extraCssClasses =  this.state.style[StyleIdentifier.BPMN_STYLE_EXTRA_CSS_CLASSES];
        if (extraCssClasses) {
          allBpmnClassNames = allBpmnClassNames.concat(extraCssClasses);
        }
        this.node.setAttribute('class', allBpmnClassNames.join(' '));

        this.node.setAttribute('data-bpmn-id', this.state.cell.id);
      }
      // END bpmn-visualization CUSTOMIZATION


      canvas.minStrokeWidth = this.minSvgStrokeWidth;

      if (!this.antiAlias) {
        // Rounds all numbers in the SVG output to integers
        canvas.format = function (value: string) {
          return Math.round(parseFloat(value));
        };
      }

      return canvas;
    };

    mxgraph.mxShape.prototype.redrawShape = function()  {
      const canvas: mxSvgCanvas2D = this.createCanvas() as unknown as mxSvgCanvas2D;

      if (canvas != null)  {
        // Specifies if events should be handled
        canvas.pointerEvents = this.pointerEvents;

        this.paint(canvas);

        // START bpmn-visualization CUSTOMIZATION
        const extraBadges: Badge[] =  this.state.style[StyleIdentifier.BPMN_STYLE_EXTRA_BADGES];
        if(extraBadges){
          const node: SVGGElement = this.node as unknown as SVGGElement;
          const rect = node.children[0];
          const rectWidth = Number(rect.getAttribute('width'));
          const rectHeight = Number(rect.getAttribute('height'));
          const rectCoordinate = {x: Number(rect.getAttribute('x')),  y: Number(rect.getAttribute('y'))};

          const canvas = SVG(node);
          //   .panZoom({ zoomMin: 0.5, zoomMax: 20 });

          extraBadges.forEach((badge) => {
            switch (badge.position) {
              case Position.RIGHT_TOP: {
                drawBadgeOnTask(
                  canvas,
                  rectCoordinate,
                  {
                    relativeCoordinate: {
                      x: rectWidth, y:0
                    },
                    text: badge.value,
                    backgroungColor:'Chartreuse'
                  },
                  (link: A, badgeSize: number) => link.circle(badgeSize)
                );
                break;
              }
              case Position.RIGHT_BOTTOM: {
                drawBadgeOnTask(
                  canvas,
                  rectCoordinate,
                  {
                    relativeCoordinate: {
                      x: rectWidth, y: rectHeight
                    },
                    text: badge.value,
                    backgroungColor: 'DeepPink',
                    textColor: 'white'
                  },
                  (link: A, badgeSize: number) => link.rect(badgeSize, badgeSize).radius(5)
                );
                break;
              }
              case Position.LEFT_BOTTOM: {
                drawBadgeOnTask(
                  canvas,
                  rectCoordinate,
                  {
                    relativeCoordinate: {
                      x: 0, y: rectHeight
                    },
                    text: badge.value,
                    textColor: 'White'
                  },
                  (link: A, badgeSize: number) => {
                    var radial =  link.gradient('radial', function(add) {
                      add.stop(0, '#0f9')
                      add.stop(1, '#f06')
                    });
                    return link.ellipse(badgeSize * 2, badgeSize).move(badgeSize + 5, 5).fill(radial);
                  }
                );
                break;
              }
              case Position.LEFT_TOP: {
                drawBadgeOnTask(
                  canvas,
                  rectCoordinate,
                  {
                    relativeCoordinate: {
                      x: 0, y: 0
                    },
                    text: badge.value,
                    backgroungColor: 'Aquamarine'
                  },
                  (link: A, badgeSize: number) => {
                    const middleBadgeSize = badgeSize / 2;
                    const middlePlusBadgeSize = badgeSize / 2.5;
                    const middleMinusBadgeSize = badgeSize / 1.7;
                    return link.polygon(`${middleBadgeSize},0 ${middleMinusBadgeSize},${middlePlusBadgeSize} ${badgeSize},${middleBadgeSize} ${middleMinusBadgeSize},${middleMinusBadgeSize} ${middleBadgeSize},${badgeSize} ${middlePlusBadgeSize},${middleMinusBadgeSize} 0,${middleBadgeSize} ${middlePlusBadgeSize},${middlePlusBadgeSize}`);
                  }
                );
                break;
              }
              case Position.START: {
                drawBadgeOnEdge(canvas, 'start');
                break;
              }
              case Position.MIDDLE: {
                drawBadgeOnEdge(canvas, 'mid');
                break;
              }
              case Position.END: {
                drawBadgeOnEdge(canvas, 'end');
                break;
              }
            }
          });
        }
        // END bpmn-visualization CUSTOMIZATION

        // @ts-ignore
        this.destroyCanvas(canvas);
      }
    };
  }
}
