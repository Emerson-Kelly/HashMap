#!/usr/bin/env node

import HashMap from "./hashMap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

const displayHashMap = (hashMap) => {
  const tableData = [];

  hashMap.bucketsArray.forEach((bucket, index) => {
    let current = bucket;
    if (current === null) {
      tableData.push({ Index: index, Key: null, Value: null });
    } else {
      while (current !== null) {
        tableData.push({
          Index: index,
          Key: current.key,
          Value: current.value,
        });
        current = current.next;
      }
    }
  });

  console.table(tableData);
};

displayHashMap(test);
