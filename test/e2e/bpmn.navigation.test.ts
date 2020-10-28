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
import { BpmnDiagramPreparation, ImageSnapshotConfigurator, ImageSnapshotThresholdConfig, PageTester } from './helpers/visu-utils';
import { Mouse } from 'puppeteer';
// FIXME - to be fixed when new release of puppeteer comes out
// wheel is added in version @types/puppeteer 2.1.5 but for some reason not in 3.0.2
// perhaps will be soon available in 3.0.3
// @see https://github.com/puppeteer/puppeteer/pull/6141/files
interface MouseWheelOptions {
  /**
   * X delta in CSS pixels for mouse wheel event (default: 0). Positive values emulate a scroll up and negative values a scroll down event.
   * @default 0
   */
  deltaX?: number;
  /**
   *  Y delta in CSS pixels for mouse wheel event (default: 0). Positive values emulate a scroll right and negative values a scroll left event.
   * @default 0
   */
  deltaY?: number;
}
interface MouseWithWheel extends Mouse {
  /**
   * Dispatches a `mousewheel` event.
   * @param options The mouse wheel options.
   */
  wheel(options?: MouseWheelOptions): Promise<void>;
}

describe('diagram navigation', () => {
  const imageSnapshotConfigurator = new ImageSnapshotConfigurator(
    new Map<string, ImageSnapshotThresholdConfig>([
      [
        'simple-2_start_events-1_task',
        // minimal threshold to make test pass on Github Workflow
        // ubuntu:
        // macOS: Expected image to match or be a close match to snapshot but was 0.0008357925673774247%
        // windows:
        {
          linux: 0.000004,
          macos: 0.00001,
          windows: 0.00008,
        },
      ],
    ]),
  );

  // to have mouse pointer visible during headless test - add 'showMousePointer=true' to queryParams
  const bpmnDiagramPreparation = new BpmnDiagramPreparation(new Map(), { name: 'navigation-diagram', queryParams: [] }, 'navigation');

  const pageTester = new PageTester(bpmnDiagramPreparation, 'bpmn-viewport', 'BPMN Visualization - Diagram Navigation');

  const fileName = 'simple-2_start_events-1_task';
  let viewportCenterX: number;
  let viewportCenterY: number;
  beforeEach(async () => {
    const bpmnViewportElementHandle = await pageTester.expectBpmnDiagramToBeDisplayed(fileName);
    const bounding_box = await bpmnViewportElementHandle.boundingBox();
    viewportCenterX = bounding_box.x + bounding_box.width / 2;
    viewportCenterY = bounding_box.y + bounding_box.height / 2;
  });

  it('mouse panning', async () => {
    // simulate mouse panning
    await page.mouse.move(viewportCenterX, viewportCenterY);
    await page.mouse.down();
    await page.mouse.move(viewportCenterX + 150, viewportCenterY + 40);
    await page.mouse.up();

    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot(imageSnapshotConfigurator.getConfig(fileName));
  });

  it.each(['zoom in', 'zoom out'])(`ctrl + mouse: %s`, async (zoom: string) => {
    const deltaX = zoom === 'zoom in' ? -100 : 100;
    // simulate mouse+ctrl zoom
    await page.mouse.move(viewportCenterX + 200, viewportCenterY);
    await page.keyboard.down('Control');
    await (<MouseWithWheel>page.mouse).wheel({ deltaX: deltaX });

    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot(imageSnapshotConfigurator.getConfig(fileName));
  });

  it.each([3, 5])(`ctrl + mouse: initial scale after zoom in and zoom out [%s times]`, async (xTimes: number) => {
    const deltaX = -100;
    // simulate mouse+ctrl zoom
    await page.mouse.move(viewportCenterX + 200, viewportCenterY);
    await page.keyboard.down('Control');
    for (let i = 0; i < xTimes; i++) {
      await (<MouseWithWheel>page.mouse).wheel({ deltaX: deltaX });
    }
    for (let i = 0; i < xTimes; i++) {
      await (<MouseWithWheel>page.mouse).wheel({ deltaX: -deltaX });
    }
    const image = await page.screenshot({ fullPage: true });
    expect(image).toMatchImageSnapshot(imageSnapshotConfigurator.getConfig(fileName));
  });
});
