/*

  Pseudo code of a circular buffer

  -starts out empty
  -has a set length
  -assume any element is written in the
   center(exact starting location) not important
  -new elements added follow the first element
  -Circular Buffers use FIFO (First In, First Out) logic
  -if elements === length then buffer is full
  -subsequent elements overwrite the oldest data
  -when data is overwritten elements after are now first in queue
   to be removed
  -can be implemente using 4 pointers or 2 pointers and 2 ints

*/

class Node{
  constructor(value){
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

class CircularBuffer{
  constructor(length){
    this.length = length
    this.start = null;
    this.end = null;
    this.nodes = 0;
  }

  set(value){
    if(this.nodes === 0){
      const newNode = new Node(value);
      this.start = newNode;
      this.end = newNode;
      this.nodes++;
    } else if(this.nodes <= this.length - 1){
      const newNode = new Node(value);
      const newEnd = newNode;
      const prevEnd = this.end;

      prevEnd.next = newNode;
      this.end = newEnd
      this.end.previous = prevEnd;
      this.nodes++;
      if(this.nodes === this.length){
        newEnd.next = this.start;
        this.start.previous = newEnd;
      }
    } else {
      const prevStart = this.start;
      const newEnd = this.start;
      const prevEnd = this.end;

      this.start = prevStart.next;
      this.start.previous = newEnd;
      this.end = newEnd;
      this.end.value = value;
      this.end.next = this.start;
      this.end.previous = prevEnd;
    }
  }

  get(){

  }

  size(){
    console.log(this.nodes)
    return this.nodes
  }

}


// const test = new CircularBuffer(5)
// test.set(1)
// test.set(2)
// test.set(3)
// test.set(4)
// test.set(5)
// test.size()
// test.set(6)
// test.set(7)
// test.set(8)
