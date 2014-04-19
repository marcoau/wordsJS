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
      var tree = tree.children[add(word.slice(0,j+1), tree)];
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
          console.log('our target: ' + word + ', is equal to ' + tree.children[i].value);
          return i;
        }else{
          console.log('our target: ' + word + ', is not found in ' + tree.children[i].value);
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

  this.allWordsBelow = function(word, levels){
    var node = this._getNode(word);
    var words = [];
    var AddAllWords = function(node, arr){
      if(node !== undefined){
        //undefined is the result for nod e in ._getNode if no such node
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
          console.log('our target: ' + word + ', is equal to ' + tree.children[i].value);
          return i;
        }else{
          console.log('our target: ' + word + ', is not found in ' + tree.children[i].value);
        }
      }
      return false;
    };
    //
    var tree = this;
    for(var j = 0; j < word.length; j++){
      tree = tree.children[search(word.slice(0,j+1), tree)];
      if(!tree){return undefined;}
    }
    return tree;
  };
};

//naked declaration of new PrefixTrees must take no argument.
