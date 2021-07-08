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
import { mxgraph } from '../initializer';
import { mxAbstractCanvas2D, mxRectangle } from 'mxgraph'; // for types

abstract class GatewayShape extends mxgraph.mxRhombus {
  protected iconPainter = IconPainterProvider.get();

  protected constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected abstract paintInnerShape(paintParameter: PaintParameter): void;

  public paintVertexShape(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    const paintParameter = buildPaintParameter({ canvas: c, x, y, width: w, height: h, shape: this });
    this.paintOuterShape(paintParameter);
    this.paintInnerShape(paintParameter);
  }

  protected paintOuterShape({ canvas, shapeConfig: { x, y, width, height } }: PaintParameter): void {
    super.paintVertexShape(canvas, x, y, width, height);
  }
}

/**
 * @internal
 */
export class ExclusiveGatewayShape extends GatewayShape {
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(paintParameter: PaintParameter): void {
    this.iconPainter.paintXCrossIcon({
      ...paintParameter,
      iconStyleConfig: { ...paintParameter.iconStyleConfig, isFilled: true },
      ratioFromParent: 0.5,
    });
  }
}

/**
 * @internal
 */
export class ParallelGatewayShape extends GatewayShape {
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(paintParameter: PaintParameter): void {
    this.iconPainter.paintPlusCrossIcon({
      ...paintParameter,
      iconStyleConfig: { ...paintParameter.iconStyleConfig, isFilled: true },
      ratioFromParent: 0.5,
    });
  }
}

/**
 * @internal
 */
export class InclusiveGatewayShape extends GatewayShape {
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(paintParameter: PaintParameter): void {
    this.iconPainter.paintCircleIcon({
      ...paintParameter,
      ratioFromParent: 0.62,
      iconStyleConfig: { ...paintParameter.iconStyleConfig, isFilled: false, strokeWidth: StyleDefault.STROKE_WIDTH_THICK.valueOf() },
    });
  }
}

/**
 * @internal
 */
export class EventBasedGatewayShape extends GatewayShape {
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  protected paintInnerShape(paintParameter: PaintParameter): void {
    paintParameter = { ...paintParameter, iconStyleConfig: { ...paintParameter.iconStyleConfig, strokeWidth: 1 } };

    // circle (simple or double)
    this.iconPainter.paintCircleIcon({
      ...paintParameter,
      ratioFromParent: 0.55,
    });
    if (!StyleUtils.getBpmnIsInstantiating(this.style)) {
      this.iconPainter.paintCircleIcon({
        ...paintParameter,
        ratioFromParent: 0.45,
      });
    }

    // inner icon
    const innerIconPaintParameter = {
      ...paintParameter,
      ratioFromParent: 0.3,
    };
    if (StyleUtils.getBpmnIsParallelEventBasedGateway(this.style)) {
      this.iconPainter.paintPlusCrossIcon(innerIconPaintParameter);
    } else {
      this.iconPainter.paintPentagon(innerIconPaintParameter);
    }
  }
}
