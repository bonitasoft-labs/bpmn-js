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
import 'jest-playwright-preset';
import { ImageSnapshotConfigurator, ImageSnapshotThresholdConfig, MultiBrowserImageSnapshotThresholds } from './helpers/visu/image-snapshot-config';
import { PageTester } from './helpers/visu/PageTester';
import { join } from 'path';
import { OverlayEdgePosition, OverlayPosition, OverlayShapePosition } from '../../src/component/registry';
import { chromiumZoom, clickOnButton, getContainerCenter, itMouseWheel, mousePanning, Point } from './helpers/test-utils';
import { overlayEdgePositionValues, overlayShapePositionValues } from '../helpers/overlays';
import { ensureIsArray } from '../../src/component/helpers/array-utils';
import { ElementHandle } from 'playwright';

class ImageSnapshotThresholds extends MultiBrowserImageSnapshotThresholds {
  constructor() {
    super({ chromium: 0.000005, firefox: 0.0004, webkit: 0 });
  }

  getChromiumThresholds(): Map<string, ImageSnapshotThresholdConfig> {
    // if no dedicated information, set minimal threshold to make test pass on Github Workflow
    // linux threshold are set for Ubuntu
    return new Map<string, ImageSnapshotThresholdConfig>([
      [
        'overlays.start.flow.task.gateway',
        {
          linux: 0.001, // 0.09368089665046096%
          windows: 0.003, // 0.24558800934610941%
        },
      ],
      [
        'overlays.edges.message.flows.complex.paths',
        {
          linux: 0.0002, // 0.012292700871674445%
          macos: 0.009, // 0.08719999889645891%
          windows: 0.002, // 0.19835931612992574%
        },
      ],
      [
        'overlays.edges.associations.complex.paths',
        {
          linux: 0.0003, // 0.02042994297090095% / 0.028687210421007858% / 0.022131767755118048%
          macos: 0.002, // 0.013972840122933317%
          windows: 0.002, // 0.19835931612992574%
        },
      ],
      [
        'overlays.edges.sequence.flows.complex.paths',
        {
          linux: 0.00023, // 0.022730494717471128% / 0.01857098860091888% / 0.010326307039609794%
          macos: 0.0002, // 0.010791806455801023%
        },
      ],
      [
        'overlays.edges.sequence.flows.complex.paths',
        {
          windows: 0.002, // 0.18115730095212834%
        },
      ],
    ]);
  }

  getFirefoxThresholds(): Map<string, ImageSnapshotThresholdConfig> {
    return new Map<string, ImageSnapshotThresholdConfig>([
      [
        'overlays.start.flow.task.gateway',
        {
          linux: 0.0053, // 0.5229417116423329%
          macos: 0.0061, // 0.6026399523082704%
        },
      ],
      [
        'overlays.edges.message.flows.complex.paths',
        {
          linux: 0.004, // 0.38563259095634184%
          macos: 0.004, // 0.36700887485542344%
        },
      ],
      [
        'overlays.edges.associations.complex.paths',
        {
          windows: 0.004, // 0.3607039279524549%
          macos: 0.003, // 0.27327763334737964%
        },
      ],
      [
        'overlays.edges.sequence.flows.complex.paths',
        {
          linux: 0.0014, // 0.08228072459832703% / 0.13226428690803482% / 0.05865724301086228%
          windows: 0.0024, // 0.23601194547107074%
          macos: 0.0026, // 0.25655896127774197%
        },
      ],
    ]);
  }

  protected getWebkitThresholds(): Map<string, ImageSnapshotThresholdConfig> {
    return new Map<string, ImageSnapshotThresholdConfig>([
      [
        'overlays.start.flow.task.gateway',
        {
          macos: 0.0051, // max 0.5021666239539258%
        },
      ],
      [
        'overlays.edges.message.flows.complex.paths',
        {
          macos: 0.0028, // max 0.2757481729149802%
        },
      ],
      [
        'overlays.edges.associations.complex.paths',
        {
          macos: 0.0028, // max 0.2757481729149802%
        },
      ],
      [
        'overlays.edges.sequence.flows.complex.paths',
        {
          macos: 0.00049, // max 0.048499647723088124%
        },
      ],
    ]);
  }
}

