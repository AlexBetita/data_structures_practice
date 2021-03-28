/**
 * @param {number} capacity
*/

/*
  First solution for map_ cache data structure using map
  Runtime: 184 ms, faster than 91.47% of JavaScript online submissions for LRU Cache.
  Memory Usage: 51.1 MB, less than 62.94% of JavaScript online submissions for LRU Cache.
*/

/*-------------------**************----------------------
  comments: Initially Tried Array's with Objects but was too slow
            exceeding the time limit
  problem: make a simple LRU(least recently used) cache
  used: built in map data structure in javascript
  reason: map is an ordered object easy to implement FIFO
  space complexity: O(n) only creates key, value pairs up to n
  time complexity: put O(1) and get O(1)
  remarks: was really interesting to learn and research all about the
           Map object and it's different methods.
           One thing note is that when finding values or keys it actually returns
           an iterator object with that being said
           iterating over an iterator is said to
           consume the iterator, because it is generally only possible to do once
           thus allowing for less memory usage.
           Could be faster with a DLL(doubly linked list) I think
           >Debunked< this is much faster than DLL with Hashing
           with same memory efficiency
---------------------**************----------------------*/

 var LRUCache = function(capacity) {
  if(capacity > 3000){
      return
  }
  this.capacity = capacity
  this.map_ = new Map();
};

/**
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {

  if(this.map_.get(key) !== undefined){
      let value = this.map_.get(key)
      this.map_.delete(key);
      this.map_.set(key, value);
  }

  return this.map_.get(key) !== undefined ? this.map_.get(key) : -1
};

/**
* @param {number} key
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if(key > 3000) return
  if(value > (10 ** 4)) return

  this.map_.delete(key)
  this.map_.set(key, value)

  if(this.map_.size > this.capacity){
      let lru = this.map_.keys()
      this.map_.delete(lru.next().value)
  }

};

/*
  Second solution for map_ cache data structure using map
  Runtime: 228 ms, faster than 29.79% of JavaScript online submissions for LRU Cache.
  Memory Usage: 51.6 MB, less than 39.15% of JavaScript online submissions for LRU Cache.
*/

/*-------------------**************----------------------
  comments: Wanted to see if DLL is faster than Javascripts built in map data structure
            problem: make a simple LRU(least recently used) cache
  used: DLL(Doubly Linked List) and hashing
  reason: DLL with Hashing can achieve O(1) get and O(1) put and search O(1)
          through the use of pointers, I use DLL to set up the pointers and hashing to create
          FIFO like structure
  space complexity: O(n) only creates key, value pairs up to n
  time complexity: put O(1) and get O(1)
  remarks: I thought it'd be faster than the Map object for the extra cost of memory
           but it seems that they equally have the same space complexity O(n)
           also this took me 3 hours to debug -_- and I realized one of my object instances
           was taking "value" as a parameter instead of "key"...... cause I initially had
           my Node class take take in value and key, then I realized my hash object can do that for me.
           Forgot to change the parameters rippp...
---------------------**************----------------------*/

class Node{
  constructor(key){
    this.next = null;
    this.previous = null;
    this.key = key;
  }
}
class Dll{
  constructor(capacity){
    this.first = null;
    this.last = null;
    this.length = 0;
    this.hash = {};
    this.capacity = capacity
  }

  put(key, value){
    if(!this.first){
      const newNode = new Node(key);
      this.first = newNode;
      this.last = newNode;
      this.length++;
      this.hash[key] = {'value': value, 'node': newNode}
    }
    else if(this.hash[key]){
      this.changeOrder(key, value)
    }
    else {
      const newNode = new Node(key);
      const prevNode = this.last;
      this.last = newNode
      this.last.previous = prevNode
      prevNode.next = newNode
      this.hash[key] = {'value': value, 'node': newNode}
      this.length++;

      if(this.size() > this.capacity){
        const removeNode = this.first;
        const nextInLine = this.first.next;
        const removeKey = this.first.key;
        this.first = nextInLine
        this.first.previous = null;

        removeNode.next = null;
        delete this.hash[removeKey]
        this.length--
      }
    }
  }

  get(key){
    if(this.hash[key] === undefined) return -1
    this.changeOrder(key)
    return this.hash[key]['value']
  }

  getNode(key){
    if(this.hash[key] === undefined) return -1
    return this.hash[key]['node']
  }

