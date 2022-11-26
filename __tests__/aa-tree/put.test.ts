import {TAaTree} from '../../src/aa-tree';
import {AaTreeNode} from '../../src/aa-tree-note';

describe('TAaTree.put', (): void => {
  test('tree is correct when put with num key', (): void => {
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
      tree = TAaTree.put(tree, k, v);
    }

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
    expect(tree.size).toBe(items.length);
  });

  test('update item if already exists', (): void => {
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
      tree = TAaTree.put(tree, k, v);
    }

    const updateItem: [number, string] = [7, 'UPDATED_VALUE'];
    tree = TAaTree.put(tree, updateItem[0], updateItem[1]);

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
          value: updateItem[1],
          level: 1,
        },
      },
    };

    expect(expectedTopNode).toEqual(tree.root);
    expect(tree.size).toBe(items.length);
  });

  test('tree is correct when put with str key', (): void => {
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
      tree = TAaTree.put(tree, k, v);
    }

    const expectedTopNode: AaTreeNode<string, string> = {
      key: '4',
      value: '4',
      level: 3,
      left: {
        key: '2',
        value: '2',
        level: 2,
        left: {
          key: '1',
          value: '1',
          level: 1,
        },
        right: {
          key: '3',
          value: '3',
          level: 1,
        },
      },
      right: {
        key: '6',
        value: '6',
        level: 2,
        left: {
          key: '5',
          value: '5',
          level: 1,
        },
        right: {
          key: '7',
          value: '7',
          level: 1,
        },
      },
    };

    expect(expectedTopNode).toEqual(tree.root);
    expect(tree.size).toBe(items.length);
  });
});
