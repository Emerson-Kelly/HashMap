export default class Node{
    constructor(key, value = null, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}