async function addOverlays(bpmnElementIds: string | string[], positions: OverlayPosition | OverlayPosition[]): Promise<void> {
  positions = ensureIsArray<OverlayPosition>(positions);
  for (const bpmnElementId of ensureIsArray<string>(bpmnElementIds)) {
    await page.fill('#bpmn-id-input', bpmnElementId);
    for (const position of positions) {
      await clickOnButton(position);
    }
  }
}

async function addStylingOverlay(bpmnElementIds: string[], style: string): Promise<void> {
  for (const bpmnElementId of bpmnElementIds) {
    await page.fill('#bpmn-id-input', bpmnElementId);
    await clickOnButton(style);
  }
}

async function removeAllOverlays(bpmnElementId: string): Promise<void> {
  await page.fill('#bpmn-id-input', bpmnElementId);
  await clickOnButton('clear');
}

const imageSnapshotThresholds = new ImageSnapshotThresholds();
const imageSnapshotConfigurator = new ImageSnapshotConfigurator(imageSnapshotThresholds.getThresholds(), 'overlays', imageSnapshotThresholds.getDefault());

// to have mouse pointer visible during headless test - add 'showMousePointer: true' as parameter
const pageTester = new PageTester({ pageFileName: 'overlays', expectedPageTitle: 'BPMN Visualization - Overlays' });

describe('BPMN Shapes with overlays', () => {
  const bpmnDiagramName = 'overlays.start.flow.task.gateway';

  function getShapeDir(dir: string): string {
    return join(dir, `on.shape`);
  }

  it.each(overlayShapePositionValues)(`add overlay on StartEvent, Gateway and Task on %s`, async (position: OverlayShapePosition) => {
    await pageTester.loadBPMNDiagramInRefreshedPage(bpmnDiagramName);

    await addOverlays(['StartEvent_1', 'Activity_1', 'Gateway_1'], position);

    const image = await page.screenshot({ fullPage: true });
    const config = imageSnapshotConfigurator.getConfig(bpmnDiagramName);
    expect(image).toMatchImageSnapshot({
      ...config,
      customSnapshotIdentifier: `add.overlay.on.position.${position}`,
      customSnapshotsDir: getShapeDir(config.customSnapshotsDir),
      customDiffDir: getShapeDir(config.customDiffDir),
    });
  });

  it(`remove all overlays of Shape`, async () => {
    await pageTester.loadBPMNDiagramInRefreshedPage(bpmnDiagramName);

    await addOverlays('Activity_1', ['top-left', 'bottom-left', 'middle-right']);

    await removeAllOverlays('Activity_1');

    const image = await page.screenshot({ fullPage: true });
    const config = imageSnapshotConfigurator.getConfig(bpmnDiagramName);
    expect(image).toMatchImageSnapshot({
      ...config,
      customSnapshotIdentifier: 'remove.all.overlays.of.shape',
      customSnapshotsDir: getShapeDir(config.customSnapshotsDir),
      customDiffDir: getShapeDir(config.customDiffDir),
    });
  });
});

