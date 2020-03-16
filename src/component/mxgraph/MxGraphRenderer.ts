import { mxgraph, mxgraphFactory } from 'ts-mxgraph';
import Shape from '../../model/bpmn/shape/Shape';
import Edge from '../../model/bpmn/edge/Edge';
import BpmnModel from '../../model/bpmn/BpmnModel';
import ShapeBpmnElement from '../../model/bpmn/shape/ShapeBpmnElement';

const { mxPoint } = mxgraphFactory({
  mxLoadResources: false,
  mxLoadStylesheets: false,
});

export default class MxGraphRenderer {
  constructor(readonly graph: mxgraph.mxGraph) {}

  public render(bpmnModel: BpmnModel): void {
    const model = this.graph.getModel();
    model.clear(); // ensure to remove manual changes or already loaded graphs
    model.beginUpdate();
    try {
      this.insertLanes(bpmnModel.lanes);
      this.insertFlowNodes(bpmnModel.flowNodes);
      this.insertEdges(bpmnModel.edges);
    } finally {
      model.endUpdate();
    }
  }

  private insertLanes(lanes: Shape[]): void {
    const getParent = (): mxgraph.mxCell => {
      return this.graph.getDefaultParent();
    };

    this.insertShapes(lanes, getParent);
  }

  private insertFlowNodes(flowNodes: Shape[]): void {
    const getParent = (bpmnElement: ShapeBpmnElement): mxgraph.mxCell => {
      const bpmnElementParent = this.getCell(bpmnElement.parentId);
      if (bpmnElementParent) {
        return bpmnElementParent;
      }
      return this.graph.getDefaultParent();
    };

    this.insertShapes(flowNodes, getParent);
  }

  private insertShapes(shapes: Shape[], getParent: (bpmnElement: ShapeBpmnElement) => mxgraph.mxCell): void {
    shapes.forEach(shape => {
      this.insertShape(shape, getParent);
    });
  }

  private insertShape(shape: Shape, getParent: (bpmnElement: ShapeBpmnElement) => mxgraph.mxCell): void {
    const bpmnElement = shape.bpmnElement;
    if (bpmnElement) {
      const bounds = shape.bounds;
      const parent = getParent(bpmnElement);
      this.insertVertexGivenAbsoluteCoordinates(parent, bpmnElement.id, bpmnElement.name, bounds.x, bounds.y, bounds.width, bounds.height, bpmnElement.kind);
    }
  }

  private insertEdges(edges: Edge[]): void {
    edges.forEach(edge => {
      const bpmnElement = edge.bpmnElement;
      if (bpmnElement) {
        const parent = this.graph.getDefaultParent();
        this.graph.insertEdge(parent, bpmnElement.id, bpmnElement.name, this.getCell(bpmnElement.sourceRefId), this.getCell(bpmnElement.targetRefId));
      }
    });
  }

  private getCell(id: string): mxgraph.mxCell {
    return this.graph.getModel().getCell(id);
  }

  private insertVertexGivenAbsoluteCoordinates(
    parent: mxgraph.mxCell,
    id: string | null,
    value: string,
    x: number,
    y: number,
    width: number,
    height: number,
    style?: string,
  ): mxgraph.mxCell {
    const translateForRoot = this.getTranslateForRoot(parent);
    const relativeX = x + translateForRoot.x;
    const relativeY = y + translateForRoot.y;

    return this.graph.insertVertex(parent, id, value, relativeX, relativeY, width, height, style);
  }

  // Returns the translation to be applied to a cell whose mxGeometry x and y values are expressed with absolute coordinates
  // (i.e related to the graph default parent) you want to assign as parent to the cell passed as argument of this function.
  // That way, you will be able to express the cell coordinates as relative to its parent cell.
  //
  // The implementation taken from the example described in the documentation of mxgraph#getTranslateForRoot
  // The translation is generally negative
  private getTranslateForRoot(cell: mxgraph.mxCell): mxgraph.mxPoint {
    const model = this.graph.getModel();
    const offset = new mxPoint(0, 0);

    while (cell != null) {
      const geo = model.getGeometry(cell);
      if (geo != null) {
        offset.x -= geo.x;
        offset.y -= geo.y;
      }
      cell = model.getParent(cell);
    }

    return offset;
  }
}
