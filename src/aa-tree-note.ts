export type AaTreeNode<K, V> = {
  readonly key: K;
  readonly value: V;
  readonly left?: AaTreeNode<K, V>;
  readonly right?: AaTreeNode<K, V>;
  readonly level: number;
};

export type NodeMethods<K> = {
  compareKey: (keyA: K, keyB: K) => number;
  equalKey: (keyA: K, keyB: K) => boolean;
};
