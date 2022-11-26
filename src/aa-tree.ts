import {AaTreeNode, NodeMethods} from './aa-tree-note';
import {Fetch} from './note-functions/fetch';
import {pop} from './note-functions/pop';
import {put, putResults} from './note-functions/put';

export type AaTree<K, V> = {
  readonly root?: AaTreeNode<K, V>;
  readonly size: number;
};

export class TAaTree {
  static new<K, V>(): AaTree<K, V> {
    return {size: 0};
  }

  static size<K, V>(tree: AaTree<K, V>): number {
    return tree.size;
  }

  static fetchUnsafe<K, V>(
    tree: AaTree<K, V>,
    key: K,
    methods: NodeMethods<K>
  ): V {
    const node = Fetch.fetch(tree.root, {key, methods});
    if (node === undefined) throw new Error(`key <${key}> was not found`);
    return node.value;
  }

  static fetch<K, V, Default>(
    tree: AaTree<K, V>,
    key: K,
    def: Default,
    methods: NodeMethods<K>
  ): V | Default {
    const node = Fetch.fetch(tree.root, {key, methods});
    if (node === undefined) return def;
    return node.value;
  }

  static put<K, V>(
    tree: AaTree<K, V>,
    key: K,
    value: V,
    methods: NodeMethods<K>
  ): AaTree<K, V> {
    const [putResult, newRoot] = put(tree.root, {
      key,
      value,
      onlyNew: false,
      methods,
    });
    const sizeDiff = putResult === putResults.added ? 1 : 0;

    return {
      root: newRoot,
      size: tree.size + sizeDiff,
    };
  }

  static putNew<K, V>(
    tree: AaTree<K, V>,
    key: K,
    value: V,
    methods: NodeMethods<K>
  ): AaTree<K, V> {
    const [putResult, newRoot] = put(tree.root, {
      key,
      value,
      onlyNew: true,
      methods,
    });
    const sizeDiff = putResult === putResults.added ? 1 : 0;

    return {
      root: newRoot,
      size: tree.size + sizeDiff,
    };
  }

  static delete<K, V>(
    tree: AaTree<K, V>,
    key: K,
    methods: NodeMethods<K>
  ): AaTree<K, V> {
    const {top, removed} = pop(tree.root, {
      key,
      methods,
    });
    const sizeDiff = removed === undefined ? -1 : 0;

    return {
      root: top,
      size: tree.size + sizeDiff,
    };
  }

  static pop<K, V, Default>(
    tree: AaTree<K, V>,
    key: K,
    def: Default,
    methods: NodeMethods<K>
  ): {tree: AaTree<K, V>; removed: V | Default} {
    const {top, removed} = pop(tree.root, {
      key,
      methods,
    });
    const sizeDiff = removed === undefined ? -1 : 0;

    const newTree = {
      root: top,
      size: tree.size + sizeDiff,
    };
    return {
      tree: newTree,
      removed: removed === undefined ? def : removed.value,
    };
  }
}
