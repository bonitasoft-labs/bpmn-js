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
import { ShapeBpmnElementKind } from '../../../../../src/model/bpmn/shape/ShapeBpmnElementKind';
import { parseJsonAndExpectOnlyEvent, parseJsonAndExpectOnlyFlowNodes, verifyShape } from './JsonTestUtils';
import { ShapeBpmnEventKind } from '../../../../../src/model/bpmn/shape/ShapeBpmnEventKind';

describe('parse bpmn as json for signal start event', () => {
  it('json containing one process with a signal start event defined as empty string, signal start event is present', () => {
    const json = `{
                  "definitions" : {
                    "process": {                      
                      "isExecutable": false,
                      "startEvent": [
                        {
                          "id": "event_id_0",
                          "name": "signal start",
                          "outgoing": "Flow_04vixp4",
                          "signalEventDefinition": ""
                        }
                      ]
                    },
                     "BPMNDiagram": {
                        "name":"Process_0d9ulqq",
                        "BPMNPlane": {
                            "BPMNShape": {
                                "id":"shape_startEvent_id_0",
                                "bpmnElement":"event_id_0",
                                "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 }
                            }
                        }
                    }
                  }
                }`;

    const model = parseJsonAndExpectOnlyEvent(json, ShapeBpmnEventKind.SIGNAL, 1);

    verifyShape(model.flowNodes[0], {
      shapeId: 'shape_startEvent_id_0',
      bpmnElementId: 'event_id_0',
      bpmnElementName: 'signal start',
      bpmnElementKind: ShapeBpmnElementKind.EVENT_START,
      bounds: {
        x: 362,
        y: 232,
        width: 36,
        height: 45,
      },
    });
  });

  it('json containing one process with a signal start event defined as object, signal start event is present', () => {
    const json = `{
                  "definitions" : {
                    "process": {                      
                      "isExecutable": false,
                      "startEvent": [
                      {
                        "id": "event_id_0",
                        "name": "signal start",
                        "outgoing": "Flow_04vixp4",
                        "signalEventDefinition": {
                          "id": "SignalEventDefinition_007"
                        }
                      }
                    ]
                    },
                     "BPMNDiagram": {
                        "name":"Process_0d9ulqq",
                        "BPMNPlane": {
                            "BPMNShape": {
                                "id":"shape_startEvent_id_0",
                                "bpmnElement":"event_id_0",
                                "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 }
                            }
                        }
                    }
                  }
                }`;

    const model = parseJsonAndExpectOnlyEvent(json, ShapeBpmnEventKind.SIGNAL, 1);

    verifyShape(model.flowNodes[0], {
      shapeId: 'shape_startEvent_id_0',
      bpmnElementId: 'event_id_0',
      bpmnElementName: 'signal start',
      bpmnElementKind: ShapeBpmnElementKind.EVENT_START,
      bounds: {
        x: 362,
        y: 232,
        width: 36,
        height: 45,
      },
    });
  });

  it('json containing one process with a signal start event with signal definition and another definition, signal start event is NOT present', () => {
    const json = `{
                "definitions" : {
                    "process": {
                        "startEvent": { "id":"event_id_0", "signalEventDefinition": ["", ""] }
                    },
                    "BPMNDiagram": {
                        "name":"process 0",
                        "BPMNPlane": {
                            "BPMNShape": {
                                "id":"shape_startEvent_id_0",
                                "bpmnElement":"event_id_0",
                                "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 }
                            }
                        }
                    }
                }
              }`;

    parseJsonAndExpectOnlyFlowNodes(json, 0);
  });

  it('json containing one process with a signal start event with several timer definitions, signal start event is NOT present', () => {
    const json = `{
    "definitions" : {
        "process": {
            "startEvent": { "id":"event_id_0", "signalEventDefinition": ["", ""] }
        },
        "BPMNDiagram": {
            "name":"process 0",
            "BPMNPlane": {
                "BPMNShape": {
                    "id":"shape_startEvent_id_0",
                    "bpmnElement":"event_id_0",
                    "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 }
                }
            }
        }
    }
}`;

    parseJsonAndExpectOnlyFlowNodes(json, 0);
  });
});
