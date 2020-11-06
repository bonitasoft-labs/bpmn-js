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
import { ShapeBpmnElementKind } from './ShapeBpmnElementKind';
import { ShapeBpmnEventKind } from './ShapeBpmnEventKind';
import { BpmnEventKind } from './ShapeUtil';
import { ShapeBpmnSubProcessKind } from './ShapeBpmnSubProcessKind';
import { ShapeBpmnMarkerKind } from './ShapeBpmnMarkerKind';
import { ShapeBpmnCallActivityKind } from './ShapeBpmnCallActivityKind';

export default class ShapeBpmnElement {
  constructor(readonly id: string, readonly name: string, readonly kind: ShapeBpmnElementKind, public parentId?: string, readonly instantiate: boolean = false) {}
}

export class ShapeBpmnActivity extends ShapeBpmnElement {
  constructor(id: string, name: string, kind: ShapeBpmnElementKind, parentId: string, instantiate?: boolean, readonly markers: ShapeBpmnMarkerKind[] = []) {
    super(id, name, kind, parentId, instantiate);
  }
}

export class ShapeBpmnCallActivity extends ShapeBpmnActivity {
  constructor(id: string, name: string, readonly callActivityKind: ShapeBpmnCallActivityKind, parentId: string, markers?: ShapeBpmnMarkerKind[]) {
    super(id, name, ShapeBpmnElementKind.CALL_ACTIVITY, parentId, undefined, markers);
  }
}

export class ShapeBpmnSubProcess extends ShapeBpmnActivity {
  constructor(id: string, name: string, readonly subProcessKind: ShapeBpmnSubProcessKind, parentId: string, markers?: ShapeBpmnMarkerKind[]) {
    super(id, name, ShapeBpmnElementKind.SUB_PROCESS, parentId, undefined, markers);
  }
}

export class ShapeBpmnEvent extends ShapeBpmnElement {
  constructor(id: string, name: string, elementKind: BpmnEventKind, readonly eventKind: ShapeBpmnEventKind, parentId: string) {
    super(id, name, elementKind, parentId);
  }
}

export class ShapeBpmnStartEvent extends ShapeBpmnEvent {
  constructor(id: string, name: string, eventKind: ShapeBpmnEventKind, parentId: string, readonly isInterrupting?: boolean) {
    super(id, name, ShapeBpmnElementKind.EVENT_START, eventKind, parentId);
  }
}

export class ShapeBpmnBoundaryEvent extends ShapeBpmnEvent {
  constructor(id: string, name: string, eventKind: ShapeBpmnEventKind, parentId: string, readonly isInterrupting: boolean = true) {
    super(id, name, ShapeBpmnElementKind.EVENT_BOUNDARY, eventKind, parentId);
  }
}

// TODO switch to enum for consistency with other type/kind?
export type EventGatewayType = 'Exclusive' | 'Parallel';
// TODO require model image change!!!!
export class ShapeBpmnEventBasedGateway extends ShapeBpmnElement {
  constructor(id: string, name: string, parentId: string, instantiate?: boolean, readonly gatewayKind?: EventGatewayType) {
    super(id, name, ShapeBpmnElementKind.GATEWAY_EVENT_BASED, parentId, instantiate);
  }
}

export class Participant {
  constructor(readonly id: string, readonly name?: string, public processRef?: string) {}
}
