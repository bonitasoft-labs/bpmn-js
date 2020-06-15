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
import { MxGraphFactoryService } from '../../service/MxGraphFactoryService';
import { ShapeBpmnEventKind } from '../../model/bpmn/shape/ShapeBpmnEventKind';

const mxUtils: typeof mxgraph.mxUtils = MxGraphFactoryService.getMxGraphProperty('mxUtils');
const mxConstants: typeof mxgraph.mxConstants = MxGraphFactoryService.getMxGraphProperty('mxConstants');

export enum StyleConstant {
  STROKE_WIDTH_THIN = 2,
  STROKE_WIDTH_THICK = 5,
  BPMN_STYLE_EVENT_KIND = 'bpmn.eventKind',
  DEFAULT_FILL_COLOR = 'White',
  DEFAULT_STROKE_COLOR = 'Black',
  DEFAULT_FONT_FAMILY = 'Arial, Helvetica, sans-serif', // define our own to not depends on eventual mxGraph default change
  DEFAULT_FONT_SIZE = 11,
  DEFAULT_FONT_COLOR = 'Black',
  DEFAULT_MARGIN = 0,
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export default class StyleUtils {
  public static getFillColor(style: any): string {
    return mxUtils.getValue(style, mxConstants.STYLE_FILLCOLOR, StyleConstant.DEFAULT_FILL_COLOR);
  }

  public static getStrokeColor(style: any): string {
    return mxUtils.getValue(style, mxConstants.STYLE_STROKECOLOR, StyleConstant.DEFAULT_STROKE_COLOR);
  }

  public static getStrokeWidth(style: any): number {
    return mxUtils.getValue(style, mxConstants.STYLE_STROKEWIDTH, StyleConstant.STROKE_WIDTH_THIN);
  }

  public static getMargin(style: any): number {
    return mxUtils.getValue(style, mxConstants.STYLE_MARGIN, StyleConstant.DEFAULT_MARGIN);
  }

  public static getBpmnEventKind(style: any): ShapeBpmnEventKind {
    return mxUtils.getValue(style, StyleConstant.BPMN_STYLE_EVENT_KIND, ShapeBpmnEventKind.NONE);
  }
}
