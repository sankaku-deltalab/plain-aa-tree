import {AaTreeNode} from '../aa-tree-node';

export class GetSuccessor {
  static getSuccessor<K, V>(rightOfTop: AaTreeNode<K, V>): AaTreeNode<K, V> {
    return GetSuccessor.getSmallest(rightOfTop);
  }

  private static getSmallest<K, V>(top: AaTreeNode<K, V>): AaTreeNode<K, V> {
    let current = top;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (current.left === undefined) return current;
      current = current.left;
    }
  }
}