describe('BPMN Edges with overlays', () => {
  describe.each([
    ['overlays.edges.associations.complex.paths', 'association', ['Association_1opueuo', 'Association_0n43f9f', 'Association_01t0kyz']],
    [
      'overlays.edges.message.flows.complex.paths',
      'message',
      [
        // incoming and outgoing flows of the 2 pools starting from the right
        'Flow_0skfnol',
        'Flow_0ssridu',
        'Flow_0s4cl7e',
        'Flow_0zz7yh1',
        // flows in the middle of the diagram
        'Flow_0vsaa9d',
        'Flow_17olevz',
        'Flow_0qhtw2k',
        // flows on the right
        'Flow_0mmisr0',
        'Flow_1l8ze06',
      ],
    ],
    ['overlays.edges.sequence.flows.complex.paths', 'sequence', ['Flow_039xs1c', 'Flow_0m2ldux', 'Flow_1r3oti3', 'Flow_1byeukq']],
  ])('diagram %s', (bpmnDiagramName: string, edgeKind: string, bpmnElementIds: string[]) => {
    function getEdgeDir(dir: string): string {
      return join(dir, `on.edge`);
    }

    function getEdgePositionDir(dir: string, position: OverlayEdgePosition): string {
      return join(getEdgeDir(dir), `on-position-${position}`);
    }

    it.each(overlayEdgePositionValues)(`add overlay on ${edgeKind} flow on %s`, async (position: OverlayEdgePosition) => {
      await pageTester.loadBPMNDiagramInRefreshedPage(bpmnDiagramName);

      await addOverlays(bpmnElementIds, position);

      const image = await page.screenshot({ fullPage: true });
      const config = imageSnapshotConfigurator.getConfig(bpmnDiagramName);
      expect(image).toMatchImageSnapshot({
        ...config,
        customSnapshotIdentifier: `add.overlay.on.${edgeKind}.flow`,
        customSnapshotsDir: getEdgePositionDir(config.customSnapshotsDir, position),
        customDiffDir: getEdgePositionDir(config.customDiffDir, position),
      });
    });

    it(`remove all overlays of ${edgeKind} flow`, async () => {
      await pageTester.loadBPMNDiagramInRefreshedPage(bpmnDiagramName);

      const id = bpmnElementIds.shift();
      await addOverlays(id, ['start', 'middle', 'end']);

      await removeAllOverlays(id);

      const image = await page.screenshot({ fullPage: true });
      const config = imageSnapshotConfigurator.getConfig(bpmnDiagramName);
      expect(image).toMatchImageSnapshot({
        ...config,
        customSnapshotIdentifier: `remove.all.overlays.of.${edgeKind}.flow`,
        customSnapshotsDir: getEdgeDir(config.customSnapshotsDir),
        customDiffDir: getEdgeDir(config.customDiffDir),
      });
    });
  });
});

describe('Overlay navigation', () => {
  const bpmnDiagramName = 'overlays.start.flow.task.gateway';
  let bpmnContainerElementHandle: ElementHandle<SVGElement | HTMLElement>;
  let containerCenter: Point;

  beforeEach(async () => {
    bpmnContainerElementHandle = await pageTester.loadBPMNDiagramInRefreshedPage(bpmnDiagramName);
    containerCenter = await getContainerCenter(bpmnContainerElementHandle);

    await addOverlays('StartEvent_1', 'bottom-center');
    await addOverlays('Activity_1', 'middle-right');
    await addOverlays('Gateway_1', 'top-right');
    await addOverlays('Flow_1', 'start');
  });

  it('panning', async () => {
    await mousePanning({ containerElement: bpmnContainerElementHandle, originPoint: containerCenter, destinationPoint: { x: containerCenter.x + 150, y: containerCenter.y + 40 } });

    const image = await page.screenshot({ fullPage: true });
    const config = imageSnapshotConfigurator.getConfig(bpmnDiagramName);
    expect(image).toMatchImageSnapshot({
      ...config,
      customSnapshotIdentifier: 'panning',
    });
  });

  itMouseWheel(`zoom out`, async () => {
    await chromiumZoom(1, { x: containerCenter.x + 200, y: containerCenter.y }, 100);

    const image = await page.screenshot({ fullPage: true });
    const config = imageSnapshotConfigurator.getConfig(bpmnDiagramName);
    expect(image).toMatchImageSnapshot({
      ...config,
      customSnapshotIdentifier: 'zoom.out',
    });
  });
});

