import {TAaTree} from '../../src/aa-tree';

describe('TAaTree.size', (): void => {
  test('get items size', (): void => {
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

    let tree = TAaTree.new('number');
    for (const [k, v] of putItems) {
      tree = TAaTree.putNew(tree, k, v);
    }
    expect(TAaTree.size(tree)).toBe(putItems.length);
  });

  test('return 0 if tree is empty', (): void => {
    const tree = TAaTree.new('number');
    expect(TAaTree.size(tree)).toBe(0);
  });
});
