import {AaTreeNode, NodeMethods} from './aa-tree-note';
import {Fetch} from './note-functions/fetch';
import {pop} from './note-functions/pop';
import {put, putResults} from './note-functions/put';

export type TreeKeyType = 'number' | 'string';

export type KeyType<Type extends TreeKeyType> = Type extends 'number'
  ? number
  : string;

export type AaTree<Type extends TreeKeyType, K extends KeyType<Type>, V> = {
  readonly type: Type;
  readonly root?: AaTreeNode<K, V>;
  readonly size: number;
};

export class TAaTree {
  static nodeMethodsForNumber: NodeMethods<number> = {
    compareKey: (keyA, keyB) => keyB - keyA,
  };
  static nodeMethodsForString: NodeMethods<string> = {
    compareKey: (keyA, keyB) => keyA.localeCompare(keyB),
  };

  static new<Type extends TreeKeyType, K extends KeyType<Type>, V>(
    type: Type
  ): AaTree<Type, K, V> {
    return {type, size: 0};
  }

  private static getMethods<
    Type extends TreeKeyType,
    K extends KeyType<Type>,
    V
  >(tree: AaTree<Type, K, V>): NodeMethods<K> {
    if (tree.type === 'number')
      return TAaTree.nodeMethodsForNumber as NodeMethods<K>;
    return TAaTree.nodeMethodsForString as NodeMethods<K>;
  }

  static size<Type extends TreeKeyType, K extends KeyType<Type>, V>(
    tree: AaTree<Type, K, V>
  ): number {
    return tree.size;
  }

  static fetchUnsafe<Type extends TreeKeyType, K extends KeyType<Type>, V>(
    tree: AaTree<Type, K, V>,
    key: K
  ): V {
    const methods = TAaTree.getMethods(tree);
    const node = Fetch.fetch(tree.root, {key, methods});
    if (node === undefined) throw new Error(`key <${key}> was not found`);
    return node.value;
  }

  static fetch<Type extends TreeKeyType, K extends KeyType<Type>, V, Default>(
    tree: AaTree<Type, K, V>,
    key: K,
    def: Default
  ): V | Default {
    const methods = TAaTree.getMethods(tree);
    const node = Fetch.fetch(tree.root, {key, methods});
    if (node === undefined) return def;
    return node.value;
  }

  static put<Type extends TreeKeyType, K extends KeyType<Type>, V>(
    tree: AaTree<Type, K, V>,
    key: K,
    value: V
  ): AaTree<Type, K, V> {
    const methods = TAaTree.getMethods(tree);
    const [putResult, newRoot] = put(tree.root, {
      key,
      value,
      onlyNew: false,
      methods,
    });
    const sizeDiff = putResult === putResults.added ? 1 : 0;

    return {
      ...tree,
      root: newRoot,
      size: tree.size + sizeDiff,
    };
  }

  static putNew<Type extends TreeKeyType, K extends KeyType<Type>, V>(
    tree: AaTree<Type, K, V>,
    key: K,
    value: V
  ): AaTree<Type, K, V> {
    const methods = TAaTree.getMethods(tree);
    const [putResult, newRoot] = put(tree.root, {
      key,
      value,
      onlyNew: true,
      methods,
    });
    const sizeDiff = putResult === putResults.added ? 1 : 0;

    return {
      ...tree,
      root: newRoot,
      size: tree.size + sizeDiff,
    };
  }

  static delete<Type extends TreeKeyType, K extends KeyType<Type>, V>(
    tree: AaTree<Type, K, V>,
    key: K
  ): AaTree<Type, K, V> {
    const methods = TAaTree.getMethods(tree);
    const {top, removed} = pop(tree.root, {
      key,
      methods,
    });
    const sizeDiff = removed === undefined ? -1 : 0;

    return {
      ...tree,
      root: top,
      size: tree.size + sizeDiff,
    };
  }

  static pop<Type extends TreeKeyType, K extends KeyType<Type>, V, Default>(
    tree: AaTree<Type, K, V>,
    key: K,
    def: Default
  ): {tree: AaTree<Type, K, V>; removed: V | Default} {
    const methods = TAaTree.getMethods(tree);
    const {top, removed} = pop(tree.root, {
      key,
      methods,
    });
    const sizeDiff = removed === undefined ? -1 : 0;

    const newTree: AaTree<Type, K, V> = {
      ...tree,
      root: top,
      size: tree.size + sizeDiff,
    };
    return {
      tree: newTree,
      removed: removed === undefined ? def : removed.value,
    };
  }
}
