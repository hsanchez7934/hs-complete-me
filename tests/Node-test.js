import { assert } from 'chai';
import Node from '../scripts/Node';
import Trie from '../scripts/Trie';

describe('Node', () => {
  let node;
  beforeEach(() => {
    node = new Node();
  });

  it('should be a function', () => {
    assert.isFunction(Node);
  });

  it('should create an instance of node', () => {
    assert.isObject(node);
  });

  it('should be able to pass in a letter', () => {
    node = new Node('l')
    assert.equal(node.letter, 'l')
  });

  it('property next should start off with value of null', () => {
    assert.equal(node.next, null);
  });

  it('property isWord should start off with value of false', () => {
    assert.equal(node.isWord, false);
  });

  it('property reiteration should start off with a value of 0', () => {
    assert.equal(node.reiteration, 0);
  });

})
