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
import { MxGraphFactoryService } from '../../service/MxGraphFactoryService';

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class StyleConfigurator {
  private mxUtils: any = MxGraphFactoryService.getMxGraphProperty('mxUtils');
  private mxConstants: any = MxGraphFactoryService.getMxGraphProperty('mxConstants');
  private mxPerimeter: any = MxGraphFactoryService.getMxGraphProperty('mxPerimeter');

  constructor(private graph: mxgraph.mxGraph) {}

  public configureStyles(): void {
    this.configureDefaultVertexStyle();
    this.configurePoolStyle();
    this.configureLaneStyle();
    this.configureStartEventStyle();
    this.configureEndEventStyle();
    this.configureUserTaskStyle();
    this.configureTaskStyle();
    this.configureParallelGatewayStyle();
    this.configureExclusiveGatewayStyle();
  }

  private getStylesheet(): any {
    return this.graph.getStylesheet();
  }

  private getDefaultVertexStyle(): any {
    return this.getStylesheet().getDefaultVertexStyle();
  }

  private cloneDefaultVertexStyle(): any {
    const defaultStyle = this.getDefaultVertexStyle();
    return this.mxUtils.clone(defaultStyle);
  }

  private putCellStyle(name: ShapeBpmnElementKind, style: any): void {
    this.getStylesheet().putCellStyle(name, style);
  }

  private configureDefaultVertexStyle(): void {
    const style = this.getDefaultVertexStyle();
    style[this.mxConstants.STYLE_HORIZONTAL] = true;
    style[this.mxConstants.STYLE_FONTSIZE] = 15;
    style[this.mxConstants.STYLE_FILLCOLOR] = 'white';
    style[this.mxConstants.STYLE_FONTCOLOR] = 'black';
    style[this.mxConstants.STYLE_STROKECOLOR] = 'black';
    style[this.mxConstants.STYLE_LABEL_BACKGROUNDCOLOR] = 'none';
  }

  private configurePoolStyle(): void {
    const style = this.cloneDefaultVertexStyle();
    style[this.mxConstants.STYLE_SHAPE] = this.mxConstants.SHAPE_SWIMLANE;
    style[this.mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[this.mxConstants.STYLE_HORIZONTAL] = false;
    style[this.mxConstants.STYLE_FILLCOLOR] = '#d3d2d1';

    // TODO manage pool text area rendering
    // most of BPMN pool are ok when setting it to 30
    style[this.mxConstants.STYLE_STARTSIZE] = 30;

    this.graph.getStylesheet().putCellStyle(ShapeBpmnElementKind.POOL, style);
  }

  private configureLaneStyle(): void {
    const style = this.cloneDefaultVertexStyle();
    style[this.mxConstants.STYLE_SHAPE] = this.mxConstants.SHAPE_SWIMLANE;
    style[this.mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[this.mxConstants.STYLE_HORIZONTAL] = false;
    style[this.mxConstants.STYLE_SWIMLANE_LINE] = 0; // hide the line between the title region and the content area

    this.graph.getStylesheet().putCellStyle(ShapeBpmnElementKind.LANE, style);
  }

  private configureStartEventStyle(): void {
    const style = this.cloneDefaultVertexStyle();
    style[this.mxConstants.STYLE_SHAPE] = this.mxConstants.SHAPE_ELLIPSE;
    style[this.mxConstants.STYLE_PERIMETER] = this.mxPerimeter.EllipsePerimeter;
    style[this.mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
    style[this.mxConstants.STYLE_STROKECOLOR] = '#62A928';
    style[this.mxConstants.STYLE_STROKEWIDTH] = 1.7;
    style[this.mxConstants.STYLE_GRADIENTCOLOR] = '#E9ECB1';
    this.putCellStyle(ShapeBpmnElementKind.EVENT_START, style);
  }

  private configureEndEventStyle(): void {
    const style = this.cloneDefaultVertexStyle();
    style[this.mxConstants.STYLE_SHAPE] = ShapeBpmnElementKind.EVENT_END;
    style[this.mxConstants.STYLE_PERIMETER] = this.mxPerimeter.EllipsePerimeter;
    style[this.mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
    style[this.mxConstants.STYLE_STROKECOLOR] = 'black';
    // style[this.mxConstants.STYLE_STROKEWIDTH] = 3.4;
    this.putCellStyle(ShapeBpmnElementKind.EVENT_END, style);
  }

  private configureUserTaskStyle(): void {
    const style = this.cloneDefaultVertexStyle();
    style[this.mxConstants.STYLE_SHAPE] = this.mxConstants.SHAPE_RECTANGLE;
    style[this.mxConstants.STYLE_VERTICAL_ALIGN] = 'middle';
    style[this.mxConstants.STYLE_STROKECOLOR] = '#2C6DA3';
    style[this.mxConstants.STYLE_STROKEWIDTH] = 2;
    style[this.mxConstants.STYLE_ROUNDED] = true;
    this.putCellStyle(ShapeBpmnElementKind.TASK_USER, style);
  }

  private configureTaskStyle(): void {
    const style = this.mxUtils.clone(this.getStylesheet().getCellStyle(ShapeBpmnElementKind.TASK_USER), this.getDefaultVertexStyle());
    style[this.mxConstants.STYLE_STROKECOLOR] = '#663399';
    this.putCellStyle(ShapeBpmnElementKind.TASK, style);
  }

  private configureParallelGatewayStyle(): void {
    const style = this.cloneDefaultVertexStyle();
    style[this.mxConstants.STYLE_SHAPE] = this.mxConstants.SHAPE_RHOMBUS;
    style[this.mxConstants.STYLE_PERIMETER] = this.mxPerimeter.RhombusPerimeter;
    style[this.mxConstants.STYLE_VERTICAL_ALIGN] = 'top';
    style[this.mxConstants.STYLE_STROKECOLOR] = '#96A826';
    style[this.mxConstants.STYLE_STROKEWIDTH] = 1.7;

    style[this.mxConstants.STYLE_SPACING_TOP] = 55;
    style[this.mxConstants.STYLE_SPACING_RIGHT] = 110;
    style[this.mxConstants.STYLE_GRADIENTCOLOR] = '#E9ECB1';
    this.putCellStyle(ShapeBpmnElementKind.GATEWAY_PARALLEL, style);
  }

  private configureExclusiveGatewayStyle(): void {
    const style = this.mxUtils.clone(this.getStylesheet().getCellStyle(ShapeBpmnElementKind.GATEWAY_PARALLEL), this.getDefaultVertexStyle());
    style[this.mxConstants.STYLE_GRADIENTCOLOR] = '#DDA0DD';
    this.putCellStyle(ShapeBpmnElementKind.GATEWAY_EXCLUSIVE, style);
  }
}
