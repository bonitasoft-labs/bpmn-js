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
import { parseJsonAndExpectOnlyEdges, parseJsonAndExpectOnlyFlowNodes, verifyLabelBounds } from './JsonTestUtils';
import each from 'jest-each';

describe('parse bpmn as json for label bounds', () => {
  each([
    ['exclusiveGateway'],
    ['inclusiveGateway'],
    ['task'],
    ['userTask'],
    ['serviceTask'],
    ['callActivity'],
    ['receiveTask'],
    ['subProcess'],
    ['textAnnotation'],
    // TODO: To uncomment when we support complex gateway
    //['complexGateway'],
    // TODO: To uncomment when we support manualTask
    //['manualTask'],
    // TODO: To uncomment when we support scriptTask
    //['scriptTask'],
    // TODO: To uncomment when we support sendTask
    //['sendTask'],
    // TODO: To uncomment when we support businessRuleTask
    //['businessRuleTask'],
  ]).it('json containing a BPMNShape which has a label with bounds with all attributes in a %s', sourceKind => {
    const json = `{
          "definitions": {
              "process": {
                  "id": "Process_1",
                  "${sourceKind}": { "id": "source_id_0", "name": "${sourceKind}_id_0"}
              },
              "BPMNDiagram": {
                  "id": "BpmnDiagram_1",
                  "BPMNPlane": {
                      "id": "BpmnPlane_1",
                      "BPMNShape": {
                          "id": "shape_source_id_0",
                          "bpmnElement": "source_id_0",
                          "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 },
                          "BPMNLabel": {
                             "id": "label_id",
                             "Bounds": { "x": 25, "y": 26, "width": 27, "height": 28 }
                          }
                      }
                  }
              }
          }
      }`;

    const model = parseJsonAndExpectOnlyFlowNodes(json, 1);

    verifyLabelBounds(model.flowNodes[0].label, { x: 25, y: 26, width: 27, height: 28 });
  });

  it('json containing a BPMNEdge which has a label with bounds with all attributes', () => {
    const json = `{
       "definitions": {
          "process": "",
          "BPMNDiagram": {
             "id": "BpmnDiagram_1",
             "BPMNPlane": {
                "id": "BpmnPlane_1",
                "BPMNEdge": {
                   "id": "BPMNEdge_id_0",
                   "BPMNLabel": {
                      "id": "label_id",
                      "Bounds": { "x": 25, "y": 26, "width": 27, "height": 28 }
                   }
                }
             }
          }
       }
    }`;

    const model = parseJsonAndExpectOnlyEdges(json, 1);

    verifyLabelBounds(model.edges[0].label, { x: 25, y: 26, width: 27, height: 28 });
  });

  it('json containing a BPMNShape which has a label with bounds without attribute', () => {
    const json = `{
       "definitions": {
          "process": {
             "task": {
                "id": "task_id_0",
                "name": "task name"
             }
          },
          "BPMNDiagram": {
             "id": "BpmnDiagram_1",
             "BPMNPlane": {
                "id": "BpmnPlane_1",
                "BPMNShape": {
                   "id": "BPMNShape_id_0",
                   "bpmnElement": "task_id_0",
                   "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 },
                   "BPMNLabel": {
                      "id": "label_id",
                      "Bounds": ""
                   }
                }
             }
          }
       }
    }`;

    const model = parseJsonAndExpectOnlyFlowNodes(json, 1);

    expect(model.flowNodes[0].label).toBeUndefined();
  });

  it('json containing a BPMNEdge which has a label with bounds without attribute', () => {
    const json = `{
       "definitions": {
          "process": "",
          "BPMNDiagram": {
             "id": "BpmnDiagram_1",
             "BPMNPlane": {
                "id": "BpmnPlane_1",
                "BPMNEdge": {
                   "id": "BPMNEdge_id_0",
                   "BPMNLabel": {
                      "id": "label_id",
                      "Bounds": ""
                   }
                }
             }
          }
       }
    }`;

    const model = parseJsonAndExpectOnlyEdges(json, 1);

    expect(model.edges[0].label).toBeUndefined();
  });

  it('json containing a BPMNShape which has a label without bounds', () => {
    const json = `{
       "definitions": {
          "process": {
             "task": {
                "id": "task_id_0",
                "name": "task name"
             }
          },
          "BPMNDiagram": {
             "id": "BpmnDiagram_1",
             "BPMNPlane": {
                "id": "BpmnPlane_1",
                "BPMNShape": {
                   "id": "BPMNShape_id_0",
                   "bpmnElement": "task_id_0",
                   "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 },
                   "BPMNLabel": {
                      "id": "label_id"
                   }
                }
             }
          }
       }
    }`;

    const model = parseJsonAndExpectOnlyFlowNodes(json, 1);

    expect(model.flowNodes[0].label).toBeUndefined();
  });

  it('json containing a BPMNEdge which has a label without bounds', () => {
    const json = `{
       "definitions": {
          "process": "",
          "BPMNDiagram": {
             "id": "BpmnDiagram_1",
             "BPMNPlane": {
                "id": "BpmnPlane_1",
                "BPMNEdge": {
                   "id": "BPMNEdge_id_0",
                   "BPMNLabel": {
                      "id": "label_id"
                   }
                }
             }
          }
       }
    }`;

    const model = parseJsonAndExpectOnlyEdges(json, 1);

    expect(model.edges[0].label).toBeUndefined();
  });
});
