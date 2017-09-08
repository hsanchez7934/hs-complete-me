import { assert } from 'chai';
import Node from '../scripts/Node';
import Trie from '../scripts/Trie';
import locus from 'locus';
import fs from 'fs';

const dictionaryWords = '/usr/share/dict/words';
const dictionary = fs.readFileSync(dictionaryWords).toString().trim().split('\n')

describe('Trie', () => {
  let trie;
  let words;

  beforeEach(() => {

    trie = new Trie();
    words = ['perseverance', 'determination', 'motivation', 'commitment', 'courage', 'strength', 'adversity', 'person', 'personify'];
  })

  it('Trie should be a function and should create new instances of Trie', () => {
    assert.isFunction(Trie);
    assert.instanceOf(trie, Trie);
  });

  it('Trie should start off with property root as a new node', () => {
    let node = trie.root;

    assert.equal(trie.root, node);
  });

  it('should start off with wordCount as 0', () => {
    assert.equal(trie.wordCount, 0);
  });

  it('should contain insert method that will take in a word', () => {

    let word = words[0];

    assert.isFunction(trie.insert)
    trie.insert(word);

    let node = trie.root.next;
    let anticipatedLetter = Object.keys(node).join('');

    assert.equal(anticipatedLetter, word[0]);
  });

  it('should count how many words have been inserted', () => {
    let word1 = words[1];
    let word2 = words[4];
    let word3 = words[5];

    assert.isFunction(trie.count);

    trie.insert(word1);

    trie.count();
    assert.equal(trie.count(), 1);

    trie.insert(word2);

    trie.count();
    assert.equal(trie.count(), 2);

    trie.insert(word3);

    trie.count();
    assert.equal(trie.count(), 3);
  });

  it('should contain a method to populate words from dictionary', () => {
    assert.isFunction(trie.populate);
    trie.populate(words);

    let node = trie.root.next;
    let anticipatedLetters = Object.keys(node);
    let array = ['p', 'd', 'm', 'c', 's', 'a'];

    assert.deepEqual(anticipatedLetters, array);
  });

  it('should contain a method that returns an array of suggestions by searching for a word prefix', () => {
    let prefix = 'pe';
    let filteredWords = words.filter(words => words.includes(prefix)).sort();

    trie.populate(words)

    assert.isFunction(trie.suggest)
    let suggestions = trie.suggest(prefix).sort();

    assert.deepEqual(suggestions, filteredWords);
  });

  it('should contain a select method that takes a word and returns it at the top of the suggested words', () => {
    let prefix = 'per';
    let selectedWord = 'personify';
    let filteredWords = words.filter(words => words.includes(prefix)).sort();

    trie.populate(words);

    let suggestedWords = trie.suggest(prefix).sort();

    assert.deepEqual(suggestedWords, filteredWords);

    trie.select(selectedWord);
    suggestedWords = trie.suggest(prefix);

    let topReiteratedWord = suggestedWords[0];

    assert.equal(topReiteratedWord, selectedWord);
  });
})
