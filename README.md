# Immutable AA tree

[AA Tree](https://en.wikipedia.org/wiki/AA_tree) as immutable, json-serializable and usable on Redux state (^_^).

API is referenced [Elixir's Map](https://hexdocs.pm/elixir/1.12/Map.html).

## Install

```bash
npm install plain-aa-tree
```

## Usage

```typescript
import {AaTree, TAaTree} from 'plain-aa-tree';

type Key = string;
type Value = {val: number};
let tree: AaTree<'string', Key, Value> = TAaTree.new('string');

// When key is number, use following lines instead of above line.
// type Key = string;
// type Value = {val: number};
// let tree: AaTree<'number', Key, Value> = TAaTree.new('number');

// add, update
tree = TAaTree.put(tree, 'key_1', {val: 10}); // add key_1
tree = TAaTree.put(tree, 'key_1', {val: 1}); // update key_1
tree = TAaTree.putNew(tree, 'key_2', {val: 2}); // add key_2
tree = TAaTree.putNew(tree, 'key_2', {val: 20}); // do nothing

// fetch
const f1 = TAaTree.fetchUnsafe(tree, 'key_1'); // {val: 1}
const f2 = TAaTree.fetchUnsafe(tree, 'key_not_exists'); // throw error
const f3 = TAaTree.fetch(tree, 'key_not_exists', {val: 9999}); // {val: 9999}

// remove
const {tree: updatedTree1, removed1} = TAaTree.pop(tree, 'key_1', {val: 9999}); // remove key_1 and get {val: 1}
tree = updatedTree1;
const {tree: updatedTree2, removed2} = TAaTree.pop(tree, 'key_not_exists', {val: 9999,}); // tree is not changed and get {val: 9999}
tree = updatedTree2;
tree = TAaTree.delete(tree, 'key_2'); // remove key_2
tree = TAaTree.delete(tree, 'key_not_exists'); // do nothing

// JSON serializable
const treeJson = JSON.stringify(tree);
tree = JSON.parse(treeJson);
```