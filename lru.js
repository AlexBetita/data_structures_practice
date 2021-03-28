/**
 * @param {number} capacity
*/

/*
  First solution for map_ cache data structure using map
  Runtime: 184 ms, faster than 91.47% of JavaScript online submissions for map_ Cache.
  Memory Usage: 51.1 MB, less than 62.94% of JavaScript online submissions for map_ Cache.
*/

/*-------------------**************----------------------
  comments: Initially Tried Array's with Objects but was too slow
  exceeding the time limit
  problem: make a simple LRU(least recently used) cache
  used: built in map data structure in javascript
  reason: map is an ordered object easy to implement FIFO
  remarks: could be faster with a DLL(doubly linked list)
  
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
