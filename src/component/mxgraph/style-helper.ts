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

/**
 * Compute the class name in an hyphen case form.
 * For instance, `userTask` returns `bpmn-user-task`
 * ```
 * @param bpmnElementKind the string representation of a BPMN element kind i.e {@link ShapeBpmnElementKind} and {@link FlowKind}.
 * @param isLabel the boolean that indicates if class must be computed for label.
 */
export function computeBpmnBaseClassNames(bpmnElementKind: string, isLabel: boolean): string {
  const classCss = computeBpmnBaseClassName(bpmnElementKind);
  return isLabel ? addLabelClass(classCss) : classCss;
}

/**
 * Compute the class name in an hyphen case form.
 * For instance, `userTask` returns `bpmn-user-task`
 * ```
 * @param bpmnElementKind the string representation of a BPMN element kind i.e {@link ShapeBpmnElementKind} and {@link FlowKind}.
 */
export function computeBpmnBaseClassName(bpmnElementKind: string): string {
  return !bpmnElementKind ? '' : 'bpmn-' + bpmnElementKind.replace(/([A-Z])/g, g => '-' + g[0].toLowerCase());
}

/**
 * Extract the BPMN kind from the style of the cell. It is the string representation of the BPMN element kind i.e {@link ShapeBpmnElementKind} and {@link FlowKind}.
 * @param cell the mxCell whose style is checked.
 */
export function extractBpmnKindFromStyle(cell: mxCell): string {
  return cell.style.split(';')[0];
}

/**
 * Adds bpmn-label css class to the classCss string.
 * @param classCss the existing class string
 */
export function addLabelClass(classCss: string): string {
  return addClass(classCss, 'bpmn-label');
}

/**
 * Adds arbitrary class to the classCss string.
 * @param classCss the existing class string
 * @param newClass the new css class to be added
 */
function addClass(classCss: string, newClass: string | string[]): string {
  if (Array.isArray(newClass)) {
    return classCss + ' ' + newClass.join(' ');
  } else {
    return classCss + ' ' + newClass;
  }
}
