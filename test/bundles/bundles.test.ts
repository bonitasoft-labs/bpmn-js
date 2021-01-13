/**
 * Copyright 2021 Bonitasoft S.A.
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
import { BpmnPuppeteer } from '../e2e/helpers/visu/bpmn-puppeteer-utils';
import { existsSync } from 'fs';
import { resolve } from 'path';

describe('bundles', () => {
  describe('All bundles have been generated', () => {
    const bundlesDirectoryPath = resolve(__dirname, '../../dist');

    it.each`
      file                               | bundleType
      ${'bpmn-visualization.cjs.js'}     | ${'CommonJS'}
      ${'bpmn-visualization.cjs.min.js'} | ${'CommonJS minified'}
      ${'bpmn-visualization.esm.js'}     | ${'ESM'}
      ${'bpmn-visualization.esm.min.js'} | ${'ESM minified'}
      ${'bpmn-visualization.js'}         | ${'IIFE'}
      ${'bpmn-visualization.min.js'}     | ${'IIFE minified'}
    `(
      '$bundleType',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ file, bundleType }) => {
        expect(existsSync(resolve(bundlesDirectoryPath, file))).toBe(true);
      },
    );
  });

  it('IIFE bundle - should generate BPMN Diagram SVG', async () => {
    const pagePath = resolve(__dirname, 'static/lib-integration-iife.html');
    await page.goto(`file://${pagePath}`);

    const bpmnPuppeteer = new BpmnPuppeteer('bpmn-container-for-iife-bundle', page);
    bpmnPuppeteer.expectPageTitle('BPMN Visualization IIFE bundle');
    bpmnPuppeteer.expectAvailableBpmnContainer();

    await bpmnPuppeteer.expectEvent('StartEvent_1', 'Start Event 1');
    await bpmnPuppeteer.expectSequenceFlow('Flow_1', 'Sequence Flow 1');
    await bpmnPuppeteer.expectTask('Activity_1', 'Task 1');
    await bpmnPuppeteer.expectSequenceFlow('Flow_2');
    await bpmnPuppeteer.expectEvent('EndEvent_1', 'End Event 1', false);
  });
});
