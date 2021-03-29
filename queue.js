class Node {
  constructor(value){
    this.next = null;
    this.value = value;
  }
}

class Queue {
  constructor(){
    this.front = null;
    this.back = null;
    this.length = 0;
  }

  enqueue(value){
    if(!this.front){
      const newNode = new Node(value);
      this.front = newNode;
      this.back = newNode;
      this.length++
    } else {
      const newNode = new Node(value);
      const prevBack = this.back;
      this.back = newNode;
      prevBack.next = newNode;
      this.length++;
    }

    return this.size();
  }


  dequeue(){
    if(!this.front){
      return null;
    } else if(this.size() === 1){
      const removeFront = this.front;
      this.front = null;
      this.back = null;
      this.length--;
      return removeFront.value;
    } else {
      const newFront = this.front.next;
      const removeFront = this.front;
      this.front = newFront;
      this.length--;
      return removeFront.value;
    }
  }

  size(){
    return this.length
  }

}
