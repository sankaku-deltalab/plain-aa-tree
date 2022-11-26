import {TAaTree} from '../../src/aa-tree';

describe('AaTree', (): void => {
  test('is json-serializable if value is serializable', (): void => {
    const putItems: [number, unknown][] = [
      [1, '1'],
      [2, {val: '2'}],
      [3, 3],
      [4, {num: 4}],
      [5, '5'],
      [6, '6'],
      [7, '7'],
      [8, '8'],
    ];

    let tree = TAaTree.new('number');
    for (const [k, v] of putItems) {
      tree = TAaTree.putNew(tree, k, v);
    }

    const treeJson = JSON.stringify(tree);
    const revertedTree = JSON.parse(treeJson);
    expect(revertedTree).toEqual(tree);
  });
});
