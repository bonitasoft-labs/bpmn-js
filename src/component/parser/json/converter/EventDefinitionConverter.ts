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
import { TDefinitions } from '../../../../model/bpmn/json/BPMN20';
import { ShapeBpmnEventKind } from '../../../../model/bpmn/internal/shape';
import { TEventDefinition } from '../../../../model/bpmn/json/baseElement/rootElement/eventDefinition';
import { ensureIsArray } from './ConverterUtil';

export const bpmnEventKinds = Object.values(ShapeBpmnEventKind).filter(kind => {
  return kind != ShapeBpmnEventKind.NONE;
});

const eventDefinitionsOfDefinitions: Map<string, ShapeBpmnEventKind> = new Map();

export function findEventDefinitionOfDefinitions(id: string): ShapeBpmnEventKind {
  return eventDefinitionsOfDefinitions.get(id);
}

export default class EventDefinitionConverter {
  deserialize(definitions: TDefinitions): void {
    try {
      eventDefinitionsOfDefinitions.clear();

      bpmnEventKinds.forEach(eventKind => {
        // sometimes eventDefinition is simple and therefore it is parsed as empty string "", in that case eventDefinition will be converted to an empty object
        const eventDefinitions: string | TEventDefinition | (string | TEventDefinition)[] = definitions[eventKind + 'EventDefinition'];
        ensureIsArray<TEventDefinition>(eventDefinitions, true).forEach(eventDefinition => {
          eventDefinitionsOfDefinitions.set(eventDefinition.id, eventKind);
        });
      });
    } catch (e) {
      // TODO error management
      console.error(e as Error);
    }
  }
}
