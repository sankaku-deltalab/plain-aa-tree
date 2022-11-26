import {AaTreeNode, NodeMethods} from '../aa-tree-note';
import {DecreaseLevel} from './decrease_level';
import {GetPredecessor} from './get-predecessor';
import {GetSuccessor} from './get-successor';
import {Skew} from './skew';
import {Split} from './split';

export type PopResult<K, V> = {
  top: AaTreeNode<K, V> | undefined;
  removed: AaTreeNode<K, V> | undefined;
};

export const pop = <K, V>(
  top: AaTreeNode<K, V> | undefined,
  opt: {key: K; methods: NodeMethods<K>}
): PopResult<K, V> => {
  const {key, methods} = opt;

  if (top === undefined) return {top, removed: undefined};

  const compare = methods.compareKey(key, top.key);
  let newTop: AaTreeNode<K, V> = top;
  let removed: AaTreeNode<K, V> | undefined = undefined;
  if (compare < 0) {
    const {top: newLeft, removed: rem} = pop(top.left, opt);
    newTop = {
      ...top,
      left: newLeft,
    };
    removed = rem;
  } else if (compare > 0) {
    const {top: newRight, removed: rem} = pop(top.right, opt);
    newTop = {
      ...top,
      right: newRight,
    };
    removed = rem;
  } else if (compare === 0) {
    // pop top because top is leaf
    if (top.left === undefined && top.right === undefined) {
      return {
        top: undefined,
        removed: top,
      };
    } else if (top.right !== undefined) {
      const successor = GetSuccessor.getSuccessor(top.right);
      const newRight = pop(top.right, {...opt, key: top.key}).top;
      newTop = {
        ...top,
        right: newRight,
        key: successor.key,
        value: successor.value,
      };
      removed = top;
    } else if (top.left !== undefined) {
      const predecessor = GetPredecessor.getPredecessor(top.left);
      const newLeft = pop(top.left, {...opt, key: top.key}).top;
      newTop = {
        ...top,
        left: newLeft,
        key: predecessor.key,
        value: predecessor.value,
      };
      removed = top;
    }
  }

  if (removed === undefined) {
    return {
      top,
      removed,
    };
  }

  newTop = DecreaseLevel.decreaseLevel(newTop);
  newTop = Skew.skew(newTop);

  newTop = {
    ...newTop,
    right: Skew.skew(newTop.right),
  };

  if (newTop.right !== undefined) {
    let newRight = newTop.right;
    const newRightRight = Skew.skew(newRight.right);
    newRight = {
      ...newRight,
      right: newRightRight,
    };
    newTop = {
      ...newTop,
      right: newRight,
    };
  }
  newTop = Split.split(newTop);
  newTop = {
    ...newTop,
    right: Split.split(newTop.right),
  };

  return {top: newTop, removed};
};
