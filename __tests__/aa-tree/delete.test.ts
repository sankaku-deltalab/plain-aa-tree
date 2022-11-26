import {TAaTree} from '../../src/aa-tree';
import {AaTreeNode} from '../../src/aa-tree-node';

describe('TAaTree.delete', (): void => {
  test('delete item in tree', (): void => {
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
    const deleteItem: [number, string] = [8, '8'];

    let tree = TAaTree.new('number');
    for (const [k, v] of putItems) {
      tree = TAaTree.putNew(tree, k, v);
    }
    tree = TAaTree.delete(tree, deleteItem[0]);

    const expectedTopNode: AaTreeNode<number, string> = {
      key: 4,
      value: '4',
      level: 3,
      left: {
        key: 2,
        value: '2',
        level: 2,
        left: {
          key: 1,
          value: '1',
          level: 1,
        },
        right: {
          key: 3,
          value: '3',
          level: 1,
        },
      },
      right: {
        key: 6,
        value: '6',
        level: 2,
        left: {
          key: 5,
          value: '5',
          level: 1,
        },
        right: {
          key: 7,
          value: '7',
          level: 1,
        },
      },
    };

    expect(expectedTopNode).toEqual(tree.root);
    expect(tree.size).toBe(putItems.length - 1);
  });

  test('do nothing if item is not in tree', (): void => {
    const putItems: [number, string][] = [
      [1, '1'],
      [2, '2'],
      [3, '3'],
      [4, '4'],
      [5, '5'],
      [6, '6'],
      [7, '7'],
    ];
    const deleteItem: [number, string] = [9999, '9999'];

    let tree = TAaTree.new('number');
    for (const [k, v] of putItems) {
      tree = TAaTree.putNew(tree, k, v);
    }
    tree = TAaTree.delete(tree, deleteItem[0]);

    const expectedTopNode: AaTreeNode<number, string> = {
      key: 4,
      value: '4',
      level: 3,
      left: {
        key: 2,
        value: '2',
        level: 2,
        left: {
          key: 1,
          value: '1',
          level: 1,
        },
        right: {
          key: 3,
          value: '3',
          level: 1,
        },
      },
      right: {
        key: 6,
        value: '6',
        level: 2,
        left: {
          key: 5,
          value: '5',
          level: 1,
        },
        right: {
          key: 7,
          value: '7',
          level: 1,
        },
      },
    };

    expect(expectedTopNode).toEqual(tree.root);
    expect(tree.size).toBe(putItems.length);
  });
});
