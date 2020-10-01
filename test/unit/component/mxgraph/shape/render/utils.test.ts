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
import { MarkerType } from '../../../../../../src/model/bpmn/internal/shape';

function computeAllPermutations(array: string[]): string[][][] {
  // see https://stackoverflow.com/questions/9960908/permutations-in-javascript and https://code-boxx.com/javascript-permutations-combinations/

  const permutation = [...array];

  const length = permutation.length,
    result = [[permutation.slice()]],
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
      result.push([permutation.slice()]);
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

describe('check permutations', () => {
  // The loop marker MAY be used in combination with any of the other markers except the multi-instance marker.
  // The ad-hoc marker MAY be used in combination with any of the other markers.
  // The Compensation marker MAY be used in combination with any of the other markers.

  it('2 elements', () => {
    expect(computeAllPermutations(['1', '2'])).toEqual([[['1', '2']], [['2', '1']]]);
  });

  it('3 elements', () => {
    expect(computeAllPermutations(['1', '2', '3'])).toEqual([[['1', '2', '3']], [['2', '1', '3']], [['3', '1', '2']], [['1', '3', '2']], [['2', '3', '1']], [['3', '2', '1']]]);
  });

  it('4 elements', () => {
    expect(computeAllPermutations(['1', '2', '3', '4'])).toHaveLength(24);
  });
});

describe('enforce activity markers order', () => {
  describe('1 element', () => {
    it.each(Object.values(MarkerType))(`1 element - %s`, (marker: string) => {
      const markers = [marker];
      expect(orderActivityMarkers(markers)).toEqual(markers);
    });
  });

  describe('2 elements', () => {
    describe.each([
      [[MarkerType.LOOP, MarkerType.EXPAND]],
      [[MarkerType.MULTI_INSTANCE_PARALLEL, MarkerType.EXPAND]],
      [[MarkerType.MULTI_INSTANCE_SEQUENTIAL, MarkerType.EXPAND]],
      [[MarkerType.COMPENSATION, MarkerType.EXPAND]],
      [[MarkerType.EXPAND, MarkerType.ADHOC]],
      [[MarkerType.LOOP, MarkerType.COMPENSATION]],
      [[MarkerType.MULTI_INSTANCE_SEQUENTIAL, MarkerType.COMPENSATION]],
      [[MarkerType.MULTI_INSTANCE_PARALLEL, MarkerType.COMPENSATION]],
      [[MarkerType.COMPENSATION, MarkerType.ADHOC]],
      [[MarkerType.LOOP, MarkerType.ADHOC]],
      [[MarkerType.MULTI_INSTANCE_SEQUENTIAL, MarkerType.ADHOC]],
      [[MarkerType.MULTI_INSTANCE_PARALLEL, MarkerType.ADHOC]],
    ])(`markers: %s`, (expectedOrderedMarkers: string[]) => {
      it.each(computeAllPermutations(expectedOrderedMarkers))('permutation: %s', (permutedMarkers: string[]) => {
        expect(orderActivityMarkers(permutedMarkers)).toEqual(expectedOrderedMarkers);
      });
    });
  });

  describe('3 elements', () => {
    describe.each([
      [[MarkerType.LOOP, MarkerType.COMPENSATION, MarkerType.EXPAND]],
      [[MarkerType.MULTI_INSTANCE_SEQUENTIAL, MarkerType.COMPENSATION, MarkerType.EXPAND]],
      [[MarkerType.MULTI_INSTANCE_PARALLEL, MarkerType.COMPENSATION, MarkerType.EXPAND]],
      [[MarkerType.COMPENSATION, MarkerType.EXPAND, MarkerType.ADHOC]],
      [[MarkerType.LOOP, MarkerType.EXPAND, MarkerType.ADHOC]],
      [[MarkerType.MULTI_INSTANCE_SEQUENTIAL, MarkerType.EXPAND, MarkerType.ADHOC]],
      [[MarkerType.MULTI_INSTANCE_PARALLEL, MarkerType.EXPAND, MarkerType.ADHOC]],
    ])(`markers: %s`, (expectedOrderedMarkers: string[]) => {
      it.each(computeAllPermutations(expectedOrderedMarkers))('permutation: %s', (permutedMarkers: string[]) => {
        expect(orderActivityMarkers(permutedMarkers)).toEqual(expectedOrderedMarkers);
      });
    });
  });

  describe('4 elements', () => {
    describe.each([
      [[MarkerType.LOOP, MarkerType.COMPENSATION, MarkerType.EXPAND, MarkerType.ADHOC]],
      [[MarkerType.MULTI_INSTANCE_SEQUENTIAL, MarkerType.COMPENSATION, MarkerType.EXPAND, MarkerType.ADHOC]],
      [[MarkerType.MULTI_INSTANCE_PARALLEL, MarkerType.COMPENSATION, MarkerType.EXPAND, MarkerType.ADHOC]],
    ])(`markers: %s`, (expectedOrderedMarkers: string[]) => {
      it.each(computeAllPermutations(expectedOrderedMarkers))('permutation: %s', (permutedMarkers: string[]) => {
        expect(orderActivityMarkers(permutedMarkers)).toEqual(expectedOrderedMarkers);
      });
    });
  });

  // Support extensions that add markers
  describe('extra elements', () => {
    it.each([
      [
        ['extraAtStart', MarkerType.EXPAND, MarkerType.LOOP, 'extraAtEnd'],
        [MarkerType.LOOP, MarkerType.EXPAND, 'extraAtStart', 'extraAtEnd'],
      ],
      [
        ['extraAtStart', MarkerType.ADHOC, MarkerType.EXPAND, 'extraAtEnd'],
        [MarkerType.EXPAND, MarkerType.ADHOC, 'extraAtStart', 'extraAtEnd'],
      ],
    ])(`order: %s)`, (markers: string[], expectedOrderedMarkers: string[]) => {
      expect(orderActivityMarkers(markers)).toEqual(expectedOrderedMarkers);
    });
  });
});
