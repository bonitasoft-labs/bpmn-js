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
import Graph from './../component/graph/Graph';

export const graph = new Graph(window.document.getElementById('graph'));

function readAndLoadFile(f: File): void {
  const reader = new FileReader();
  reader.onload = () => {
    graph.load(reader.result as string);
  };
  reader.readAsText(f);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleFileSelect(evt: any): void {
  const f = evt.target.files[0];
  readAndLoadFile(f);
}

document.getElementById('bpmn-file').addEventListener('change', handleFileSelect, false);

const upload = document.getElementById('file-selector');
upload.addEventListener(
  'dragover',
  function(event) {
    if (!this.classList.contains('dragging')) {
      this.classList.add('dragging');
    }
    console.log('DRAGOVER');
  },
  false,
);
upload.addEventListener(
  'drop',
  function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    const dt = event.dataTransfer;
    const files = dt.files;
    readAndLoadFile(files[0]);
  },
  false,
);
upload.addEventListener(
  'dragleave',
  function(event) {
    this.classList.remove('dragging');
    console.log('DRAGLEAVE');
  },
  false,
);
