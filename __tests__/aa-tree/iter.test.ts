import {TAaTree} from '../../src/aa-tree';

describe('TAaTree.iter', (): void => {
  test('iter added items with num key', (): void => {
    const items: [number, string][] = [
      [1, '1'],
      [2, '2'],
      [3, '3'],
      [4, '4'],
      [5, '5'],
      [6, '6'],
      [7, '7'],
    ];

    let tree = TAaTree.new('number');
    for (const [k, v] of items) {
      tree = TAaTree.putNew(tree, k, v);
    }

    const loadedItems = TAaTree.iter(tree);

    expect(loadedItems).toEqual(items);
  });

  test('iter added items with str key', (): void => {
    const items: [string, string][] = [
      ['1', '1'],
      ['2', '2'],
      ['3', '3'],
      ['4', '4'],
      ['5', '5'],
      ['6', '6'],
      ['7', '7'],
    ];

    let tree = TAaTree.new('string');
    for (const [k, v] of items) {
      tree = TAaTree.putNew(tree, k, v);
    }

    const loadedItems = TAaTree.iter(tree);

    expect(loadedItems).toEqual(items);
  });
});
