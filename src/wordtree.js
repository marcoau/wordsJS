//naked instantiations of new PrefixTrees must take no argument.
var PrefixTree = function(word){
  if(word === undefined){
    this.value = '';
  }else{
    this.value = word;
  }
  this.children = {};
  //this.children = [];
  this.isWord = false;

  this.add = function(word){
    var add = function(word, tree){
      if(!(word in tree.children)){
        tree.children[word] = new PrefixTree(word);
      }
    };
    var tree = this;
    for(var i = 0; i < word.length; i++){
      add(word.slice(0, i+1), tree);
      var tree = tree.children[word.slice(0, i+1)];
      if(i === word.length - 1){
        tree.isWord = true;
      }
    }
  };

  this.addList = function(arr){
    for(var i = 0; i < arr.length; i++){
      this.add(arr[i]);
    }
  };

  this.getNode = function(word){

    var search = function(word, tree){
      return word in tree.children;
    };

    var tree = this;
    if(tree.value === word){
      return tree;
    }

    for(var i = 0; i < word.length; i++){
      if(!search(word.slice(0, i+1), tree)){
        return undefined;
      }else{
        tree = tree.children[word.slice(0, i+1)];
      }
    }
    return tree;
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

var scrabbleTree = function(word, tree){
  var goodWords = [];
  var count = 0;
  var chArray = word.split('');
  var checkTree = function(word, arr, tree, container){
    count++;
    console.log('checking the word: ' + word + ' in: *' + tree.value);
    if(tree.hasNode(word)){
      //var node = tree.getNode(word);
      if(tree.hasWord(word)){
        container.push(word);
      }
      for(var i = 0; i < arr.length; i++){
        var newArr = arr.slice();
        var newWord = word + newArr.splice(i, 1);
        //optimization needed
        checkTree(newWord, newArr, tree, container);
      }
    }
  };
  checkTree('', chArray, tree, goodWords);
  console.log(count);
  return goodWords;
};

var autoFill = function(word, maxLength, tree){
  var nextWords = [];
  if(tree.hasWord(word)){
    nextWords.push(word);
  }
  var getNextWords = function(word, maxLength, tree, container){
    if(word.length < maxLength){
      if(tree !== undefined){
        for(var key in tree.children){
          if(tree.children[key].isWord){
            container.push(key);
          }
          getNextWords(key, maxLength, tree.children[key], container);
        }/*
        for(var i = 0; i < node.children.length; i++){
          var wordTree = node.children[i];
          console.log(wordTree);
          if(wordTree.isWord){
            nextWords.push(wordTree.value);
          }
          getWords(wordTree.value, maxLength, tree, container);
        }*/
      }
    }
  };
  getNextWords(word, maxLength, tree.getNode(word), nextWords);
  return nextWords;
};

var treey = new PrefixTree();
treey.add('hi');
