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
import { ShapeBpmnEventKind } from '../../../model/bpmn/shape/ShapeBpmnEventKind';
import IconPainter, { PaintParameter } from './IconPainter';
import StyleUtils, { StyleConstant } from '../StyleUtils';

declare const mxEllipse: typeof mxgraph.mxEllipse;

abstract class EventShape extends mxEllipse {
  // TODO: when all/more event types will be supported, we could move to a Record/MappedType
  private iconPainters: Map<ShapeBpmnEventKind, (paintParameter: PaintParameter) => void> = new Map([
    [ShapeBpmnEventKind.MESSAGE, (paintParameter: PaintParameter) => IconPainter.paintEnvelopeIcon({ ...paintParameter, ratioFromParent: 0.5 })],
    [ShapeBpmnEventKind.TERMINATE, (paintParameter: PaintParameter) => IconPainter.paintCircleIcon({ ...paintParameter, ratioFromParent: 0.6 })],
    [ShapeBpmnEventKind.TIMER, (paintParameter: PaintParameter) => IconPainter.paintClockIcon(paintParameter)],
  ]);

  protected withFilledIcon = false;

  protected constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  public paintVertexShape(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void {
    // TODO: This will be removed after implementation of all supported events
    // this.markNonFullyRenderedEvents(c);
    const paintParameter = IconPainter.buildPaintParameter(c, x, y, w, h, this, 0.25, this.withFilledIcon);
    this.paintOuterShape(paintParameter);
    this.paintInnerShape(paintParameter);
  }

  // This will be removed after implementation of all supported events
  // private markNonFullyRenderedEvents(c: mxgraph.mxXmlCanvas2D): void {
  //   const eventKind = this.getBpmnEventKind();
  //   if (eventKind == ShapeBpmnEventKind.TIMER) {
  //     c.setFillColor('green');
  //     c.setFillAlpha(0.3);
  //   }
  // }

  protected paintOuterShape({ c, shape: { x, y, w, h } }: PaintParameter): void {
    super.paintVertexShape(c, x, y, w, h);
  }

  protected paintInnerShape(paintParameter: PaintParameter): void {
    const paintIcon = this.iconPainters.get(StyleUtils.getBpmnEventKind(this.style)) || (() => IconPainter.paintEmptyIcon());
    paintIcon(paintParameter);
  }
}

export class StartEventShape extends EventShape {
  public constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth: number = StyleConstant.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }
}

export class EndEventShape extends EventShape {
  public constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth: number = StyleConstant.STROKE_WIDTH_THICK) {
    super(bounds, fill, stroke, strokewidth);
    this.withFilledIcon = true;
  }
}

abstract class IntermediateEventShape extends EventShape {
  protected constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth: number = StyleConstant.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  // this implementation is adapted from the draw.io BPMN 'throwing' outlines
  // https://github.com/jgraph/drawio/blob/0e19be6b42755790a749af30450c78c0d83be765/src/main/webapp/shapes/bpmn/mxBpmnShape2.js#L431
  protected paintOuterShape({ c, shape: { x, y, w, h, strokeWidth } }: PaintParameter): void {
    c.ellipse(x, y, w, h);
    c.fillAndStroke();

    const inset = strokeWidth * 1.5;
    c.ellipse(w * 0.02 + inset + x, h * 0.02 + inset + y, w * 0.96 - 2 * inset, h * 0.96 - 2 * inset);
    c.stroke();
  }
}

export class CatchIntermediateEventShape extends IntermediateEventShape {
  public constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth?: number) {
    super(bounds, fill, stroke, strokewidth);
  }
}

export class ThrowIntermediateEventShape extends IntermediateEventShape {
  public constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth?: number) {
    super(bounds, fill, stroke, strokewidth);
    this.withFilledIcon = true;
  }
}

export class BoundaryEventShape extends IntermediateEventShape {
  public constructor(bounds: mxgraph.mxRectangle, fill: string, stroke: string, strokewidth?: number) {
    super(bounds, fill, stroke, strokewidth);
  }

  public configureCanvas(c: mxgraph.mxXmlCanvas2D, x: number, y: number, w: number, h: number): void {
    super.configureCanvas(c, x, y, w, h);

    const isInterrupting = StyleUtils.getBpmnIsInterrupting(this.style);
    if (isInterrupting === 'false') {
      if (StyleUtils.getBpmnEventKind(this.style) === ShapeBpmnEventKind.TIMER) {
        c.setFillColor('LightPink');
      } else {
        c.setDashed(1, null);
      }
    }
  }
}