describe('Overlay style', () => {
  const bpmnDiagramName = 'overlays.start.flow.task.gateway';
  const snapshotPath = 'with.custom.style';

  // Configure thresholds by types of overlay styles - we use the same bpmn diagram in all tests
  class OverlayStylesImageSnapshotThresholds extends MultiBrowserImageSnapshotThresholds {
    constructor() {
      // don't set defaults as we defined thresholds for all style variants
      super({ chromium: 0, firefox: 0, webkit: 0 });
    }

    getChromiumThresholds(): Map<string, ImageSnapshotThresholdConfig> {
      // if no dedicated information, set minimal threshold to make test pass on Github Workflow
      // linux threshold are set for Ubuntu
      return new Map<string, ImageSnapshotThresholdConfig>([
        [
          'fill',
          {
            linux: 0.00016, // 0.015068122418016028%
            macos: 0.000006, // 0.0005215592635332555%
            windows: 0.002, // 0.16108430159252896%
          },
        ],
        [
          'font',
          {
            linux: 0.0056, // 0.551258767924101%
            macos: 0.000002, // 0.00013412837215343032%
            windows: 0.012, // 1.1286092563398964%
          },
        ],
        [
          'stroke',
          {
            linux: 0.0018, // 0.17850987617574754%
            macos: 0.000002, // 0.00011679796428909484%
            windows: 0.001, // 0.09036713671126684%
          },
        ],
      ]);
    }

    getFirefoxThresholds(): Map<string, ImageSnapshotThresholdConfig> {
      return new Map<string, ImageSnapshotThresholdConfig>([
        [
          'fill',
          {
            linux: 0.0018, // 0.17274440837963256
            macos: 0.0036, // 0.35628465895451983%
            windows: 0.0024, // 0.023193217953598744%
          },
        ],
        [
          // TODO very large thresholds on Firefox linux/macOS for font overlay styles
          'font',
          {
            linux: 0.0179, // 1.7851679094800676%
            macos: 0.0193, // 1.926162542254506%
            windows: 0.0074, // 0.7365585865893864%
          },
        ],
        [
          'stroke',
          {
            linux: 0.0031, // 0.3048495736480361%
            macos: 0.0018, // 0.1730781727336872%
            windows: 0.00032, // 0.03129199556292095%
          },
        ],
      ]);
    }

    protected getWebkitThresholds(): Map<string, ImageSnapshotThresholdConfig> {
      return new Map<string, ImageSnapshotThresholdConfig>([
        [
          'fill',
          {
            macos: 0.0015, // 0.1454447604660958%
          },
        ],
        [
          'font',
          {
            macos: 0.001, // 0.09974937844267062%
          },
        ],
        [
          'stroke',
          {
            macos: 0.0013, // 0.12270105834573108%
          },
        ],
      ]);
    }
  }

  const imageSnapshotThresholds = new OverlayStylesImageSnapshotThresholds();
  const imageSnapshotConfigurator = new ImageSnapshotConfigurator(imageSnapshotThresholds.getThresholds(), 'overlays', imageSnapshotThresholds.getDefault());

  it.each(['fill', 'font', 'stroke'])(`add overlay with custom %s`, async (style: string) => {
    await pageTester.loadBPMNDiagramInRefreshedPage(bpmnDiagramName);

    await addStylingOverlay(['StartEvent_1', 'Activity_1', 'Gateway_1', 'Flow_1'], style);

    const image = await page.screenshot({ fullPage: true });
    const config = imageSnapshotConfigurator.getConfig(style);
    expect(image).toMatchImageSnapshot({
      ...config,
      customSnapshotIdentifier: `add.overlay.with.custom.${style}`,
      customSnapshotsDir: join(config.customSnapshotsDir, snapshotPath),
      customDiffDir: join(config.customDiffDir, snapshotPath),
    });
  });
});
