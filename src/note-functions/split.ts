import {AaTreeNode} from '../aa-tree-note';

export class Split {
  static split(top: undefined): undefined;
  static split<K, V>(top: AaTreeNode<K, V>): AaTreeNode<K, V>;
  static split<K, V>(
    top: AaTreeNode<K, V> | undefined
  ): AaTreeNode<K, V> | undefined;

  static split<K, V>(
    top: AaTreeNode<K, V> | undefined
  ): AaTreeNode<K, V> | undefined {
    if (top === undefined) return top;
    const right = top.right;
    if (right === undefined || right.right === undefined) return top;
    if (top.level === right.right.level) {
      const newLeft: AaTreeNode<K, V> = {
        ...top,
        right: top.left,
      };
      const newTop: AaTreeNode<K, V> = {
        ...right,
        left: newLeft,
        level: right.level + 1,
      };
      return newTop;
    }

    return top;
  }
}
