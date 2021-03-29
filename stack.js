class Node {
  constructor(value){
      this.value = value;
      this.next = null;
  }

}

class Stack {
  constructor(){
      this.top = null;
      this.head = null;
      this.length = 0;
  }

  push(value){
      if(!this.head){
          const newNode = new Node(value);
          this.head = newNode;
          this.top = newNode;
          this.length++;
      } else {
          const newNode = new Node(value);
          const prevTop = this.top;
          this.top = newNode;
          newNode.next = prevTop;
          this.length++;
      }
      return this.size()
  }

  pop(){
      if(!this.head){
          return null
      } else if(this.size() === 1){
          const removeHead = this.head;
          this.head = null;
          this.top = null;
          this.length--;
          return removeHead.value;
      } else {
          const removeTop = this.top;
          const value = removeTop.value
          this.top = removeTop.next;
          this.length--;
          return value
      }
  }

  size(){
      return this.length
  }
}
