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
          return i;
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

var scrabbleSolution = function(word, tree){
  var goodWords = [];
  var factorial = function(num){
    var result = 1;
    for(var i = 1; i <= num; i++){
      result *= i;
    }
    return result;
  };
  var allLengthCombos = function(word){
    var chArray = word.split('');
    var orders = [];
    var results = [];
    for(var i = 0; i < factorial(word.length); i++){
      var order = [];
      var remainder = i;
      for(var j = word.length - 1; j > 0; j--){
        var fac = factorial(j);
        order.push(Math.floor(remainder / fac));
        remainder = remainder % fac;
      }
      order.push(0);
      //all lengths included, but slow
      for(var z = 0; z < order.length; z++){
        orders.push(order.slice(0, z+1));
      }
    }
    for(var k = 0; k < orders.length; k++){
      var chars = chArray.slice();
      var result = [];
      for(var l = 0; l < orders[k].length; l++){
        result.push(chars.splice(orders[k][l], 1));
      }
      result = result.join('');
      if(results.indexOf(result) === -1){
        results.push(result);
      }
    }
    return results;
  };

  var anagrams = allLengthCombos(word);
  for(var i = 0; i < anagrams.length; i++){
    if(tree.hasWord(anagrams[i])){
      goodWords.push(anagrams[i]);
    }
  }
  return goodWords;
};
