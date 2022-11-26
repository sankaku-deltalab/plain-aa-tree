import {AaTreeNode, NodeMethods} from '../aa-tree-note';
import {Skew} from './skew';
import {Split} from './split';

type PutResults = {
  added: 1;
  updated: 2;
  nop: 3;
};

export type PutResultType = PutResults[keyof PutResults];

export const putResults: PutResults = {
  added: 1,
  updated: 2,
  nop: 3,
};

export const put = <K, V>(
  top: AaTreeNode<K, V> | undefined,
  opt: {key: K; value: V; onlyNew: boolean; methods: NodeMethods<K>}
): [PutResultType, AaTreeNode<K, V>] => {
  const {key, value, onlyNew, methods} = opt;

  if (top === undefined) {
    return [
      putResults.added,
      {
        key,
        value,
        level: 1,
      },
    ];
  }

  const compare = methods.compareKey(key, top.key);
  let putResult: PutResultType = putResults.nop;
  let newTop: AaTreeNode<K, V> = top;
  if (compare === 0) {
    if (onlyNew) return [putResults.nop, top];
    return [
      putResults.updated,
      {
        ...top,
        value,
      },
    ];
  }
  if (compare < 0) {
    const [r, newLeft] = put(top.left, opt);
    putResult = r;
    newTop = {
      ...top,
      left: newLeft,
    };
  } else if (compare > 0) {
    const [r, newRight] = put(top.right, opt);
    putResult = r;
    newTop = {
      ...top,
      right: newRight,
    };
  }

  if (putResult === putResults.added) {
    newTop = Skew.skew(newTop);
    newTop = Split.split(newTop);
  }
  return [putResult, newTop];
};
