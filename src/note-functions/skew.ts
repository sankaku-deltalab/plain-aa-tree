import {AaTreeNode} from '../aa-tree-node';

export class Skew {
  static skew(top: undefined): undefined;
  static skew<K, V>(top: AaTreeNode<K, V>): AaTreeNode<K, V>;
  static skew<K, V>(
    top: AaTreeNode<K, V> | undefined
  ): AaTreeNode<K, V> | undefined;

  static skew<K, V>(
    top: AaTreeNode<K, V> | undefined
  ): AaTreeNode<K, V> | undefined {
    if (top === undefined) return undefined;

    const left = top.left;
    if (left === undefined) return top;
    if (left.level === top.level) {
      const newRight: AaTreeNode<K, V> = {
        ...top,
        left: left.right,
      };
      const newTop: AaTreeNode<K, V> = {
        ...left,
        right: newRight,
      };
      return newTop;
    }

    return top;
  }
}
