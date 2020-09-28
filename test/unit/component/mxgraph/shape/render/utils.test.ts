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
import { orderActivityMarkers } from '../../../../../../src/component/mxgraph/shape/render/utils';
import { ShapeBpmnMarkerKind } from '../../../../../../src/model/bpmn/shape';

function computeAllPermutations(array: string[]): string[][] {
  // see https://stackoverflow.com/questions/9960908/permutations-in-javascript and https://code-boxx.com/javascript-permutations-combinations/

  const permutation = [...array];

  const length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0);
  let i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

describe('check permutations', () => {
  it('3 elements', () => {
    expect(computeAllPermutations(['1', '2', '3'])).toEqual([
      ['1', '2', '3'],
      ['2', '1', '3'],
      ['3', '1', '2'],
      ['1', '3', '2'],
      ['2', '3', '1'],
      ['3', '2', '1'],
    ]);
  });

  it('4 elements', () => {
    expect(computeAllPermutations(['1', '2', '3', '4'])).toHaveLength(24);
  });
});

describe('enforce activity markers order', () => {
  describe('1 element', () => {
    it.each(Object.values(ShapeBpmnMarkerKind))(`1 element - %s`, (marker: string) => {
      const markers = [marker];
      expect(orderActivityMarkers(markers)).toEqual(markers);
    });
  });

  describe('2 elements', () => {
    describe.each([
      [
        [ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.LOOP],
        [ShapeBpmnMarkerKind.LOOP, ShapeBpmnMarkerKind.EXPAND],
      ],
      [
        [ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.MULTI_INSTANCE_PARALLEL],
        [ShapeBpmnMarkerKind.MULTI_INSTANCE_PARALLEL, ShapeBpmnMarkerKind.EXPAND],
      ],
      [
        [ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.MULTI_INSTANCE_SEQUENTIAL],
        [ShapeBpmnMarkerKind.MULTI_INSTANCE_SEQUENTIAL, ShapeBpmnMarkerKind.EXPAND],
      ],
      [
        [ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.COMPENSATION],
        [ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.EXPAND],
      ],
      [
        [ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.MULTI_INSTANCE_SEQUENTIAL],
        [ShapeBpmnMarkerKind.MULTI_INSTANCE_SEQUENTIAL, ShapeBpmnMarkerKind.COMPENSATION],
      ],
      [
        [ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.MULTI_INSTANCE_PARALLEL],
        [ShapeBpmnMarkerKind.MULTI_INSTANCE_PARALLEL, ShapeBpmnMarkerKind.COMPENSATION],
      ],
      [
        [ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.LOOP],
        [ShapeBpmnMarkerKind.LOOP, ShapeBpmnMarkerKind.COMPENSATION],
      ],
    ])(`markers: %s`, (markers: string[], expectedOrderedMarkers: string[]) => {
      // TODO check if we can use jest each here
      computeAllPermutations(markers).forEach(permutedMarkers => {
        it(`permutation: ${permutedMarkers}`, () => {
          expect(orderActivityMarkers(permutedMarkers)).toEqual(expectedOrderedMarkers);
        });
      });
    });
  });

  // TODO missing cases
  describe('3 elements', () => {
    describe.each([
      [
        [ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.LOOP],
        [ShapeBpmnMarkerKind.LOOP, ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.EXPAND],
      ],
      [
        [ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.MULTI_INSTANCE_SEQUENTIAL, ShapeBpmnMarkerKind.EXPAND],
        [ShapeBpmnMarkerKind.MULTI_INSTANCE_SEQUENTIAL, ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.EXPAND],
      ],
    ])(`markers: %s`, (markers: string[], expectedOrderedMarkers: string[]) => {
      // TODO check if we can use jest each here
      // TODO duplicated with the '2 elements' check
      computeAllPermutations(markers).forEach(permutedMarkers => {
        it(`permutation: ${permutedMarkers}`, () => {
          expect(orderActivityMarkers(permutedMarkers)).toEqual(expectedOrderedMarkers);
        });
      });
    });
  });

  // adhoc can have compensation and expand only
  describe('adhoc marker', () => {
    describe.each([
      [
        [ShapeBpmnMarkerKind.ADHOC, ShapeBpmnMarkerKind.EXPAND],
        [ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.ADHOC],
      ],
      [
        [ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.ADHOC, ShapeBpmnMarkerKind.EXPAND],
        [ShapeBpmnMarkerKind.COMPENSATION, ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.ADHOC],
      ],
    ])(`markers: %s`, (markers: string[], expectedOrderedMarkers: string[]) => {
      // TODO check if we can use jest each here
      // TODO duplicated with the '2 elements' check
      computeAllPermutations(markers).forEach(permutedMarkers => {
        it(`permutation: ${permutedMarkers}`, () => {
          expect(orderActivityMarkers(permutedMarkers)).toEqual(expectedOrderedMarkers);
        });
      });
    });
  });

  // Support extensions that add markers
  describe('extra elements', () => {
    it.each([
      [
        ['extraAtStart', ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.LOOP, 'extraAtEnd'],
        [ShapeBpmnMarkerKind.LOOP, ShapeBpmnMarkerKind.EXPAND, 'extraAtStart', 'extraAtEnd'],
      ],
      [
        ['extraAtStart', ShapeBpmnMarkerKind.ADHOC, ShapeBpmnMarkerKind.EXPAND, 'extraAtEnd'],
        [ShapeBpmnMarkerKind.EXPAND, ShapeBpmnMarkerKind.ADHOC, 'extraAtStart', 'extraAtEnd'],
      ],
    ])(`order: %s)`, (markers: string[], expectedOrderedMarkers: string[]) => {
      expect(orderActivityMarkers(markers)).toEqual(expectedOrderedMarkers);
    });
  });
});
