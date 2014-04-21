//naked instantiations of new Tries must take no argument.
var Trie = function(word){
  if(word === undefined){
    this.value = '';
  }else{
    this.value = word;
  }
  this.children = {};
  this.isWord = false;

  this.addWord = function(word){
    var add = function(word, trie){
      if(trie && !(('_' + word) in trie.children)){
        trie.children['_' + word] = new Trie(word);
      }
    };
    var trie = this;
    for(var i = 0; i < word.length; i++){
      add(word.slice(0, i+1), trie);
      var trie = trie.children['_' + word.slice(0, i+1)];
      if(i === word.length - 1){
        trie.isWord = true;
      }
    }
  };

  this.addList = function(arr){
    for(var i = 0; i < arr.length; i++){
      this.addWord(arr[i]);
    }
  };

  this.getNode = function(word){
    var pos = this.value.length;
    //word shorter than/equal to length of node.value, but not equal
    if(word.length <= pos && this.value !== word){
      return undefined;
    }
    var search = function(word, trie){
      return ('_' + word) in trie.children;
    };
    var trie = this;

    for(var i = pos; i < word.length; i++){
      if(!search(word.slice(0, i+1), trie)){
        return undefined;
      }else{
        trie = trie.children['_' + word.slice(0, i+1)];
      }
    }
    return trie;
  };

  this.hasNode = function(word){
    var node = this.getNode(word);
    return node !== undefined;
  };

  this.hasWord = function(word){
    var node = this.getNode(word);
    if(node !== undefined){
      return node.isWord;
    }
  };
};

var scrabbleTree = function(word, trie){
  var goodWords = [];
  var count = 0;
  var chArray = word.split('');
  var checkTree = function(word, arr, trie, container){
    count++;
    if(trie.hasNode(word)){
      if(word.length > 1 && container.indexOf(word) === -1 && trie.hasWord(word)){
        container.push(word);
      }
      for(var i = 0; i < arr.length; i++){
        var newArr = arr.slice();
        var newWord = word + newArr.splice(i, 1);
        //optimization needed
        checkTree(newWord, newArr, trie, container);
      }
    }
  };
  checkTree('', chArray, trie, goodWords);
  return goodWords;
};

var autoFill = function(word, maxLength, trie){
  var nextWords = [];
  if(trie.hasWord(word)){
    nextWords.push('' + word);
  }
  var getNextWords = function(word, maxLength, trie, container){
    if(word.length < maxLength){
      if(trie !== undefined){
        for(var key in trie.children){
          if(trie.children[key].isWord){
            container.push(key.slice(1));
          }
          getNextWords(key, maxLength, trie.children[key], container);
        }
      }
    }
  };
  getNextWords(word, maxLength, trie.getNode(word), nextWords);
  return nextWords;
};
