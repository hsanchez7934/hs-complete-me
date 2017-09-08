import Node from '../scripts/Node'

class Trie {

  constructor() {
    this.root = new Node;
    this.wordCount = 0;
  }

  populate(words) {
    words.forEach(word => this.insert(word));
  }

  insert(word) {
    const wordSplit = [...word.toLowerCase()];
    const nodeList = wordSplit.map(letter => new Node(letter));

    let currentNode = this.root;
    let data = 0;

    nodeList.forEach((node, index, array) => {
      currentNode.next = currentNode.next || {};
      if (!currentNode.next[node.letter]) {
        currentNode.next[node.letter] = node;
        currentNode.next[node.letter].data = data;
      }
      if (index === array.length - 1) {
        currentNode.next[node.letter].isWord = true;
        this.wordCount++;
      }
      data++;
      currentNode = currentNode.next[node.letter];
    });
  }

  count() {
    return this.wordCount;
  }

  select(word) {

    let node = this.root;

    if (!node.next) {
      return;
    }

    [...word].forEach(letter => {
      node = node.next[letter];
    })

    if (node.isWord) {
      node.reiteration++;
    }
  }

  suggest(word) {
    if (!word) {
      return null;
    }

    let node = this.root.next;
    let array = [];
    let levels = [];

    [...word].forEach((element, index, array) => {
      let {next, data, letter, isWord, reiteration} = node[element];

      levels[data] = { letter: [letter], reiteration };
      levels[data].isWord = index === array.length - 1 ? isWord : false;
      node = next;
    })

    search(node);
    const returnedArray = array.sort((a, b) => b.reiteration - a.reiteration).map(element => element.newWord);
    return returnedArray;

    function search(node) {

      if (!node) {
        let newWord = '';

        levels.forEach(element => {
          newWord += element.letter[0];

          if (element.isWord) {
            if (!array.map(element => element.newWord).includes(newWord)) {
              array.push({newWord, reiteration: element.reiteration});
            }
          }
        });
        return null;
      }

      Object.keys(node).forEach(element => {

        let {next, data, letter, isWord, reiteration} = node[element];

        if (!levels[data]) {
          levels[data] = { letter: [letter], isWord, reiteration };
        } else {
          let letterArray = levels[data].letter;
          letterArray.shift();
          letterArray.push(letter);
          levels.splice(data);
          levels[data] = { letter: letterArray, isWord, reiteration };
        }
        search(next);
      })
    }
  }
}

export default Trie;
