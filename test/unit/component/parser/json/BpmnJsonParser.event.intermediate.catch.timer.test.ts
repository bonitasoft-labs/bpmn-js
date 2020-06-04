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

describe('parse bpmn as json for timer intermediate catch event', () => {
  it('json containing one process with a timer intermediate catch event defined as empty string, timer intermediate catch event is present', () => {
    const json = `{
                "definitions" : {
                    "process": {
                        "intermediateCatchEvent": {
                            "id":"event_id_0",
                            "name":"event name",
                            "timerEventDefinition": ""
                        }
                    },
                    "BPMNDiagram": {
                        "name":"process 0",
                        "BPMNPlane": {
                            "BPMNShape": {
                                "id":"shape_intermediateCatchEvent_id_0",
                                "bpmnElement":"event_id_0",
                                "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 }
                            }
                        }
                    }
                }
            }`;

    const model = parseJsonAndExpectOnlyEvent(json, ShapeBpmnEventKind.TIMER, 1);

    verifyShape(
      model.flowNodes[0],
      {
        shapeId: 'shape_intermediateCatchEvent_id_0',
        bpmnElementId: 'event_id_0',
        bpmnElementName: 'event name',
        bpmnElementKind: ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH,
      },
      {
        x: 362,
        y: 232,
        width: 36,
        height: 45,
      },
    );
  });

  it('json containing one process with a timer intermediate catch event defined as object, timer intermediate catch event is present', () => {
    const json = `{
                "definitions" : {
                    "process": {
                        "intermediateCatchEvent": {
                            "id":"event_id_0",
                            "name":"event name",
                            "timerEventDefinition": { "id": "timerEventDefinition_1" }
                        }
                    },
                    "BPMNDiagram": {
                        "name":"process 0",
                        "BPMNPlane": {
                            "BPMNShape": {
                                "id":"shape_intermediateCatchEvent_id_0",
                                "bpmnElement":"event_id_0",
                                "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 }
                            }
                        }
                    }
                }
            }`;

    const model = parseJsonAndExpectOnlyEvent(json, ShapeBpmnEventKind.TIMER, 1);

    verifyShape(
      model.flowNodes[0],
      {
        shapeId: 'shape_intermediateCatchEvent_id_0',
        bpmnElementId: 'event_id_0',
        bpmnElementName: 'event name',
        bpmnElementKind: ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH,
      },
      {
        x: 362,
        y: 232,
        width: 36,
        height: 45,
      },
    );
  });

  it('json containing one process with a intermediate catch event with timer definition and another definition, timer event is NOT present', () => {
    const json = `{
    "definitions" : {
        "process": {
            "intermediateCatchEvent": { "id":"event_id_0", "timerEventDefinition": "", "messageEventDefinition": "" }
        },
        "BPMNDiagram": {
            "name":"process 0",
            "BPMNPlane": {
                "BPMNShape": {
                    "id":"shape_intermediateCatchEvent_id_0",
                    "bpmnElement":"event_id_0",
                    "Bounds": { "x": 362, "y": 232, "width": 36, "height": 45 }
                }
            }
        }
    }
}`;

    parseJsonAndExpectOnlyFlowNodes(json, 0);
  });

  it('json containing one process with a intermediate catch event with several timer definitions, timer event is NOT present', () => {
    const json = `{
    "definitions" : {
        "process": {
            "intermediateCatchEvent": { "id":"event_id_0", "timerEventDefinition": ["", ""] }
        },
        "BPMNDiagram": {
            "name":"process 0",
            "BPMNPlane": {
                "BPMNShape": {
                    "id":"shape_intermediateCatchEvent_id_0",
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
