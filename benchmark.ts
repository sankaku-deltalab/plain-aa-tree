import {TAaTree} from './src';
import {Map} from 'immutable';

// const itemCount = 50000;
// const itemCount = 5000;
const itemCount = 500;
const items = new Array(itemCount)
  .fill(0)
  .map((_, i) => ({key: `${i}`, value: i}));

interface Measurement {
  measureAddTime(): number;
  measureFetchTime(): number;
  measureDeleteTime(): number;
}

class RecordMeasurement implements Measurement {
  measureAddTime(): number {
    let map: Record<string, number | undefined> = {};
    const start = Date.now();
    for (const item of items) {
      map = {
        ...map,
        [item.key]: item.value,
      };
    }
    const end = Date.now();
    return end - start;
  }

  measureFetchTime(): number {
    let map: Record<string, number | undefined> = {};
    for (const item of items) {
      map = {
        ...map,
        [item.key]: item.value,
      };
    }
    const start = Date.now();
    for (const item of items) {
      const _ = map[item.key];
    }
    const end = Date.now();
    return end - start;
  }

  measureDeleteTime(): number {
    let map: Record<string, number | undefined> = {};
    for (const item of items) {
      map = {
        ...map,
        [item.key]: item.value,
      };
    }
    const start = Date.now();
    for (const item of items) {
      map = {
        ...map,
        [item.key]: undefined,
      };
    }
    const end = Date.now();
    return end - start;
  }
}

class AaTreeMeasurement implements Measurement {
  measureAddTime(): number {
    let tree = TAaTree.new('string');
    const start = Date.now();
    for (const item of items) {
      tree = TAaTree.put(tree, item.key, item.value);
    }
    const end = Date.now();
    return end - start;
  }

  measureFetchTime(): number {
    let tree = TAaTree.new('string');
    for (const item of items) {
      tree = TAaTree.put(tree, item.key, item.value);
    }
    const start = Date.now();
    for (const item of items) {
      const _ = TAaTree.fetchUnsafe(tree, item.key);
    }
    const end = Date.now();
    return end - start;
  }

  measureDeleteTime(): number {
    let tree = TAaTree.new('string');
    for (const item of items) {
      tree = TAaTree.put(tree, item.key, item.value);
    }
    const start = Date.now();
    for (const item of items) {
      tree = TAaTree.delete(tree, item.key);
    }
    const end = Date.now();
    return end - start;
  }
}

class MapMeasurement implements Measurement {
  measureAddTime(): number {
    let map = Map();
    const start = Date.now();
    for (const item of items) {
      map = map.set(item.key, item.value);
    }
    const end = Date.now();
    return end - start;
  }

  measureFetchTime(): number {
    let map = Map();
    for (const item of items) {
      map = map.set(item.key, item.value);
    }
    const start = Date.now();
    for (const item of items) {
      const _ = map.get(item.key);
    }
    const end = Date.now();
    return end - start;
  }

  measureDeleteTime(): number {
    let map = Map();
    for (const item of items) {
      map = map.set(item.key, item.value);
    }
    const start = Date.now();
    for (const item of items) {
      map = map.delete(item.key);
    }
    const end = Date.now();
    return end - start;
  }
}

const measureAndShow = (name: string, m: Measurement): void => {
  console.log(`${name} --------`);
  const addTime = m.measureAddTime();
  console.log(`add: ${addTime} ms`);
  const fetchTime = m.measureFetchTime();
  console.log(`fetch: ${fetchTime} ms`);
  const deleteTime = m.measureDeleteTime();
  console.log(`delete: ${deleteTime} ms`);
};

const tm = {name: 'aatree', measure: new AaTreeMeasurement()};
const rm = {name: 'builtin record', measure: new RecordMeasurement()};
const mm = {name: 'immutable.js Map', measure: new MapMeasurement()};

console.log(`items: ${itemCount}`);
for (const {name, measure} of [tm, rm, mm]) {
  measureAndShow(name, measure);
}
