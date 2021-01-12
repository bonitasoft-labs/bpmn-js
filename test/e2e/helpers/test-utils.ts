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
import debugLogger from 'debug';
import { findFiles } from '../../helpers/file-helper';
import { join } from 'path';

export const log = debugLogger('test');

export function getSimplePlatformName(): string {
  const platform = process.platform;
  log(`This platform is ${platform}`);

  if (platform.startsWith('win')) {
    return 'windows';
  } else if (platform.startsWith('darwin')) {
    return 'macos';
  }
  // we don't support other platform than linux, so hardcode it
  return 'linux';
}

export function delay(time: number): Promise<unknown> {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export function getBpmnDiagramNames(directoryName: string) {
  return findFiles(join('../fixtures/bpmn/', directoryName))
    .filter(filename => {
      return filename.endsWith('.bpmn');
    })
    .map(filename => {
      return filename.split('.').slice(0, -1).join('.');
    });
}
