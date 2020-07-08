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
import { StyleDefault } from '../StyleUtils';

export class TextAnnotationShape extends mxRectangleShape {
  private readonly TEXT_ANNOTATION_BORDER_LENGTH = 10;
  public constructor(bounds: mxRectangle, fill: string, stroke: string, strokewidth: number = StyleDefault.STROKE_WIDTH_THIN) {
    super(bounds, fill, stroke, strokewidth);
  }

  public paintBackground(c: mxAbstractCanvas2D, x: number, y: number, w: number, h: number): void {
    // TODO temp. Missing fillAndStroke on mxAbstractCanvas2D
    const xmlCanvas = (c as unknown) as mxgraph.mxXmlCanvas2D;

    // paint sort of left square bracket shape - for text annotation
    xmlCanvas.begin();
    xmlCanvas.moveTo(x + this.TEXT_ANNOTATION_BORDER_LENGTH, y);
    xmlCanvas.lineTo(x, y);
    xmlCanvas.lineTo(x, y + h);
    xmlCanvas.lineTo(x + this.TEXT_ANNOTATION_BORDER_LENGTH, y + h);

    xmlCanvas.fillAndStroke();
  }
}
