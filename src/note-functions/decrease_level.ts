import {AaTreeNode} from '../aa-tree-node';

export class DecreaseLevel {
  static decreaseLevel<K, V>(top: AaTreeNode<K, V>): AaTreeNode<K, V> {
    const leftLevel = top.left?.level ?? 0;
    const rightLevel = top.right?.level ?? 0;
    const shouldBe = Math.min(leftLevel, rightLevel) + 1;

    if (shouldBe <= top.level) return top;

    return {
      ...top,
      level: shouldBe,
      right: DecreaseLevel.decreasedRight(top.right, shouldBe),
    };
  }

  private static decreasedRight<K, V>(
    rightOfTop: AaTreeNode<K, V> | undefined,
    shouldBe: number
  ): AaTreeNode<K, V> | undefined {
    if (rightOfTop === undefined) return undefined;

    if (shouldBe <= rightOfTop.level) {
      return {
        ...rightOfTop,
        level: shouldBe,
      };
    }
    return rightOfTop;
  }
}
