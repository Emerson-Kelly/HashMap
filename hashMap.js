import Node from "./node.js";

export default class HashMap {
  constructor() {
    this.bucketsArray = new Array(16).fill(null);
    this.loadFactor = 0.75;
    this.capacity = this.bucketsArray.length;
    this.occupied = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  resize() {
    const oldArray = this.bucketsArray;
    this.capacity *= 2;
    this.bucketsArray = new Array(this.capacity).fill(null);
    this.occupied = 0;

    oldArray.forEach((bucket) => {
      let current = bucket;
      while (current !== null) {
        this.set(current.key, current.value);
        current = current.next;
      }
    });
  }

  set(key, value) {
    const newNode = new Node(key, value);
    const index = this.hash(key);
    const bucket = this.bucketsArray[index];

    if (bucket === null) {
      this.bucketsArray[index] = newNode;
      this.occupied += 1;
    } else {
      let currentNode = bucket;
      while (currentNode !== null) {
        if (currentNode.key == key) {
          currentNode.value = value;
          return;
        }
        if (currentNode.next === null) {
          currentNode.next = newNode;
          this.occupied += 1;
          break;
        }
        currentNode = currentNode.next;
      }
    }

    if (this.occupied / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const bucket = this.hash(key);
    let current = this.bucketsArray[bucket];
    while (current !== null && current.key !== key) {
      current = current.next;
    }
    if (current === null) {
      return null;
    }
    console.log(current.value);
    return current.value;
  }

  has(key) {
    const bucket = this.hash(key);
    let current = this.bucketsArray[bucket];
    while (current !== null) {
      if (current.key === key) {
        console.log("true");
        return true;
      }
      current = current.next;
    }
    console.log("false");
    return false;
  }

  remove(key) {
    const bucket = this.hash(key);
    let current = this.bucketsArray[bucket];
    let previous = null;

    while (current !== null && current.key !== key) {
      previous = current;
      current = current.next;
      console.log("while loop working");
    }

    if (current === null) {
      return;
    }
    if (previous === null) {
      this.bucketsArray[bucket] = current.next;
    } else {
      previous.next = current.next;
    }

    this.occupied -= 1;

    current.next = null;
  }

  length() {
    let counter = 0;
    this.bucketsArray.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        counter += 1;
        while (current.next !== null) {
          counter += 1;
          current = current.next;
        }
      }
    });
    console.log(counter);
    return counter;
  }

  clear() {
    this.bucketsArray = new Array(16).fill(null);
    this.occupied = 0;
  }

  keys() {
    const keysArray = [];
    this.bucketsArray.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        keysArray.push(current.key);

        while (current.next !== null) {
          current = current.next;
          keysArray.push(current.key);
        }
      }
    });
    console.log(keysArray);
    return keysArray;
  }

  values() {
    const valuesArray = [];
    this.bucketsArray.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        valuesArray.push(current.value);
        while (current.next !== null) {
          current = current.next;
          valuesArray.push(current.value);
        }
      }
    });
    console.log(valuesArray);
    return valuesArray;
  }

  entries() {
    const entriesArray = [];
    this.bucketsArray.forEach((bucket) => {
      let current = bucket;
      if (bucket !== null) {
        entriesArray.push([current.key, current.value]);
        while (current.next !== null) {
          current = current.next;
          entriesArray.push([current.key, current.value]);
        }
      }
    });
    console.log(entriesArray);
    return entriesArray;
  }
}
