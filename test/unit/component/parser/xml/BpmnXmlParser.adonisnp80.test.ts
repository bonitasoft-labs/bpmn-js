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
import BpmnXmlParser from '../../../../../src/component/parser/xml/BpmnXmlParser';
import {
  verifyBounds,
  verifyDefinitions,
  verifyDiagram,
  verifyEdges,
  verifyEndEvent,
  verifyExclusiveGateway,
  verifyIsNotEmptyArray,
  verifyPlane,
  verifyProperties,
  verifySequenceFlow,
  verifyShapes,
  verifyStartEvent,
  verifyTask,
} from './XMLTestUtils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyExtensionElements(json: any) {
  const process = json.definitions.process;

  verifyProperties(process.extensionElements, ['modelattributes']);
  verifyProperties(process.extensionElements.modelattributes, ['attribute', 'record']);
  verifyIsNotEmptyArray(process.extensionElements.modelattributes.attribute);
  verifyIsNotEmptyArray(process.extensionElements.modelattributes.record);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyEventExtensions(extensionElements: any): void {
  verifyProperties(extensionElements, ['instance']);
  verifyProperties(extensionElements.instance, ['attribute', 'record']);
  verifyIsNotEmptyArray(extensionElements.instance.attribute);
  verifyIsNotEmptyArray(extensionElements.instance.record);
}

