var PrefixTree = function(word){
  if(word === undefined){
    this.value = '';
  }else{
    this.value = word;
  }
  this.children = [];
  this.isWord = false;

  this.add = function(word){
    var add = function(word, tree){
      var hasChild = false;
      var pos;
      for(var i = 0; i < tree.children.length; i++){
        if(tree.children[i].value === word){
          hasChild = true;
          pos = i;
        }
      }
      if(!hasChild){
        tree.children.push(new PrefixTree(word));
        pos = tree.children.length - 1;
      }
      return pos;
    };
    //
    var tree = this;
    for(var j = 0; j < word.length; j++){
      tree = tree.children[add(word.slice(0,j+1), tree)];
      if(j === word.length - 1){
        tree.isWord = true;
      }
    }
  };

  this.addList = function(arr){
    for(var i = 0; i < arr.length; i++){
      this.add(arr[i]);
    }
  };

  this.hasWord = function(word){
    var search = function(word, tree){
      for(var i = 0; i < tree.children.length; i++){
        if(tree.children[i].value === word){
          return i;
        }
      }
      return false;
    };
    //
    var tree = this;
    for(var j = 0; j < word.length; j++){
      tree = tree.children[search(word.slice(0,j+1), tree)];
      if(!tree){return false;}
    }
    return tree.isWord;
  };

  this.hasNode = function(word){
    var search = function(word, tree){
      for(var i = 0; i < tree.children.length; i++){
        if(tree.children[i].value === word){
          return i;
        }
      }
      return false;
    };
    //
    var tree = this;
    for(var j = 0; j < word.length; j++){
      tree = tree.children[search(word.slice(0,j+1), tree)];
      if(!tree){return false;}
    }
    return true;
  };

  this.allWordsBelow = function(word){
    var node = this._getNode(word);
    var words = [];
    var AddAllWords = function(node, arr){
      if(node !== 'no node'){
        //'no node' is the result for nod e in ._getNode if no such node
        if(node.isWord){
          arr.push(node.value);
        }
        for(var i = 0; i < node.children.length; i++){
          AddAllWords(node.children[i], arr);
        }
      }
    };
    AddAllWords(node, words);
    return words;
  };

  //closure functions below
  this._getNode = function(word){
    var search = function(word, tree){
      for(var i = 0; i < tree.children.length; i++){
        if(tree.children[i].value === word){
          return i;
        }
      }
      return false;
    };
    //
    var tree = this;
    for(var j = 0; j < word.length; j++){
      tree = tree.children[search(word.slice(0,j+1), tree)];
      if(!tree){return 'no node';}
    }
    return tree;
  };
};

var scrabbleTree = function(word, tree){
  var goodWords = [];
  var count = 0;
  var chArray = word.split('');
  var checkTree = function(word, arr, tree, container){
    count++;
    //console.log('checking the word: ' + word);
    if(tree.hasNode(word)){
      if(tree.hasWord(word) && container.indexOf(word) === -1){
        container.push(word);
      }
      for(var i = 0; i < arr.length; i++){
        var newArr = arr.slice();
        var newWord = word + newArr.splice(i, 1);
        checkTree(newWord, newArr, tree);
      }
    }
  };
  checkTree('', chArray, tree, goodWords);
  console.log(count);
  return goodWords;
};

var autoFill = function(word, maxLength, tree){
  var nextWords = [];
  var getWords = function(word, maxLength, tree, container){
    if(word.length < maxLength){
      var node = tree._getNode(word);
      if(node !== 'no node'){
        for(var i = 0; i < node.children.length; i++){
          var wordTree = node.children[i];
          console.log(wordTree);
          if(wordTree.isWord){
            nextWords.push(wordTree.value);
          }
          getWords(wordTree.value, maxLength, tree, container);
        }
      }
    }
  };
  getWords(word, maxLength, tree, nextWords);
  return nextWords;
};
