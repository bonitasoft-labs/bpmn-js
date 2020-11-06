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
import StyleUtils, { StyleDefault } from '../StyleUtils';
import { PaintParameter, buildPaintParameter, IconPainterProvider } from './render';
import BpmnCanvas from './render/BpmnCanvas';

abstract class GatewayShape extends mxRhombus {
  protected iconPainter = IconPainterProvider.get();

  protected constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected abstract paintInnerShape(paintParameter: PaintParameter): void;

  public paintVertexShape(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    const paintParameter = buildPaintParameter(c, x, y, w, h, this);
    this.paintOuterShape(paintParameter);
    this.paintInnerShape(paintParameter);
  }

  protected paintOuterShape({ c, shape: { x, y, w, h } }: PaintParameter): void {
    super.paintVertexShape(c, x, y, w, h);
  }
}

export class ExclusiveGatewayShape extends GatewayShape {
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(paintParameter: PaintParameter): void {
    this.iconPainter.paintXCrossIcon({
      ...paintParameter,
      icon: { ...paintParameter.icon, isFilled: true },
      setIconOrigin: (canvas: BpmnCanvas) => canvas.setIconOriginToShapeTopLeftProportionally(4),
    });
  }
}

export class ParallelGatewayShape extends GatewayShape {
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(paintParameter: PaintParameter): void {
    this.iconPainter.paintPlusCrossIcon({ ...paintParameter, setIconOrigin: (canvas: BpmnCanvas) => canvas.setIconOriginToShapeTopLeftProportionally(4) });
  }
}

export class InclusiveGatewayShape extends GatewayShape {
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(paintParameter: PaintParameter): void {
    this.iconPainter.paintCircleIcon({
      ...paintParameter,
      ratioFromParent: 0.62,
      icon: { ...paintParameter.icon, isFilled: false, strokeWidth: StyleDefault.STROKE_WIDTH_THICK.valueOf() },
    });
  }
}

export class EventBasedGatewayShape extends GatewayShape {
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintOuterShape(paintParameter: PaintParameter): void {
    const isParallel = this.style['bpmn.eventGatewayType'] == 'Parallel';
    const fillColor = StyleUtils.getBpmnIsInstantiating(this.style) ? (isParallel ? 'lightBlue' : 'purple') : 'orange';

    paintParameter.c.setFillColor(fillColor);
    paintParameter.c.setFillAlpha(0.6);
    super.paintOuterShape(paintParameter);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected paintInnerShape(paintParameter: PaintParameter): void {
    // TODO rendering will be managed later
  }
}