  changeOrder(key, value = null){

    const updatedNode = this.getNode(key)

    if(value){
      updatedNode.key = key;
    } else {
      value = this.hash[key]['value']
    }

    if(this.first === updatedNode && this.length > 1){
      const prevLast = this.last;
      const newFirst = updatedNode.next;

      this.first = newFirst;
      this.first.previous = null;

      prevLast.next = updatedNode;
      this.last = updatedNode;
      this.last.previous = prevLast;
      this.last.next = null;

      this.hash[key] = {'value': value, 'node': updatedNode}

    } else if(this.length === 1 || this.last === updatedNode){

      this.set(key, value)

    } else {
      const newLast = updatedNode
      const prevLast = this.last;
      const newNext = updatedNode.next;
      const newPrev = updatedNode.previous;

      newPrev.next = newNext;
      newNext.previous = newPrev;

      prevLast.next = updatedNode;
      this.last = newLast;
      this.last.next = null;
      this.last.previous = prevLast;

      this.hash[key] = {'value': value, 'node': updatedNode};
    }
  }

  set(key, value){
    const updatedNode = this.getNode(key)
    updatedNode.key = key;
    this.hash[key] = {'value': value, 'node': updatedNode};
  }

  remove(key){
    const removedKey = this.hash[key]['node']

    removedKey.next = null;
    removedKey.previous = null;
    delete this.hash[key]

    this.length--

    return removedKey
  }

  size(){
    return this.length;
  }
}

/*

  Used for submission

*/

// class Node{
//   constructor(key){
//     this.next = null;
//     this.previous = null;
//     this.key = key;
//   }
// }
// var LRUCache = function(capacity) {

//   if(capacity > 3000){
//       return
//   }
//   this.first = null;
//   this.last = null;
//   this.length = 0;
//   this.hash = {};
//   this.capacity = capacity

// }

// LRUCache.prototype.put = function(key, value) {
//   if(key > 3000) return
//   if(value > (10 ** 4)) return

//   if(!this.first){
//     const newNode = new Node(key);
//     this.first = newNode;
//     this.last = newNode;
//     this.length++;

//     this.hash[key] = {'value': value, 'node': newNode}
//   }
//   else if(this.hash[key]){
//     this.changeOrder(key, value)
//   }
//   else {
//     const newNode = new Node(key);
//     const prevNode = this.last;
//     this.last = newNode
//     this.last.previous = prevNode
//     prevNode.next = newNode


//     this.length++;
//     this.hash[key] = {'value': value, 'node': newNode}

//     if(this.size() > this.capacity){
//       const removeNode = this.first;
//       const nextInLine = this.first.next;
//       const removeKey = this.first.key;
//       this.first = nextInLine
//       this.first.previous = null;

//       removeNode.next = null;
//       delete this.hash[removeKey]
//       this.length--
//     }
//   }
// }

// LRUCache.prototype.get = function(key) {
//   if(this.hash[key] === undefined) return -1
//   this.changeOrder(key)
//   return this.hash[key]['value']
// };

// LRUCache.prototype.getNode = function(key){
//   if(this.hash[key] === undefined) return -1
//   return this.hash[key]['node']
// }

// LRUCache.prototype.changeOrder = function(key, value = null){

//   const updatedNode = this.getNode(key)

//   if(value){
//     updatedNode.key = key;
//   } else {
//     value = this.hash[key]['value']
//   }

//   if(this.first === updatedNode && this.length > 1){
//     const prevLast = this.last;
//     const newFirst = updatedNode.next;

//     this.first = newFirst;
//     this.first.previous = null;

//     prevLast.next = updatedNode;
//     this.last = updatedNode;
//     this.last.previous = prevLast;
//     this.last.next = null;

//     this.hash[key] = {'value': value, 'node': updatedNode}

//   } else if(this.length === 1 || this.last === updatedNode){

//     this.set(key, value)

//   } else {
//     const newLast = updatedNode
//     const prevLast = this.last;
//     const newNext = updatedNode.next;
//     const newPrev = updatedNode.previous;

//     newPrev.next = newNext;
//     newNext.previous = newPrev;

//     prevLast.next = updatedNode;
//     this.last = newLast;
//     this.last.next = null;
//     this.last.previous = prevLast;

//     this.hash[key] = {'value': value, 'node': updatedNode};
//   }
// }

// LRUCache.prototype.set = function(key, value){
//   const updatedNode = this.getNode(key)
//   updatedNode.key = key;
//   this.hash[key] = {'value': value, 'node': updatedNode};
// }

// LRUCache.prototype.remove = function(key){
//   const removedKey = this.hash[key]['node']

//   removedKey.next = null;
//   removedKey.previous = null;
//   delete this.hash[key]

//   this.length--

//   return removedKey
// }

// LRUCache.prototype.size = function(){
//   return this.length;
// }
