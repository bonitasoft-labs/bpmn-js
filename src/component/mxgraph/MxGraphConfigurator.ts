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
import StyleConfigurator from './config/StyleConfigurator';
import ShapeConfigurator from './config/ShapeConfigurator';
import MarkerConfigurator from './config/MarkerConfigurator';
import MxClientConfigurator from './config/MxClientConfigurator';
import { BpmnVisualizationOptions, ZoomConfiguration } from '../BpmnVisualization';
import { mxgraph } from 'ts-mxgraph';
import { BpmnMxGraph } from './BpmnMxGraph';
// TODO unable to load mxClient from mxgraph-type-definitions@1.0.4
declare const mxClient: typeof mxgraph.mxClient;

/**
 * Configure the BpmnMxGraph graph that can be used by the lib
 * <ul>
 *     <li>styles
 *     <li>shapes
 *     <li>markers
 */
export default class MxGraphConfigurator {
  private readonly graph: BpmnMxGraph;

  constructor(readonly container: HTMLElement) {
    this.graph = new BpmnMxGraph(container);
  }

  public configure(options?: BpmnVisualizationOptions): BpmnMxGraph {
    this.configureGraph();
    this.configureMouseNavigationSupport(options);
    new StyleConfigurator(this.graph).configureStyles();
    new ShapeConfigurator().configureShapes();
    new MarkerConfigurator().configureMarkers();
    new MxClientConfigurator().configureMxCodec();
    return this.graph;
  }

  private configureGraph(): void {
    this.graph.setCellsLocked(true);
    this.graph.setCellsSelectable(false);
    this.graph.setEdgeLabelsMovable(false);

    this.graph.setHtmlLabels(true); // required for wrapping

    // To have the boundary event on the border of a task
    this.graph.setConstrainChildren(false);
    this.graph.setExtendParents(false);

    // Disable folding for container mxCell (pool, lane, sub process, call activity) because we don't need it.
    // This also prevents requesting unavailable images (see #185) as we don't override BpmnMxGraph folding default images.
    this.graph.foldingEnabled = false;
  }

  private configureMouseNavigationSupport(options?: BpmnVisualizationOptions): void {
    const mouseNavigationSupport = options?.mouseNavigationSupport;
    // Pan configuration
    if (mouseNavigationSupport) {
      this.graph.panningHandler.useLeftButtonForPanning = true;
      this.graph.panningHandler.ignoreCell = true; // ok here as we cannot select cells
      this.graph.panningHandler.addListener(mxEvent.PAN_START, this.getPanningHandler('grab'));
      this.graph.panningHandler.addListener(mxEvent.PAN_END, this.getPanningHandler('default'));
      this.graph.setPanning(true);

      this.graph.createMouseWheelZoomExperience(options.zoomConfiguration);
      // eslint-disable-next-line no-console
      console.log('___ ZOOM CONFIG ___', options.zoomConfiguration);
    } else {
      this.graph.setPanning(false);
      this.graph.panningHandler.setPinchEnabled(false); // ensure gesture support is disabled (zoom only for now!)
    }

    this.configureMouseEvent(mouseNavigationSupport);
  }

  private getPanningHandler(cursor: 'grab' | 'default'): OmitThisParameter<(this: BpmnMxGraph) => void> {
    return this.getPanningHandlerCallback(cursor).bind(this.graph);
  }

  private getPanningHandlerCallback(cursor: 'grab' | 'default'): () => void {
    return function (this: BpmnMxGraph): void {
      this.isEnabled() && (this.container.style.cursor = cursor);
    };
  }

  private configureMouseEvent(activated = false): void {
    if (activated) {
      this.graph.createMouseWheelZoomExperience();
    }
  }
}
