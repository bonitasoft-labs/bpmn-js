import BpmnXmlParser from '../../../../src/component/parser/xml/BpmnXmlParser';
import { verifyBounds, verifyDefinitions, verifyIsNotEmptyArray, verifyProperties } from './XMLTestUtils';
import { expect } from 'chai';

describe('end event', () => {
  it('bpmn with single process with several end events, ensure end events are present', () => {
    const singleProcess = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bonitasoft.com/_RLk98HH_Eei9Z4IY4QeFuA">
  <process id="Process_1" isExecutable="false">  
    <endEvent id="Event_063qkx6" name="endEvent">
      <incoming>Flow_01iy2oj</bpmn:incoming>
    </endEvent>  
    <endEvent id="Event_993qkx6">
      <incoming>Flow_01iy2ok</bpmn:incoming>
    </endEvent>
  </process>
  <BPMNDiagram id="BpmnDiagram_1">
    <BPMNPlane id="BpmnPlane_1" bpmnElement="">
      <BPMNShape id="Event_063qkx6_di" bpmnElement="Event_063qkx6">
        <Bounds x="632" y="142" width="36" height="36" />
        <BPMNLabel>
          <Bounds x="626" y="185" width="48" height="14" />
        </BPMNLabel>
      </BPMNShape>
      <BPMNShape id="Event_993qkx6_di" bpmnElement="Event_993qkx6">
        <Bounds x="642" y="242" width="36" height="36" />
      </BPMNShape>
    </BPMNPlane>
  </BPMNDiagram>
</definitions>`;

    const json = new BpmnXmlParser().parse(singleProcess);
    console.log(JSON.stringify(json, undefined, 2));

    verifyDefinitions(json);

    // Model
    const process = json.definitions.process;
    verifyProperties(process, ['endEvent'], []);
    const endEvent = process.endEvent;
    verifyIsNotEmptyArray(endEvent, 'endEvent');
    verifyProperties(endEvent[0], ['id', 'incoming', 'name'], []);

    // BPMNDiagram
    const diagram = json.definitions.BPMNDiagram;
    verifyProperties(diagram, ['BPMNPlane'], []);
    const plane = diagram.BPMNPlane;
    verifyProperties(plane, ['BPMNShape'], []);
    const shapes = plane.BPMNShape;
    verifyIsNotEmptyArray(shapes, 'BPMNShape');
    verifyProperties(shapes[0], ['id', 'bpmnElement', 'Bounds', 'BPMNLabel'], []);
    verifyBounds(shapes[0], 632, 142, 36, 36);

    verifyProperties(shapes[1], ['id', 'bpmnElement', 'Bounds'], []);
    verifyBounds(shapes[1], 642, 242, 36, 36);
  });

  it('bpmn with multiple processes, ensure end events are present', () => {
    const processes = `<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI" xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="sid-38422fae-e03e-43a3-bef4-bd33b32041b2" targetNamespace="http://bonitasoft.com/_RLk98HH_Eei9Z4IY4QeFuA">
  <process id="Process_1" isExecutable="false">  
    <endEvent id="Event_063qkx6" name="endEvent">
      <incoming>Flow_01iy2oj</bpmn:incoming>
    </endEvent>  
    <endEvent id="Event_553qkx6">
      <incoming>Flow_55iy2ok</bpmn:incoming>
    </endEvent>
  </process>
  <process id="Process_2" isExecutable="false">  
    <endEvent id="Event_993qkx6">
      <incoming>Flow_01iy2ok</bpmn:incoming>
    </endEvent>
  </process>
  <BPMNDiagram id="BpmnDiagram_1">
    <BPMNPlane id="BpmnPlane_1" bpmnElement="">
      <BPMNShape id="Event_063qkx6_di" bpmnElement="Event_063qkx6">
        <Bounds x="632" y="142" width="36" height="36" />
        <BPMNLabel>
          <Bounds x="626" y="185" width="48" height="14" />
        </BPMNLabel>
      </BPMNShape>
      <BPMNShape id="Event_553qkx6_di" bpmnElement="Event_553qkx6">
        <Bounds x="642" y="242" width="36" height="36" />
      </BPMNShape>
      <BPMNShape id="Event_993qkx6_di" bpmnElement="Event_993qkx6">
        <Bounds x="642" y="242" width="36" height="36" />
      </BPMNShape>
    </BPMNPlane>
  </BPMNDiagram>
</definitions>`;

    const json = new BpmnXmlParser().parse(processes);

    verifyDefinitions(json);

    // Model
    const process = json.definitions.process;
    verifyIsNotEmptyArray(process, 'process');
    const process0 = process[0];
    expect(process0).to.have.property('endEvent');
    const endEvent = process0.endEvent;
    verifyIsNotEmptyArray(endEvent, 'endEvent');
    verifyProperties(endEvent[0], ['id', 'name', 'incoming'], []);

    const process1 = process[1];
    expect(process1).to.have.property('endEvent');
    verifyProperties(process1.endEvent, ['id', 'incoming'], []);
  });
});
