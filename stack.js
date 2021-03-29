class Node{
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class Stack{
  constructor(){
    this.top = null;
    this.length = 0;
  }

  push(value){
    if(!this.top){
      const newNode = new Node(value)
      this.top = newNode;
      this.length++;
    } else {
      const newNode = newNode(value)
      const prevTop = this.top;
      this.top = newNode;
      prevTop.next = newNode;
      this.length++;
    }
  }

  pop(){
    if(!this.top){
      return -1
    }
    else if(this.size() === 1){

    } else {
      
    }
  }

  size(){
    return this.length
  }
}
