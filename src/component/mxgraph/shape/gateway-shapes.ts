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

import { MxGraphFactoryService } from '../../../service/MxGraphFactoryService';
import { mxgraph } from 'ts-mxgraph';
import { StyleConstant } from '../StyleConfigurator';
import MxScaleFactorCanvas from '../extension/MxScaleFactorCanvas';

const mxRhombus: typeof mxgraph.mxRhombus = MxGraphFactoryService.getMxGraphProperty('mxRhombus');

abstract class GatewayShape extends mxRhombus {
  protected constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected abstract paintInnerShape(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void;

  public paintVertexShape(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void {
    this.paintOuterShape(c, x, y, w, h);
    this.paintInnerShape(c, x, y, w, h);
  }

  protected paintOuterShape(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void {
    super.paintVertexShape(c, x, y, w, h);
  }

  protected configureCanvasForIcon(c: mxgraph.mxXmlCanvas2D, parentWidth: number, parentHeight: number, iconOriginalSize: number): MxScaleFactorCanvas {
    // ensure we are not impacted by the configured shape stroke width
    c.setStrokeWidth(1);
    c.setFillColor(this.stroke);

    const parentSize = Math.min(parentWidth, parentHeight);
    const ratioFromParent = 0.25;
    const scaleFactor = iconOriginalSize !== 0 ? (parentSize / iconOriginalSize) * ratioFromParent : 0.5;

    return new MxScaleFactorCanvas(c, scaleFactor);
  }

  protected translateToStartingIconPosition(c: mxgraph.mxXmlCanvas2D, parentX: number, parentY: number, parentWidth: number, parentHeight: number): void {
    const xTranslation = parentX + parentWidth / 4;
    const yTranslation = parentY + parentHeight / 4;
    c.translate(xTranslation, yTranslation);
  }

  protected drawCrossSymbol(canvas: MxScaleFactorCanvas, parentWidth: number, parentHeight: number): void {
    canvas.begin();
    canvas.moveTo(parentWidth * 0.38, 0);
    canvas.lineTo(parentWidth * 0.62, 0);
    canvas.lineTo(parentWidth * 0.62, parentHeight * 0.38);
    canvas.lineTo(parentWidth, parentHeight * 0.38);
    canvas.lineTo(parentWidth, parentHeight * 0.62);
    canvas.lineTo(parentWidth * 0.62, parentHeight * 0.62);
    canvas.lineTo(parentWidth * 0.62, parentHeight);
    canvas.lineTo(parentWidth * 0.38, parentHeight);
    canvas.lineTo(parentWidth * 0.38, parentHeight * 0.62);
    canvas.lineTo(0, parentHeight * 0.62);
    canvas.lineTo(0, parentHeight * 0.38);
    canvas.lineTo(parentWidth * 0.38, parentHeight * 0.38);
    canvas.close();
  }
}

export class ExclusiveGatewayShape extends GatewayShape {
  public constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth: number = StyleConstant.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void {
    this.addExclusiveGatewaySymbol(c, x, y, w, h);
  }

  private addExclusiveGatewaySymbol(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void {
    const canvas = this.configureCanvasForIcon(c, w, h, 0);
    this.translateToStartingIconPosition(c, x, y, w, h);

    this.drawCrossSymbol(canvas, w, h);
    const xRotation = w / 4;
    const yRotation = h / 4;
    canvas.rotate(45, false, false, xRotation, yRotation);
    canvas.fillAndStroke();
  }
}

export class ParallelGatewayShape extends GatewayShape {
  public constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth: number = StyleConstant.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void {
    this.addParallelGatewaySymbol(c, x, y, w, h);
  }

  private addParallelGatewaySymbol(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void {
    const canvas = this.configureCanvasForIcon(c, w, h, 0);
    this.translateToStartingIconPosition(c, x, y, w, h);

    this.drawCrossSymbol(canvas, w, h);
    canvas.fillAndStroke();
  }
}
