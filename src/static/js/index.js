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
import { documentReady, DropFileUserInterface, handleFileSelect, loadBpmn, logStartup, readAndLoadFile } from '../../index.es.js';

// TODO: move to UI initializer
new DropFileUserInterface(window, 'drop-container', 'graph', readAndLoadFile);

document.getElementById('bpmn-file').addEventListener('change', handleFileSelect, false);
document.getElementById('file-selector').classList.remove('hidden');

////////////////////////////////////////////////////////////////////////////////
// if bpmn passed as request parameter, try to load it directly
////////////////////////////////////////////////////////////////////////////////
documentReady(function () {
  const log = logStartup;
  log("Checking if 'BPMN auto loading from url parameter' is requested");
  const parameters = new URLSearchParams(window.location.search);
  const bpmnParameterValue = parameters.get('bpmn');
  if (bpmnParameterValue) {
    const bpmn = decodeURIComponent(bpmnParameterValue);
    log('BPMN auto loading');
    loadBpmn(bpmn);
    log('BPMN auto loading completed');
  } else {
    log('No BPMN auto loading');
  }
});
