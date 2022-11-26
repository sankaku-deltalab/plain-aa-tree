import {AaTreeNode} from '../aa-tree-note';

export class Iter {
  static iter<K, V>(
    top: AaTreeNode<K, V> | undefined,
    mutableResult: [K, V][]
  ): void {
    if (top === undefined) return;
    if (top.left) Iter.iter(top.left, mutableResult);
    mutableResult.push([top.key, top.value]);
    if (top.right) Iter.iter(top.right, mutableResult);
  }
}
