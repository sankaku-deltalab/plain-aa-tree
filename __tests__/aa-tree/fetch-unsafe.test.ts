import {TAaTree} from '../../src/aa-tree';

describe('TAaTree.fetchUnsafe', (): void => {
  test('get correct item', (): void => {
    const putItems: [number, string][] = [
      [1, '1'],
      [2, '2'],
      [3, '3'],
      [4, '4'],
      [5, '5'],
      [6, '6'],
      [7, '7'],
      [8, '8'],
    ];
    const fetchItem: [number, string] = [8, '8'];

    let tree = TAaTree.new('number');
    for (const [k, v] of putItems) {
      tree = TAaTree.putNew(tree, k, v);
    }
    const actualValue = TAaTree.fetchUnsafe(tree, fetchItem[0]);

    expect(actualValue).toBe(fetchItem[1]);
  });

  test('throw error if item is not in tree', (): void => {
    const putItems: [number, string][] = [
      [1, '1'],
      [2, '2'],
      [3, '3'],
      [4, '4'],
      [5, '5'],
      [6, '6'],
      [7, '7'],
      [8, '8'],
    ];
    const fetchItem: [number, string] = [9999, '9999'];

    let tree = TAaTree.new('number');
    for (const [k, v] of putItems) {
      tree = TAaTree.putNew(tree, k, v);
    }

    const fetching = () => TAaTree.fetchUnsafe(tree, fetchItem[0]);

    expect(fetching).toThrowError();
  });
});
