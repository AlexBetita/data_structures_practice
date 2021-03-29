class LinkedList {
  constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
  }

  // TODO: Implement the addToTail method here
  addToTail(value) {
      if(!this.tail){
          const newNode = new Node(value);
          this.head = newNode;
          this.tail = newNode;
          this.length++;
      } else {
          const newNode = new Node(value);
          const prevTail = this.tail;
          prevTail.next = newNode;
          this.tail = newNode;
          this.length++;
      }
      return this;
  }

  // TODO: Implement the removeTail method here
  removeTail() {
      if(!this.tail){
          return undefined;
      } else if(this.size() === 1){
          const removeTail = this.tail;
          this.head = null;
          this.tail = null;
          this.length--;
          return removeTail;
      } else {
          let currentNode = this.head;
          for(let i = 0; i < this.size() -1; i++){
              if(currentNode.next.next !== null){
                  currentNode = currentNode.next;
              }
          }
          const removeTail = this.tail;
          this.tail = currentNode;
          this.tail.next = null;
          this.length--;
          return removeTail;
      }
  }

  // TODO: Implement the addToHead method here
  addToHead(value) {
      if(!this.head){
          const newNode = new Node(value);
          this.head = newNode;
          this.tail = newNode;
          this.length++;
      } else {
          const newNode = new Node(value);
          const prevHead = this.head;
          this.head = newNode;
          this.head.next = prevHead;
          this.length++;
      }
      return this;
  }

  // TODO: Implement the removeHead method here
  removeHead() {
      if(!this.head){
          return undefined;
      } else if(this.size() === 1){
          const removeHead = this.head;
          this.head = null;
          this.tail = null;
          this.length--;
          return removeHead;
      } else {
          const removeHead = this.head;
          const newHead = this.head.next;
          this.head = newHead;
          this.length--;
          return removeHead;
      }
  }

  // TODO: Implement the contains method here
  contains(target) {
      if(!this.head) return -1
      else if(this.size() === 1){
          return target === this.head.value ? true : false
      } else {
          let currentNode = this.head;
          for(let i = 0; i < this.size(); i++){
              if(currentNode.value === target) return true
              currentNode = currentNode.next;
          }
          return false;
      }
  }

  // TODO: Implement the get method here
  get(index) {
      if(index > this.size() - 1 || index < 0) return null
      else if(index === 0) return this.head;
      else{
          let currentNode = this.head;
          let counter = 0;
          for(let i = 0; i <= index; i++){
              currentNode = currentNode.next;
              if(counter === index - 1) return currentNode
              counter++;
          }
          return null;
      }
  }

  // TODO: Implement the set method here
  set(index, value) {
      if(index > this.size() -1 || index < 0) return false
      else if(index === 0){
          this.head.value = value;
          return true;
      } else {
          let currentNode = this.head;
          let counter = 0;
          for(let i = 0; i <= index; i++){
              currentNode = currentNode.next;
              if(counter === index - 1){
                  currentNode.value = value;
                  return true
              }
              counter++;
          }
          return true;
      }
  }

  // TODO: Implement the insert method here
  insert(index, value) {
      if(index > this.size() -1 || index < 0) return false
      else if(index === 0){
          if(!this.head){
              return false
          }
          const insertNode = new Node(value);
          const prevHead = this.head;
          this.head = insertNode;
          this.head.next = prevHead;
          this.length++;
          return true;
      }
      else {
          let currentNode = this.head;
          let counter = 0;
          for(let i = 0; i <= index; i++){
              currentNode = currentNode.next;
              if(counter === index -2 || index === 1){
                  const insertNode = new Node(value);
                  const prevNode = currentNode;
                  const nextNode = currentNode.next;
                  prevNode.next = insertNode;
                  insertNode.next = nextNode;
                  this.length++;
                  return true;
              }
              counter++
          }
      }
  }

  // TODO: Implement the remove method here
  remove(index) {
      if(index > this.size()) return undefined
      else if(index === 0){
          const removeNode = this.head;
          this.head = null;
          this.tail = null;
          this.length--;
          return removeNode;
      } else if(this.size() > 1){
          let currentNode = this.head;
          if(index > this.size()){
              return undefined
          }
          for(let i = 0; i <= index - 2; i++){
              currentNode = currentNode.next;
          }
          const removeNode = currentNode.next;
          const prevNode = currentNode;
          const nextNode = removeNode.next;
          prevNode.next = nextNode;
          this.length--;
          return removeNode;
      }
      return undefined
  }

  // TODO: Implement the size method here
  size() {
      return this.length
  }
}
