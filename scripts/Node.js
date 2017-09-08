class Node {
  constructor(letter) {
    this.letter = letter;
    this.next = null;
    this.isWord = false;
    this.reiteration = 0;
  }
}

export default Node;
