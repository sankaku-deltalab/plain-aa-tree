import {AaTreeNode} from '../aa-tree-node';

export class GetPredecessor {
  static getPredecessor<K, V>(leftOfTop: AaTreeNode<K, V>): AaTreeNode<K, V> {
    return GetPredecessor.getLargest(leftOfTop);
  }

  private static getLargest<K, V>(top: AaTreeNode<K, V>): AaTreeNode<K, V> {
    let current = top;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (current.right === undefined) return current;
      current = current.right;
    }
  }
}
