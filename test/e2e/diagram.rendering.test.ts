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
import { BpmnDiagramPreparation, BpmnLoadMethod, ImageSnapshotConfigurator, ImageSnapshotThresholdConfig, PageTester } from './helpers/visu-utils';
import { FitType } from '../../src/component/BpmnVisualization';

describe('no diagram visual regression', () => {
  const imageSnapshotConfigurator = new ImageSnapshotConfigurator(
    new Map<string, ImageSnapshotThresholdConfig>([
      [
        'with_outside_labels',
        // minimal threshold to make test pass on Github Workflow
        // ubuntu: Expected image to match or be a close match to snapshot but was 0.05988176159102966% different from snapshot
        // macOS: Expected image to match or be a close match to snapshot but was 0.05988176159102966% different from snapshot
        // windows: Expected image to match or be a close match to snapshot but was 0.31647096370069905% different from snapshot
        {
          linux: 0.0006,
          macos: 0.0006,
          windows: 0.004,
        },
      ],
    ]),
  );

  describe.each([
    [FitType[FitType.Default], FitType.Default],
    [FitType[FitType.HorizontalVertical], FitType.HorizontalVertical],
  ])('load options: %s fit', async (fitTitle: string, fitType: FitType) => {
    const bpmnDiagramPreparation = new BpmnDiagramPreparation(new Map<string, BpmnLoadMethod>([]), { name: 'non-regression' }, 'diagram', { fitType });
    const pageTester = new PageTester(bpmnDiagramPreparation, 'viewport', 'BPMN Visualization Non Regression');

    it.each([['horizontal'], ['vertical'], ['with_outside_flows'], ['with_outside_labels']])('%s diagram', async (fileName: string) => {
      await pageTester.expectBpmnDiagramToBeDisplayed(fileName);

      const image = await page.screenshot({ fullPage: true });
      expect(image).toMatchImageSnapshot(imageSnapshotConfigurator.getConfig(fileName));
    });
  });
});