describe('parse bpmn as xml for ADONIS NP 8.0', () => {
  it('bpmn with process with extension, ensure elements are present', () => {
    const a21Processe = `<?xml version="1.0" encoding="utf-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xmi="http://www.omg.org/XMI"
             xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:adonis="http://www.boc-group.com"
             xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:model="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             id="definition__49bb2d82-cd27-4d9f-a3b7-58edc4d60bce"
             typeLanguage="http://www.w3.org/2001/XMLSchema"
             xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd"
             targetNamespace="http://www.boc-group.com">
   <process id="process_49bb2d82-cd27-4d9f-a3b7-58edc4d60bce"
            name="A.2.1"
            isExecutable="false"
            isClosed="false"
            processType="None">
      <extensionElements>
         <adonis:modelattributes>
            <adonis:attribute name="A_COMPLIANCE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_MANAGEMENT_MATURITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MONITORING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COMPLEXITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CYCLE_TIME"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>None</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PREDICTABILITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COST_EFFICIENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="MFB_RWF_STATE"
                              type="ENUM"
                              notebook="1"
                              sourcelang="en"
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>Draft</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_POTENTIAL_MATURITY_ANALYSIS_AS_IS_AVERAGE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No assessment data available to calculate as-is average</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_RISK_MANAGEMENT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_QUALITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_BUSINSS_VALUE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_FROM_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="WIDTH"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>13920</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="GLOBAL_CHOREOGRAPHY_TASK"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_NEED_FOR_ACTION"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CUSTOMER_SATISFACTION"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="KEY_PROCESS"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v2">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_FREQUENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v5">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_RESUBMISSION_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_UNTIL_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="3">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE_ACCORDING_TO_ISO_9000"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_AUDITING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="HEIGHT"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>7095</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_IT_SUPPORT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="CREATION_DATE"
                              type="DOUBLE"
                              notebook="1"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>1569418046853</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="EXTERNAL_PROCESS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:record name="MFB_RWF_HISTORY"/>
            <adonis:record name="A_ATTACHMENT_LIST"/>
            <adonis:record name="CHANGE_HISTORY"/>
            <adonis:record name="PROCESS_INDICATORS"/>
            <adonis:record name="PROCESS_SUPPLIERS___REQUIREMENTS"/>
            <adonis:record name="TERMS_ABBREVIATIONS"/>
            <adonis:record name="PROCESS_CUSTOMERS___REQUIREMENTS"/>
            <adonis:record name="SUGGESTION_FOR_IMPROVEMENT"/>
         </adonis:modelattributes>
      </extensionElements>
      <task name="Task 1"
            id="_366dc452-0953-4d16-9a26-44b4f1e225a9"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_ab1dbc48-3851-440e-bee0-ef1af884a1a5</incoming>
         <outgoing>_fd0f19bf-1482-46d5-a145-69a9e712623d</outgoing>
      </task>
      <exclusiveGateway name="Gateway (Split Flow)"
                        id="_38393551-1a50-4c8c-81aa-d1d12608203c"
                        gatewayDirection="Diverging"
                        default="_c30e5b1d-616b-4f25-a54a-6459fddef716">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_GATEWAY"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v1">
                  <adonis:value>below</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_fd0f19bf-1482-46d5-a145-69a9e712623d</incoming>
         <outgoing>_107fb1c6-cf96-45a1-934e-e9a74f0ccb0c</outgoing>
         <outgoing>_69f7f09a-ba49-454e-9b47-f1dcad1d1442</outgoing>
         <outgoing>_c30e5b1d-616b-4f25-a54a-6459fddef716</outgoing>
      </exclusiveGateway>
      <startEvent name="Start Event" id="_56a03e72-acf0-4522-adeb-ad954c847612">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TIME_PERIOD"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>Per year</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_QUANTITY"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <outgoing>_ab1dbc48-3851-440e-bee0-ef1af884a1a5</outgoing>
      </startEvent>
      <task name="Task 2"
            id="_7e732565-39cb-41ea-952e-f65e7282c13d"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_c30e5b1d-616b-4f25-a54a-6459fddef716</incoming>
         <outgoing>_5233d669-0e33-4456-a6c4-d863cf59adae</outgoing>
         <outgoing>_eeddf2a4-a7f0-415b-b154-a98f64d411c2</outgoing>
      </task>
      <exclusiveGateway name="Gateway (Merge Flows)"
                        id="_ad8d77a9-09fa-437a-8549-a161ee7956e7"
                        gatewayDirection="Converging">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_GATEWAY"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v1">
                  <adonis:value>below</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_214a1bff-e526-492b-aed0-19497e999306</incoming>
         <incoming>_479c1a5b-945b-4914-aea8-315ece72d020</incoming>
         <outgoing>_91a75c3f-7a0d-44a4-a1ba-ba6064187a9f</outgoing>
      </exclusiveGateway>
      <task name="Task 3"
            id="_e0e47ec5-9218-4906-b373-d019be1b0fb1"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_434878e5-49bf-48e6-acb5-8dc4ff7fbb8f</incoming>
         <incoming>_5233d669-0e33-4456-a6c4-d863cf59adae</incoming>
         <incoming>_69f7f09a-ba49-454e-9b47-f1dcad1d1442</incoming>
         <outgoing>_214a1bff-e526-492b-aed0-19497e999306</outgoing>
      </task>
      <endEvent name="End Event" id="_e8302d6f-0ef9-4b95-9b23-96de2c175589">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TYPE_END"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_91a75c3f-7a0d-44a4-a1ba-ba6064187a9f</incoming>
         <incoming>_eeddf2a4-a7f0-415b-b154-a98f64d411c2</incoming>
      </endEvent>
      <task name="Task 4"
            id="_f9dd56a2-9951-40fd-b3a3-24ad6c69d38d"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_107fb1c6-cf96-45a1-934e-e9a74f0ccb0c</incoming>
         <outgoing>_434878e5-49bf-48e6-acb5-8dc4ff7fbb8f</outgoing>
         <outgoing>_479c1a5b-945b-4914-aea8-315ece72d020</outgoing>
      </task>
      <sequenceFlow sourceRef="_38393551-1a50-4c8c-81aa-d1d12608203c"
                    targetRef="_f9dd56a2-9951-40fd-b3a3-24ad6c69d38d"
                    id="_107fb1c6-cf96-45a1-934e-e9a74f0ccb0c">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_e0e47ec5-9218-4906-b373-d019be1b0fb1"
                    targetRef="_ad8d77a9-09fa-437a-8549-a161ee7956e7"
                    id="_214a1bff-e526-492b-aed0-19497e999306">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_f9dd56a2-9951-40fd-b3a3-24ad6c69d38d"
                    targetRef="_e0e47ec5-9218-4906-b373-d019be1b0fb1"
                    id="_434878e5-49bf-48e6-acb5-8dc4ff7fbb8f">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_f9dd56a2-9951-40fd-b3a3-24ad6c69d38d"
                    targetRef="_ad8d77a9-09fa-437a-8549-a161ee7956e7"
                    id="_479c1a5b-945b-4914-aea8-315ece72d020">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TRANSITION_CONDITION"
                                 type="LONGSTRING"
                                 notebook="1"
                                 sourcelang="en"
                                 novalue="0">
                  <adonis:value>condition</adonis:value>
                  <adonis:metavalue>\`0\`&lt;x&gt;\`12\`&lt;/x&gt;</adonis:metavalue>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
         <conditionExpression id="_479c1a5b-945b-4914-aea8-315ece72d020condExpr"
                              xsi:type="tFormalExpression"><![CDATA[condition]]></conditionExpression>
      </sequenceFlow>
      <sequenceFlow sourceRef="_7e732565-39cb-41ea-952e-f65e7282c13d"
                    targetRef="_e0e47ec5-9218-4906-b373-d019be1b0fb1"
                    id="_5233d669-0e33-4456-a6c4-d863cf59adae">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_38393551-1a50-4c8c-81aa-d1d12608203c"
                    targetRef="_e0e47ec5-9218-4906-b373-d019be1b0fb1"
                    id="_69f7f09a-ba49-454e-9b47-f1dcad1d1442">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_ad8d77a9-09fa-437a-8549-a161ee7956e7"
                    targetRef="_e8302d6f-0ef9-4b95-9b23-96de2c175589"
                    id="_91a75c3f-7a0d-44a4-a1ba-ba6064187a9f">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_56a03e72-acf0-4522-adeb-ad954c847612"
                    targetRef="_366dc452-0953-4d16-9a26-44b4f1e225a9"
                    id="_ab1dbc48-3851-440e-bee0-ef1af884a1a5">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_38393551-1a50-4c8c-81aa-d1d12608203c"
                    targetRef="_7e732565-39cb-41ea-952e-f65e7282c13d"
                    name="Default"
                    id="_c30e5b1d-616b-4f25-a54a-6459fddef716">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DENOMINATION"
                                 type="STRING"
                                 notebook="1"
                                 sourcelang="en"
                                 novalue="0">
                  <adonis:value>Default</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_7e732565-39cb-41ea-952e-f65e7282c13d"
                    targetRef="_e8302d6f-0ef9-4b95-9b23-96de2c175589"
                    id="_eeddf2a4-a7f0-415b-b154-a98f64d411c2">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TRANSITION_CONDITION"
                                 type="LONGSTRING"
                                 notebook="1"
                                 sourcelang="en"
                                 novalue="0">
                  <adonis:value>Condition</adonis:value>
                  <adonis:metavalue>\`0\`&lt;x&gt;\`12\`&lt;/x&gt;</adonis:metavalue>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
         <conditionExpression id="_eeddf2a4-a7f0-415b-b154-a98f64d411c2condExpr"
                              xsi:type="tFormalExpression"><![CDATA[Condition]]></conditionExpression>
      </sequenceFlow>
      <sequenceFlow sourceRef="_366dc452-0953-4d16-9a26-44b4f1e225a9"
                    targetRef="_38393551-1a50-4c8c-81aa-d1d12608203c"
                    id="_fd0f19bf-1482-46d5-a145-69a9e712623d">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
   </process>
   <bpmndi:BPMNDiagram name="A.2.1" id="Diagram_49bb2d82-cd27-4d9f-a3b7-58edc4d60bce">
      <bpmndi:BPMNPlane id="BPMNPlane_49bb2d82-cd27-4d9f-a3b7-58edc4d60bce"
                        bpmnElement="process_49bb2d82-cd27-4d9f-a3b7-58edc4d60bce">
         <bpmndi:BPMNShape bpmnElement="_366dc452-0953-4d16-9a26-44b4f1e225a9"
                           id="BPMN_Shape_366dc452-0953-4d16-9a26-44b4f1e225a9">
            <omgdc:Bounds height="76" width="151" x="171" y="189"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_38393551-1a50-4c8c-81aa-d1d12608203c"
                           isMarkerVisible="false"
                           id="BPMN_Shape_38393551-1a50-4c8c-81aa-d1d12608203c">
            <omgdc:Bounds width="56" height="56" x="370" y="199"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_56a03e72-acf0-4522-adeb-ad954c847612"
                           id="BPMN_Shape_56a03e72-acf0-4522-adeb-ad954c847612">
            <omgdc:Bounds width="56" height="56" x="67" y="199"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_7e732565-39cb-41ea-952e-f65e7282c13d"
                           id="BPMN_Shape_7e732565-39cb-41ea-952e-f65e7282c13d">
            <omgdc:Bounds height="76" width="151" x="474" y="38"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_e0e47ec5-9218-4906-b373-d019be1b0fb1"
                           id="BPMN_Shape_e0e47ec5-9218-4906-b373-d019be1b0fb1">
            <omgdc:Bounds height="76" width="151" x="474" y="189"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_e8302d6f-0ef9-4b95-9b23-96de2c175589"
                           id="BPMN_Shape_e8302d6f-0ef9-4b95-9b23-96de2c175589">
            <omgdc:Bounds width="56" height="56" x="843" y="161"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_f9dd56a2-9951-40fd-b3a3-24ad6c69d38d"
                           id="BPMN_Shape_f9dd56a2-9951-40fd-b3a3-24ad6c69d38d">
            <omgdc:Bounds height="76" width="151" x="474" y="360"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_ad8d77a9-09fa-437a-8549-a161ee7956e7"
                           isMarkerVisible="false"
                           id="BPMN_Shape_ad8d77a9-09fa-437a-8549-a161ee7956e7">
            <omgdc:Bounds width="56" height="56" x="710" y="275"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="BPMN_Edge_107fb1c6-cf96-45a1-934e-e9a74f0ccb0c"
                          bpmnElement="_107fb1c6-cf96-45a1-934e-e9a74f0ccb0c">
            <omgdi:waypoint x="398" y="292"/>
            <omgdi:waypoint x="398" y="398"/>
            <omgdi:waypoint x="469" y="398"/>
            <bpmndi:BPMNLabel>
               <omgdc:Bounds height="0" width="0" x="398" y="340"/>
            </bpmndi:BPMNLabel>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_214a1bff-e526-492b-aed0-19497e999306"
                          bpmnElement="_214a1bff-e526-492b-aed0-19497e999306">
            <omgdi:waypoint x="630" y="227"/>
            <omgdi:waypoint x="738" y="227"/>
            <omgdi:waypoint x="738" y="271"/>
            <bpmndi:BPMNLabel>
               <omgdc:Bounds height="0" width="0" x="681" y="227"/>
            </bpmndi:BPMNLabel>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_434878e5-49bf-48e6-acb5-8dc4ff7fbb8f"
                          bpmnElement="_434878e5-49bf-48e6-acb5-8dc4ff7fbb8f">
            <omgdi:waypoint x="549" y="355"/>
            <omgdi:waypoint x="549" y="270"/>
            <bpmndi:BPMNLabel>
               <omgdc:Bounds height="0" width="0" x="549" y="338"/>
            </bpmndi:BPMNLabel>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_479c1a5b-945b-4914-aea8-315ece72d020"
                          bpmnElement="_479c1a5b-945b-4914-aea8-315ece72d020">
            <omgdi:waypoint x="630" y="398"/>
            <omgdi:waypoint x="738" y="398"/>
            <omgdi:waypoint x="738" y="368"/>
            <bpmndi:BPMNLabel>
               <omgdc:Bounds height="0" width="0" x="668" y="398"/>
            </bpmndi:BPMNLabel>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_5233d669-0e33-4456-a6c4-d863cf59adae"
                          bpmnElement="_5233d669-0e33-4456-a6c4-d863cf59adae">
            <omgdi:waypoint x="549" y="119"/>
            <omgdi:waypoint x="549" y="184"/>
            <bpmndi:BPMNLabel>
               <omgdc:Bounds height="0" width="0" x="549" y="132"/>
            </bpmndi:BPMNLabel>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_69f7f09a-ba49-454e-9b47-f1dcad1d1442"
                          bpmnElement="_69f7f09a-ba49-454e-9b47-f1dcad1d1442">
            <omgdi:waypoint x="430" y="227"/>
            <omgdi:waypoint x="469" y="227"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_91a75c3f-7a0d-44a4-a1ba-ba6064187a9f"
                          bpmnElement="_91a75c3f-7a0d-44a4-a1ba-ba6064187a9f">
            <omgdi:waypoint x="770" y="303"/>
            <omgdi:waypoint x="871" y="303"/>
            <omgdi:waypoint x="871" y="241"/>
            <bpmndi:BPMNLabel>
               <omgdc:Bounds height="0" width="0" x="790" y="303"/>
            </bpmndi:BPMNLabel>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_ab1dbc48-3851-440e-bee0-ef1af884a1a5"
                          bpmnElement="_ab1dbc48-3851-440e-bee0-ef1af884a1a5">
            <omgdi:waypoint x="127" y="227"/>
            <omgdi:waypoint x="166" y="227"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_c30e5b1d-616b-4f25-a54a-6459fddef716"
                          bpmnElement="_c30e5b1d-616b-4f25-a54a-6459fddef716">
            <omgdi:waypoint x="398" y="195"/>
            <omgdi:waypoint x="398" y="76"/>
            <omgdi:waypoint x="469" y="76"/>
            <bpmndi:BPMNLabel>
               <omgdc:Bounds height="0" width="0" x="433" y="76"/>
            </bpmndi:BPMNLabel>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_eeddf2a4-a7f0-415b-b154-a98f64d411c2"
                          bpmnElement="_eeddf2a4-a7f0-415b-b154-a98f64d411c2">
            <omgdi:waypoint x="630" y="76"/>
            <omgdi:waypoint x="871" y="76"/>
            <omgdi:waypoint x="871" y="159"/>
            <bpmndi:BPMNLabel>
               <omgdc:Bounds height="0" width="0" x="662" y="76"/>
            </bpmndi:BPMNLabel>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_fd0f19bf-1482-46d5-a145-69a9e712623d"
                          bpmnElement="_fd0f19bf-1482-46d5-a145-69a9e712623d">
            <omgdi:waypoint x="327" y="227"/>
            <omgdi:waypoint x="366" y="227"/>
         </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
   </bpmndi:BPMNDiagram>
</definitions>
`;

    const json = new BpmnXmlParser().parse(a21Processe);

    verifyDefinitions(json);

    // Model
    const process = json.definitions.process;
    verifyProperties(
      process,
      ['id', 'name', 'isExecutable', 'processType', 'extensionElements', 'startEvent', 'task', 'endEvent', 'exclusiveGateway', 'sequenceFlow'],
      ['parallelGateway'],
    );

    verifyExtensionElements(json);
    verifyStartEvent(json, '_ab1dbc48-3851-440e-bee0-ef1af884a1a5', verifyEventExtensions);
    verifyTask(json, 4);
    verifyEndEvent(json, ['_91a75c3f-7a0d-44a4-a1ba-ba6064187a9f', '_eeddf2a4-a7f0-415b-b154-a98f64d411c2'], verifyEventExtensions);
    verifyExclusiveGateway(json, 2);
    verifySequenceFlow(json, 11);

    // Diagram
    verifyDiagram(json, false);
    verifyPlane(json);
    verifyShapes(json, 8, false);
    verifyEdges(json, 11, 0, false);
  });

  it('bpmn with number attribute, ensure xml number are json number', () => {
    const a10Process = `<?xml version="1.0" encoding="utf-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xmi="http://www.omg.org/XMI"
             xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:adonis="http://www.boc-group.com"
             xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:model="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             id="definition__5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
             typeLanguage="http://www.w3.org/2001/XMLSchema"
             xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd"
             targetNamespace="http://www.boc-group.com">
   <process id="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
            name="A.1.0"
            isExecutable="false"
            isClosed="false"
            processType="None">
      <extensionElements>
         <adonis:modelattributes>
            <adonis:attribute name="A_COMPLIANCE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_MANAGEMENT_MATURITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MONITORING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COMPLEXITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CYCLE_TIME"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>None</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PREDICTABILITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COST_EFFICIENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="MFB_RWF_STATE"
                              type="ENUM"
                              notebook="1"
                              sourcelang="en"
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>Draft</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_POTENTIAL_MATURITY_ANALYSIS_AS_IS_AVERAGE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No assessment data available to calculate as-is average</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_RISK_MANAGEMENT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_QUALITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_BUSINSS_VALUE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_FROM_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="WIDTH"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>13065</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="GLOBAL_CHOREOGRAPHY_TASK"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_NEED_FOR_ACTION"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CUSTOMER_SATISFACTION"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="KEY_PROCESS"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v2">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_FREQUENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v5">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_RESUBMISSION_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_UNTIL_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="3">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE_ACCORDING_TO_ISO_9000"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_AUDITING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="HEIGHT"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>2835</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_IT_SUPPORT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="CREATION_DATE"
                              type="DOUBLE"
                              notebook="1"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>1569417613169</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="EXTERNAL_PROCESS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:record name="MFB_RWF_HISTORY"/>
            <adonis:record name="A_ATTACHMENT_LIST"/>
            <adonis:record name="CHANGE_HISTORY"/>
            <adonis:record name="PROCESS_INDICATORS"/>
            <adonis:record name="PROCESS_SUPPLIERS___REQUIREMENTS"/>
            <adonis:record name="TERMS_ABBREVIATIONS"/>
            <adonis:record name="PROCESS_CUSTOMERS___REQUIREMENTS"/>
            <adonis:record name="SUGGESTION_FOR_IMPROVEMENT"/>
         </adonis:modelattributes>
      </extensionElements>
      <endEvent name="End Event" id="_1adc99e5-a00d-4db0-8822-1633f0a450db">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TYPE_END"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_021f3e36-eeca-485f-af99-5d6be12defe3</incoming>
      </endEvent>
      <task name="Task 1"
            id="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_ff255561-ec77-481b-b5c2-b1aff622c8b9</incoming>
         <outgoing>_04d0b188-e478-401e-8590-b28de386fbce</outgoing>
      </task>
      <task name="Task 2"
            id="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_04d0b188-e478-401e-8590-b28de386fbce</incoming>
         <outgoing>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</outgoing>
      </task>
      <startEvent name="Start Event" id="_cb8714ef-9a07-4569-96f7-127d84245606">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TIME_PERIOD"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>Per year</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_QUANTITY"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <outgoing>_ff255561-ec77-481b-b5c2-b1aff622c8b9</outgoing>
      </startEvent>
      <task name="Task 3"
            id="_d4afe0b5-098e-4633-879d-1741531969d1"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</incoming>
         <outgoing>_021f3e36-eeca-485f-af99-5d6be12defe3</outgoing>
      </task>
      <sequenceFlow sourceRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    targetRef="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                    id="_021f3e36-eeca-485f-af99-5d6be12defe3">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    targetRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    id="_04d0b188-e478-401e-8590-b28de386fbce">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    targetRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    id="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_cb8714ef-9a07-4569-96f7-127d84245606"
                    targetRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    id="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
   </process>
   <bpmndi:BPMNDiagram name="A.1.0" id="Diagram_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
      <bpmndi:BPMNPlane id="BPMNPlane_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
                        bpmnElement="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
         <bpmndi:BPMNShape bpmnElement="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                           id="BPMN_Shape_1adc99e5-a00d-4db0-8822-1633f0a450db">
            <omgdc:Bounds width="56" height="56" x="786" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                           id="BPMN_Shape_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb">
            <omgdc:Bounds height="76" width="151" x="171" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                           id="BPMN_Shape_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b">
            <omgdc:Bounds height="76" width="151" x="379" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_cb8714ef-9a07-4569-96f7-127d84245606"
                           id="BPMN_Shape_cb8714ef-9a07-4569-96f7-127d84245606">
            <omgdc:Bounds width="56" height="56" x="67" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_d4afe0b5-098e-4633-879d-1741531969d1"
                           id="BPMN_Shape_d4afe0b5-098e-4633-879d-1741531969d1">
            <omgdc:Bounds height="76" width="151" x="587" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="BPMN_Edge_021f3e36-eeca-485f-af99-5d6be12defe3"
                          bpmnElement="_021f3e36-eeca-485f-af99-5d6be12defe3">
            <omgdi:waypoint x="743" y="96"/>
            <omgdi:waypoint x="784" y="96"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_04d0b188-e478-401e-8590-b28de386fbce"
                          bpmnElement="_04d0b188-e478-401e-8590-b28de386fbce">
            <omgdi:waypoint x="327" y="95"/>
            <omgdi:waypoint x="374" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_f69e0dff-5367-4542-ab08-c79c6fa6b7e5"
                          bpmnElement="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
            <omgdi:waypoint x="535" y="95"/>
            <omgdi:waypoint x="582" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_ff255561-ec77-481b-b5c2-b1aff622c8b9"
                          bpmnElement="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
            <omgdi:waypoint x="127" y="95"/>
            <omgdi:waypoint x="166" y="95"/>
         </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
   </bpmndi:BPMNDiagram>
</definitions>
`;

    const json = new BpmnXmlParser().parse(a10Process);

    verifyDefinitions(json);

    // BPMNDiagram
    const diagram = verifyDiagram(json, false);
    verifyPlane(json);

    const shape = diagram.BPMNPlane.BPMNShape[0];
    verifyProperties(shape, ['id', 'bpmnElement', 'Bounds']);
    verifyBounds(shape, 786, 67, 56, 56);
  });

  it('bpmn with boolean attribute, ensure xml boolean are json boolean', () => {
    const a10Process = `<?xml version="1.0" encoding="utf-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xmi="http://www.omg.org/XMI"
             xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:adonis="http://www.boc-group.com"
             xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:model="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             id="definition__5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
             typeLanguage="http://www.w3.org/2001/XMLSchema"
             xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd"
             targetNamespace="http://www.boc-group.com">
   <process id="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
            name="A.1.0"
            isExecutable="false"
            isClosed="false"
            processType="None">
      <extensionElements>
         <adonis:modelattributes>
            <adonis:attribute name="A_COMPLIANCE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_MANAGEMENT_MATURITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MONITORING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COMPLEXITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CYCLE_TIME"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>None</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PREDICTABILITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COST_EFFICIENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="MFB_RWF_STATE"
                              type="ENUM"
                              notebook="1"
                              sourcelang="en"
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>Draft</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_POTENTIAL_MATURITY_ANALYSIS_AS_IS_AVERAGE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No assessment data available to calculate as-is average</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_RISK_MANAGEMENT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_QUALITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_BUSINSS_VALUE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_FROM_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="WIDTH"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>13065</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="GLOBAL_CHOREOGRAPHY_TASK"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_NEED_FOR_ACTION"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CUSTOMER_SATISFACTION"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="KEY_PROCESS"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v2">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_FREQUENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v5">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_RESUBMISSION_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_UNTIL_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="3">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE_ACCORDING_TO_ISO_9000"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_AUDITING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="HEIGHT"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>2835</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_IT_SUPPORT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="CREATION_DATE"
                              type="DOUBLE"
                              notebook="1"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>1569417613169</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="EXTERNAL_PROCESS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:record name="MFB_RWF_HISTORY"/>
            <adonis:record name="A_ATTACHMENT_LIST"/>
            <adonis:record name="CHANGE_HISTORY"/>
            <adonis:record name="PROCESS_INDICATORS"/>
            <adonis:record name="PROCESS_SUPPLIERS___REQUIREMENTS"/>
            <adonis:record name="TERMS_ABBREVIATIONS"/>
            <adonis:record name="PROCESS_CUSTOMERS___REQUIREMENTS"/>
            <adonis:record name="SUGGESTION_FOR_IMPROVEMENT"/>
         </adonis:modelattributes>
      </extensionElements>
      <endEvent name="End Event" id="_1adc99e5-a00d-4db0-8822-1633f0a450db">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TYPE_END"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_021f3e36-eeca-485f-af99-5d6be12defe3</incoming>
      </endEvent>
      <task name="Task 1"
            id="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_ff255561-ec77-481b-b5c2-b1aff622c8b9</incoming>
         <outgoing>_04d0b188-e478-401e-8590-b28de386fbce</outgoing>
      </task>
      <task name="Task 2"
            id="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_04d0b188-e478-401e-8590-b28de386fbce</incoming>
         <outgoing>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</outgoing>
      </task>
      <startEvent name="Start Event" id="_cb8714ef-9a07-4569-96f7-127d84245606">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TIME_PERIOD"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>Per year</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_QUANTITY"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <outgoing>_ff255561-ec77-481b-b5c2-b1aff622c8b9</outgoing>
      </startEvent>
      <task name="Task 3"
            id="_d4afe0b5-098e-4633-879d-1741531969d1"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</incoming>
         <outgoing>_021f3e36-eeca-485f-af99-5d6be12defe3</outgoing>
      </task>
      <sequenceFlow sourceRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    targetRef="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                    id="_021f3e36-eeca-485f-af99-5d6be12defe3">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    targetRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    id="_04d0b188-e478-401e-8590-b28de386fbce">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    targetRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    id="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_cb8714ef-9a07-4569-96f7-127d84245606"
                    targetRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    id="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
   </process>
   <bpmndi:BPMNDiagram name="A.1.0" id="Diagram_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
      <bpmndi:BPMNPlane id="BPMNPlane_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
                        bpmnElement="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
         <bpmndi:BPMNShape bpmnElement="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                           id="BPMN_Shape_1adc99e5-a00d-4db0-8822-1633f0a450db">
            <omgdc:Bounds width="56" height="56" x="786" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                           id="BPMN_Shape_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb">
            <omgdc:Bounds height="76" width="151" x="171" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                           id="BPMN_Shape_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b">
            <omgdc:Bounds height="76" width="151" x="379" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_cb8714ef-9a07-4569-96f7-127d84245606"
                           id="BPMN_Shape_cb8714ef-9a07-4569-96f7-127d84245606">
            <omgdc:Bounds width="56" height="56" x="67" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_d4afe0b5-098e-4633-879d-1741531969d1"
                           id="BPMN_Shape_d4afe0b5-098e-4633-879d-1741531969d1">
            <omgdc:Bounds height="76" width="151" x="587" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="BPMN_Edge_021f3e36-eeca-485f-af99-5d6be12defe3"
                          bpmnElement="_021f3e36-eeca-485f-af99-5d6be12defe3">
            <omgdi:waypoint x="743" y="96"/>
            <omgdi:waypoint x="784" y="96"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_04d0b188-e478-401e-8590-b28de386fbce"
                          bpmnElement="_04d0b188-e478-401e-8590-b28de386fbce">
            <omgdi:waypoint x="327" y="95"/>
            <omgdi:waypoint x="374" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_f69e0dff-5367-4542-ab08-c79c6fa6b7e5"
                          bpmnElement="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
            <omgdi:waypoint x="535" y="95"/>
            <omgdi:waypoint x="582" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_ff255561-ec77-481b-b5c2-b1aff622c8b9"
                          bpmnElement="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
            <omgdi:waypoint x="127" y="95"/>
            <omgdi:waypoint x="166" y="95"/>
         </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
   </bpmndi:BPMNDiagram>
</definitions>
`;

    const json = new BpmnXmlParser().parse(a10Process);

    verifyDefinitions(json);

    // Process
    const process = json.definitions.process;
    verifyProperties(process, ['id', 'isExecutable', 'startEvent', 'task', 'endEvent', 'sequenceFlow']);
    expect(process.isExecutable).toBeFalsy();
    expect(process.task[0].isForCompensation).toBeFalsy();
  });

  it('bpmn with attribute with french special characters, ensure special characters are present', () => {
    const a10Process = `<?xml version="1.0" encoding="utf-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xmi="http://www.omg.org/XMI"
             xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:adonis="http://www.boc-group.com"
             xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:model="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             id="definition__5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
             typeLanguage="http://www.w3.org/2001/XMLSchema"
             xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd"
             targetNamespace="http://www.boc-group.com">
   <process id="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
            name="A.1.0"
            isExecutable="false"
            isClosed="false"
            processType="None">
      <extensionElements>
         <adonis:modelattributes>
            <adonis:attribute name="A_COMPLIANCE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_MANAGEMENT_MATURITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MONITORING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COMPLEXITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CYCLE_TIME"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>None</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PREDICTABILITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COST_EFFICIENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="MFB_RWF_STATE"
                              type="ENUM"
                              notebook="1"
                              sourcelang="en"
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>Draft</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_POTENTIAL_MATURITY_ANALYSIS_AS_IS_AVERAGE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No assessment data available to calculate as-is average</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_RISK_MANAGEMENT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_QUALITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_BUSINSS_VALUE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_FROM_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="WIDTH"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>13065</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="GLOBAL_CHOREOGRAPHY_TASK"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_NEED_FOR_ACTION"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CUSTOMER_SATISFACTION"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="KEY_PROCESS"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v2">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_FREQUENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v5">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_RESUBMISSION_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_UNTIL_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="3">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE_ACCORDING_TO_ISO_9000"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_AUDITING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="HEIGHT"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>2835</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_IT_SUPPORT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="CREATION_DATE"
                              type="DOUBLE"
                              notebook="1"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>1569417613169</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="EXTERNAL_PROCESS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:record name="MFB_RWF_HISTORY"/>
            <adonis:record name="A_ATTACHMENT_LIST"/>
            <adonis:record name="CHANGE_HISTORY"/>
            <adonis:record name="PROCESS_INDICATORS"/>
            <adonis:record name="PROCESS_SUPPLIERS___REQUIREMENTS"/>
            <adonis:record name="TERMS_ABBREVIATIONS"/>
            <adonis:record name="PROCESS_CUSTOMERS___REQUIREMENTS"/>
            <adonis:record name="SUGGESTION_FOR_IMPROVEMENT"/>
         </adonis:modelattributes>
      </extensionElements>
      <endEvent name="End Event" id="_1adc99e5-a00d-4db0-8822-1633f0a450db">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TYPE_END"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_021f3e36-eeca-485f-af99-5d6be12defe3</incoming>
      </endEvent>
      <task name="Task 1"
            id="à_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_ff255561-ec77-481b-b5c2-b1aff622c8b9</incoming>
         <outgoing>_04d0b188-e478-401e-8590-b28de386fbce</outgoing>
      </task>
      <task name="Task 2"
            id="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_04d0b188-e478-401e-8590-b28de386fbce</incoming>
         <outgoing>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</outgoing>
      </task>
      <startEvent name="événement de début" id="_cb8714ef-9a07-4569-96f7-127d84245606">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TIME_PERIOD"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>Per year</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_QUANTITY"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <outgoing>_ff255561-ec77-481b-b5c2-b1aff622c8b9</outgoing>
      </startEvent>
      <task name="Task 3"
            id="_d4afe0b5-098e-4633-879d-1741531969d1"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</incoming>
         <outgoing>_021f3e36-eeca-485f-af99-5d6be12defe3</outgoing>
      </task>
      <sequenceFlow sourceRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    targetRef="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                    id="_021f3e36-eeca-485f-af99-5d6be12defe3">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    targetRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    id="_04d0b188-e478-401e-8590-b28de386fbce">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    targetRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    id="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_cb8714ef-9a07-4569-96f7-127d84245606"
                    targetRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    id="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
   </process>
   <bpmndi:BPMNDiagram name="A.1.0" id="Diagram_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
      <bpmndi:BPMNPlane id="BPMNPlane_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
                        bpmnElement="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
         <bpmndi:BPMNShape bpmnElement="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                           id="BPMN_Shape_1adc99e5-a00d-4db0-8822-1633f0a450db">
            <omgdc:Bounds width="56" height="56" x="786" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                           id="BPMN_Shape_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb">
            <omgdc:Bounds height="76" width="151" x="171" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                           id="BPMN_Shape_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b">
            <omgdc:Bounds height="76" width="151" x="379" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_cb8714ef-9a07-4569-96f7-127d84245606"
                           id="BPMN_Shape_cb8714ef-9a07-4569-96f7-127d84245606">
            <omgdc:Bounds width="56" height="56" x="67" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_d4afe0b5-098e-4633-879d-1741531969d1"
                           id="BPMN_Shape_d4afe0b5-098e-4633-879d-1741531969d1">
            <omgdc:Bounds height="76" width="151" x="587" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="BPMN_Edge_021f3e36-eeca-485f-af99-5d6be12defe3"
                          bpmnElement="_021f3e36-eeca-485f-af99-5d6be12defe3">
            <omgdi:waypoint x="743" y="96"/>
            <omgdi:waypoint x="784" y="96"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_04d0b188-e478-401e-8590-b28de386fbce"
                          bpmnElement="_04d0b188-e478-401e-8590-b28de386fbce">
            <omgdi:waypoint x="327" y="95"/>
            <omgdi:waypoint x="374" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_f69e0dff-5367-4542-ab08-c79c6fa6b7e5"
                          bpmnElement="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
            <omgdi:waypoint x="535" y="95"/>
            <omgdi:waypoint x="582" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_ff255561-ec77-481b-b5c2-b1aff622c8b9"
                          bpmnElement="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
            <omgdi:waypoint x="127" y="95"/>
            <omgdi:waypoint x="166" y="95"/>
         </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
   </bpmndi:BPMNDiagram>
</definitions>
`;

    const json = new BpmnXmlParser().parse(a10Process);

    verifyDefinitions(json);

    // Process
    const process = json.definitions.process;
    verifyProperties(process, ['id', 'isExecutable', 'startEvent', 'task', 'endEvent', 'sequenceFlow']);
    expect(process.startEvent.name).toEqual('événement de début');
    expect(process.task[0].id).toEqual('à_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb');
  });

  it('bpmn with attribute with japan special characters, ensure special characters are present', () => {
    const a10Process = `<?xml version="1.0" encoding="utf-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xmi="http://www.omg.org/XMI"
             xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:adonis="http://www.boc-group.com"
             xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:model="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             id="definition__5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
             typeLanguage="http://www.w3.org/2001/XMLSchema"
             xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd"
             targetNamespace="http://www.boc-group.com">
   <process id="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
            name="A.1.0"
            isExecutable="false"
            isClosed="false"
            processType="None">
      <extensionElements>
         <adonis:modelattributes>
            <adonis:attribute name="A_COMPLIANCE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_MANAGEMENT_MATURITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MONITORING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COMPLEXITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CYCLE_TIME"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>None</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PREDICTABILITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COST_EFFICIENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="MFB_RWF_STATE"
                              type="ENUM"
                              notebook="1"
                              sourcelang="en"
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>Draft</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_POTENTIAL_MATURITY_ANALYSIS_AS_IS_AVERAGE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No assessment data available to calculate as-is average</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_RISK_MANAGEMENT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_QUALITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_BUSINSS_VALUE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_FROM_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="WIDTH"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>13065</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="GLOBAL_CHOREOGRAPHY_TASK"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_NEED_FOR_ACTION"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CUSTOMER_SATISFACTION"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="KEY_PROCESS"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v2">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_FREQUENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v5">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_RESUBMISSION_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_UNTIL_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="3">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE_ACCORDING_TO_ISO_9000"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_AUDITING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="HEIGHT"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>2835</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_IT_SUPPORT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="CREATION_DATE"
                              type="DOUBLE"
                              notebook="1"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>1569417613169</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="EXTERNAL_PROCESS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:record name="MFB_RWF_HISTORY"/>
            <adonis:record name="A_ATTACHMENT_LIST"/>
            <adonis:record name="CHANGE_HISTORY"/>
            <adonis:record name="PROCESS_INDICATORS"/>
            <adonis:record name="PROCESS_SUPPLIERS___REQUIREMENTS"/>
            <adonis:record name="TERMS_ABBREVIATIONS"/>
            <adonis:record name="PROCESS_CUSTOMERS___REQUIREMENTS"/>
            <adonis:record name="SUGGESTION_FOR_IMPROVEMENT"/>
         </adonis:modelattributes>
      </extensionElements>
      <endEvent name="End Event" id="_1adc99e5-a00d-4db0-8822-1633f0a450db">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TYPE_END"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_021f3e36-eeca-485f-af99-5d6be12defe3</incoming>
      </endEvent>
      <task name="Task 1"
            id="識別子_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_ff255561-ec77-481b-b5c2-b1aff622c8b9</incoming>
         <outgoing>_04d0b188-e478-401e-8590-b28de386fbce</outgoing>
      </task>
      <task name="Task 2"
            id="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_04d0b188-e478-401e-8590-b28de386fbce</incoming>
         <outgoing>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</outgoing>
      </task>
      <startEvent name="開始イベント" id="_cb8714ef-9a07-4569-96f7-127d84245606">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TIME_PERIOD"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>Per year</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_QUANTITY"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <outgoing>_ff255561-ec77-481b-b5c2-b1aff622c8b9</outgoing>
      </startEvent>
      <task name="Task 3"
            id="_d4afe0b5-098e-4633-879d-1741531969d1"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</incoming>
         <outgoing>_021f3e36-eeca-485f-af99-5d6be12defe3</outgoing>
      </task>
      <sequenceFlow sourceRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    targetRef="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                    id="_021f3e36-eeca-485f-af99-5d6be12defe3">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    targetRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    id="_04d0b188-e478-401e-8590-b28de386fbce">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    targetRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    id="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_cb8714ef-9a07-4569-96f7-127d84245606"
                    targetRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    id="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
   </process>
   <bpmndi:BPMNDiagram name="A.1.0" id="Diagram_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
      <bpmndi:BPMNPlane id="BPMNPlane_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
                        bpmnElement="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
         <bpmndi:BPMNShape bpmnElement="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                           id="BPMN_Shape_1adc99e5-a00d-4db0-8822-1633f0a450db">
            <omgdc:Bounds width="56" height="56" x="786" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                           id="BPMN_Shape_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb">
            <omgdc:Bounds height="76" width="151" x="171" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                           id="BPMN_Shape_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b">
            <omgdc:Bounds height="76" width="151" x="379" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_cb8714ef-9a07-4569-96f7-127d84245606"
                           id="BPMN_Shape_cb8714ef-9a07-4569-96f7-127d84245606">
            <omgdc:Bounds width="56" height="56" x="67" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_d4afe0b5-098e-4633-879d-1741531969d1"
                           id="BPMN_Shape_d4afe0b5-098e-4633-879d-1741531969d1">
            <omgdc:Bounds height="76" width="151" x="587" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="BPMN_Edge_021f3e36-eeca-485f-af99-5d6be12defe3"
                          bpmnElement="_021f3e36-eeca-485f-af99-5d6be12defe3">
            <omgdi:waypoint x="743" y="96"/>
            <omgdi:waypoint x="784" y="96"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_04d0b188-e478-401e-8590-b28de386fbce"
                          bpmnElement="_04d0b188-e478-401e-8590-b28de386fbce">
            <omgdi:waypoint x="327" y="95"/>
            <omgdi:waypoint x="374" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_f69e0dff-5367-4542-ab08-c79c6fa6b7e5"
                          bpmnElement="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
            <omgdi:waypoint x="535" y="95"/>
            <omgdi:waypoint x="582" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_ff255561-ec77-481b-b5c2-b1aff622c8b9"
                          bpmnElement="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
            <omgdi:waypoint x="127" y="95"/>
            <omgdi:waypoint x="166" y="95"/>
         </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
   </bpmndi:BPMNDiagram>
</definitions>
`;

    const json = new BpmnXmlParser().parse(a10Process);

    verifyDefinitions(json);

    // Process
    const process = json.definitions.process;
    verifyProperties(process, ['id', 'isExecutable', 'startEvent', 'task', 'endEvent', 'sequenceFlow']);
    expect(process.startEvent.name).toEqual('開始イベント');
    expect(process.task[0].id).toEqual('識別子_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb');
  });

  it('bpmn with attribute with html special characters, ensure special characters are present', () => {
    const a10Process = `<?xml version="1.0" encoding="utf-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
             xmlns:omgdc="http://www.omg.org/spec/DD/20100524/DC"
             xmlns:omgdi="http://www.omg.org/spec/DD/20100524/DI"
             xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xmi="http://www.omg.org/XMI"
             xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:adonis="http://www.boc-group.com"
             xmlns:semantic="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema"
             xmlns:model="http://www.omg.org/spec/BPMN/20100524/MODEL"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             id="definition__5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
             typeLanguage="http://www.w3.org/2001/XMLSchema"
             xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL http://www.omg.org/spec/BPMN/2.0/20100501/BPMN20.xsd"
             targetNamespace="http://www.boc-group.com">
   <process id="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
            name="A.1.0"
            isExecutable="false"
            isClosed="false"
            processType="None">
      <extensionElements>
         <adonis:modelattributes>
            <adonis:attribute name="A_COMPLIANCE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_MANAGEMENT_MATURITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MONITORING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COMPLEXITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CYCLE_TIME"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>None</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PREDICTABILITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_COST_EFFICIENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="MFB_RWF_STATE"
                              type="ENUM"
                              notebook="1"
                              sourcelang="en"
                              novalue="0"
                              lang-independent="v0">
               <adonis:value>Draft</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_POTENTIAL_MATURITY_ANALYSIS_AS_IS_AVERAGE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No assessment data available to calculate as-is average</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_RISK_MANAGEMENT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_QUALITY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_BUSINSS_VALUE"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v3">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_FROM_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="WIDTH"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>13065</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="GLOBAL_CHOREOGRAPHY_TASK"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_NEED_FOR_ACTION"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_CUSTOMER_SATISFACTION"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="KEY_PROCESS"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v2">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_PROCESS_FREQUENCY"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v5">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_RESUBMISSION_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="1">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_MFB_RWF_VALID_UNTIL_DATE"
                              type="UTC"
                              notebook="1"
                              sourcelang=""
                              novalue="3">
               <adonis:value>0</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="PROCESS_TYPE_ACCORDING_TO_ISO_9000"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_AUDITING_NCS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="HEIGHT"
                              type="INTEGER"
                              notebook="0"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>2835</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="A_IT_SUPPORT"
                              type="ENUM"
                              notebook="1"
                              sourcelang=""
                              novalue="0"
                              lang-independent="v4">
               <adonis:value>No entry</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="CREATION_DATE"
                              type="DOUBLE"
                              notebook="1"
                              sourcelang="en"
                              novalue="0">
               <adonis:value>1569417613169</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:attribute name="EXTERNAL_PROCESS"
                              type="BOOL"
                              notebook="1"
                              sourcelang=""
                              novalue="0">
               <adonis:value>false</adonis:value>
               <adonis:metavalue/>
            </adonis:attribute>
            <adonis:record name="MFB_RWF_HISTORY"/>
            <adonis:record name="A_ATTACHMENT_LIST"/>
            <adonis:record name="CHANGE_HISTORY"/>
            <adonis:record name="PROCESS_INDICATORS"/>
            <adonis:record name="PROCESS_SUPPLIERS___REQUIREMENTS"/>
            <adonis:record name="TERMS_ABBREVIATIONS"/>
            <adonis:record name="PROCESS_CUSTOMERS___REQUIREMENTS"/>
            <adonis:record name="SUGGESTION_FOR_IMPROVEMENT"/>
         </adonis:modelattributes>
      </extensionElements>
      <endEvent name="End Event" id="_1adc99e5-a00d-4db0-8822-1633f0a450db">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TYPE_END"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_021f3e36-eeca-485f-af99-5d6be12defe3</incoming>
      </endEvent>
      <task name="Task 1"
            id="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb &#9824;"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_ff255561-ec77-481b-b5c2-b1aff622c8b9</incoming>
         <outgoing>_04d0b188-e478-401e-8590-b28de386fbce</outgoing>
      </task>
      <task name="Task 2"
            id="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_04d0b188-e478-401e-8590-b28de386fbce</incoming>
         <outgoing>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</outgoing>
      </task>
      <startEvent name="Start Event &#10;(Main) with &unknown; entity" id="_cb8714ef-9a07-4569-96f7-127d84245606">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="TIME_PERIOD"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>Per year</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_QUANTITY"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_NAME"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <outgoing>_ff255561-ec77-481b-b5c2-b1aff622c8b9</outgoing>
      </startEvent>
      <task name="Task 3"
            id="_d4afe0b5-098e-4633-879d-1741531969d1"
            isForCompensation="false">
         <extensionElements>
            <adonis:instance>
               <adonis:attribute name="IDENTIFICATION_OF_CHANGES"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>No change</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_EXECUTION_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_RESTING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_WAITING_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOLS_IF_RISKS_OR_CONTROLS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_COOPERATIONPARTICIPATION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_SYMBOL_IF_DESCRIPTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_INPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="VISUALISE_REFERENCED_IT_SYSTEM_ELEMENTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_TRANSPORT_TIME"
                                 type="UTC"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_NAME_TASK"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>inside</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="A_NEED_FOR_ACTION_CS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_RESPONSIBLE_FOR_EXECUTION"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>true</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COLLECTION_DATATYPE_OUTPUT"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="0"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="OBJECT_TYPE"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>No entry</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="COSTS"
                                 type="DOUBLE"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_ACCOUNTABLE_FOR_APPROVING_RESULTS"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="DISPLAY_TO_INFORM"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="A_ATTACHMENT_LIST_CS"/>
               <adonis:record name="A_BEHAVIOUR_DEFINITION"/>
               <adonis:record name="OPEN_QUESTIONS"/>
            </adonis:instance>
         </extensionElements>
         <incoming>_f69e0dff-5367-4542-ab08-c79c6fa6b7e5</incoming>
         <outgoing>_021f3e36-eeca-485f-af99-5d6be12defe3</outgoing>
      </task>
      <sequenceFlow sourceRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    targetRef="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                    id="_021f3e36-eeca-485f-af99-5d6be12defe3">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    targetRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    id="_04d0b188-e478-401e-8590-b28de386fbce">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                    targetRef="_d4afe0b5-098e-4633-879d-1741531969d1"
                    id="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
      <sequenceFlow sourceRef="_cb8714ef-9a07-4569-96f7-127d84245606"
                    targetRef="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                    id="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
         <extensionElements>
            <adonis:connector>
               <adonis:attribute name="VISUALIZED_VALUES_SUBSEQUENT"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v2">
                  <adonis:value>Name and transition condition</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="MONITORING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="FONT_COLOUR"
                                 type="INTEGER"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>0</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="AUDITING"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="REPRESENTATION_HAS_PROCESS"
                                 type="ENUM"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0"
                                 lang-independent="v0">
                  <adonis:value>automatic</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:attribute name="IS_IMMEDIATE"
                                 type="BOOL"
                                 notebook="1"
                                 sourcelang=""
                                 novalue="0">
                  <adonis:value>false</adonis:value>
                  <adonis:metavalue/>
               </adonis:attribute>
               <adonis:record name="SIMULATION_VARIABLES"/>
            </adonis:connector>
         </extensionElements>
      </sequenceFlow>
   </process>
   <bpmndi:BPMNDiagram name="A.1.0" id="Diagram_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
      <bpmndi:BPMNPlane id="BPMNPlane_5c5d13d3-6de6-46bd-9d92-682b0e8663fb"
                        bpmnElement="process_5c5d13d3-6de6-46bd-9d92-682b0e8663fb">
         <bpmndi:BPMNShape bpmnElement="_1adc99e5-a00d-4db0-8822-1633f0a450db"
                           id="BPMN_Shape_1adc99e5-a00d-4db0-8822-1633f0a450db">
            <omgdc:Bounds width="56" height="56" x="786" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb"
                           id="BPMN_Shape_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb">
            <omgdc:Bounds height="76" width="151" x="171" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b"
                           id="BPMN_Shape_23ddf601-ef96-40d9-8c70-c4f7a8ff7f1b">
            <omgdc:Bounds height="76" width="151" x="379" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_cb8714ef-9a07-4569-96f7-127d84245606"
                           id="BPMN_Shape_cb8714ef-9a07-4569-96f7-127d84245606">
            <omgdc:Bounds width="56" height="56" x="67" y="67"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNShape bpmnElement="_d4afe0b5-098e-4633-879d-1741531969d1"
                           id="BPMN_Shape_d4afe0b5-098e-4633-879d-1741531969d1">
            <omgdc:Bounds height="76" width="151" x="587" y="57"/>
         </bpmndi:BPMNShape>
         <bpmndi:BPMNEdge id="BPMN_Edge_021f3e36-eeca-485f-af99-5d6be12defe3"
                          bpmnElement="_021f3e36-eeca-485f-af99-5d6be12defe3">
            <omgdi:waypoint x="743" y="96"/>
            <omgdi:waypoint x="784" y="96"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_04d0b188-e478-401e-8590-b28de386fbce"
                          bpmnElement="_04d0b188-e478-401e-8590-b28de386fbce">
            <omgdi:waypoint x="327" y="95"/>
            <omgdi:waypoint x="374" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_f69e0dff-5367-4542-ab08-c79c6fa6b7e5"
                          bpmnElement="_f69e0dff-5367-4542-ab08-c79c6fa6b7e5">
            <omgdi:waypoint x="535" y="95"/>
            <omgdi:waypoint x="582" y="95"/>
         </bpmndi:BPMNEdge>
         <bpmndi:BPMNEdge id="BPMN_Edge_ff255561-ec77-481b-b5c2-b1aff622c8b9"
                          bpmnElement="_ff255561-ec77-481b-b5c2-b1aff622c8b9">
            <omgdi:waypoint x="127" y="95"/>
            <omgdi:waypoint x="166" y="95"/>
         </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
   </bpmndi:BPMNDiagram>
</definitions>
`;

    const json = new BpmnXmlParser().parse(a10Process);

    verifyDefinitions(json);

    // Process
    const process = json.definitions.process;
    verifyProperties(process, ['id', 'isExecutable', 'startEvent', 'task', 'endEvent', 'sequenceFlow']);
    expect(process.startEvent.name).toEqual('Start Event \n(Main) with &unknown; entity');
    expect(process.task[0].id).toEqual('_1fdcbe52-75cb-4b8a-98dd-10d4d974e1cb ♠');
  });
});
