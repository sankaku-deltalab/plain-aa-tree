import {AaTreeNode, NodeMethods} from '../aa-tree-node';

export class Fetch {
  static fetch<K, V>(
    top: AaTreeNode<K, V> | undefined,
    opt: {key: K; methods: NodeMethods<K>}
  ): AaTreeNode<K, V> | undefined {
    if (top === undefined) return undefined;
    if (top.key === opt.key) return top;

    const {key, methods} = opt;
    const compare = methods.compareKey(key, top.key);
    if (compare < 0) return Fetch.fetch(top.left, opt);
    return Fetch.fetch(top.right, opt);
  }
}
