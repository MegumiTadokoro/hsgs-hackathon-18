"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiSet = require('mnemonist/multi-set');

var InitDict = new MultiSet();

const WordPuzzle = {
  //Define cell = 11 if it's blocked, cell = 10 if it's not written
  default(props = { height: 10, width: 10 }) {
    const height = props.height;
    const width = props.width;
    let Piles = [], unwritten = 0, Dict = new MultiSet(), Found = new MultiSet();

    //create the board randomly
    for (let i = 0; i < height; i++) {
      let pile = [];
      for (let j = 0; j < width; j++) {
        let c = Math.floor(Math.random() * 2);
        if (c === 0) pile.push(11);
        else {
          c = Math.floor(Math.random() * 10);
          pile.push(c);
        }
      }
      Piles.push(pile);
    }

    //get all the word horizontally...
    for (let i = 0; i < height; i++) {
      let word = new String();
      for (let j = 0; j < width; j++) {
        if (Piles[i][j] === 11) {
          if (word.length > 0) {
            if(word.length > 1) {
              Dict.add(word);
              InitDict.add(word);
            }
            else if((i === 0 || Piles[i-1][j-1] === 11) && (i === height-1 || Piles[i+1][j-1] === 11)) {
              Dict.add(word);
              InitDict.add(word);
            }
          }
          word = new String();
        }
        else word += Piles[i][j];
      }
      if(word.length > 0) {
        if(word.length > 1) {
          Dict.add(word);
          InitDict.add(word);
        }
        else if((i === 0 || Piles[i-1][width-1] === 11) && (i === height-1 || Piles[i+1][width-1] === 11)) {
          Dict.add(word);
          InitDict.add(word);
        }
      }
    }

    //...and vertically
    for (let j = 0; j < width; j++) {
      let word = new String();
      for (let i = 0; i < height; i++) {
        if (Piles[i][j] === 11) {
          if (word.length > 1) {
            Dict.add(word);
            InitDict.add(word);
          }
          word = new String();
        }
        else word += Piles[i][j];
      }
      if(word.length > 1) {
        Dict.add(word);
        InitDict.add(word);
      }
    }

    //randomly erase the cell
    /*for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (Piles[i][j] !== 11) {
          let c = Math.floor(Math.random() * 2);
          if (c === 0) Piles[i][j] = 10, unwritten++;
          else Piles[i][j] = -Piles[i][j] - 1;
        }
      }
    }*/

    //get all the puzzled (hidden) word horizontally...
    for (let i = 0; i < height; i++) {
      let word = new String(), last = -1;
      for (let j = 0; j < width; j++) {
        if (Piles[i][j] === 11) {
          if (word.length > 0) {
            if(word.length > 1) {
              Dict.remove(word);
              Found.add(word);
            }
            else if((i === 0 || Piles[i-1][j-1] === 11) && (i === height-1 || Piles[i+1][j-1] === 11)) {
              Dict.remove(word);
              Found.add(word);
            }
          }
          word = new String();
        }
        else {
          if(Piles[i][j] === 10) word += '#';
          else if (Piles[i][j] >= 0) word += Piles[i][j];
          else word += (-Piles[i][j] - 1);
        }
      }
      if(word.length > 0) {
        if(word.length > 1) {
          Dict.remove(word);
          Found.add(word);
        }
        else if((i === 0 || Piles[i-1][width-1] === 11) && (i === height-1 || Piles[i+1][width-1] === 11)) {
          Dict.remove(word);
          Found.add(word);
        }
      }
    }

    //... and vertically
    for (let j = 0; j < width; j++) {
      let word = new String(), last = -1;
      for (let i = 0; i < height; i++) {
        if (Piles[i][j] === 11) {
          if(word.length > 1) {
            Dict.remove(word);
            Found.add(word);
          }
          word = new String();
        }
        else {
          if(Piles[i][j] === 10) word += '#';
          else if (Piles[i][j] >= 0) word += Piles[i][j];
          else word += (-Piles[i][j] - 1);
        }
      }
      if(word.length > 1) {
        Dict.remove(word);
        Found.add(word);
      }
    }
    return { Piles, Dict, Found, height, width, unwritten };
  },

  actions: {
    async move(state, { x, y }) {
      if (x < 0 || x > 9 || y < 0 || y > 9) {
        throw new Error("Invalid cell to be written");
      }
      let piles = state.Piles, dict = MultiSet.from(state.Dict), found = MultiSet.from(state.Found);
      if (piles[x][y] === 11) {
        throw new Error("Can't overwrite a blocked cell");
      }
      if (piles[x][y] < 0) {
        throw new Error("Can't overwrite a prewritten cell");
      }

      //copy the state
      let last = -1, unwritten = state.unwritten, word = new String(), val = ((piles[x][y] + 1) % 11);
      const height = state.height;
      const width = state.width;

      if(piles[x][y] < 10) {
        //push any found word in queue
        for (let i = 0; i < width; i++) {
          if (piles[x][i] === 11) {
            if (last < y && y < i && InitDict.has(word) && found.multiplicity(word) === InitDict.multiplicity(word)) {
              if(word.length > 1) {
                dict.add(word); found.remove(word);
              }
              else if((x === 0 || piles[x-1][i-1] === 11) && (x === height-1 || piles[x+1][i-1] === 11)) {
                dict.add(word); found.remove(word);
              }
            }
            word = new String();
            last = i;
          }
          else {
            if(piles[x][i] === 10) word += '#';
            else if (piles[x][i] >= 0) word += piles[x][i];
            else word += (-piles[x][i] - 1);
          }
        }
        if(word.length > 0 && last < y && InitDict.has(word) && found.multiplicity(word) === InitDict.multiplicity(word)) {
          if(word.length > 1) {
            dict.add(word); found.remove(word);
          }
          else if((x === 0 || piles[x-1][width-1] === 11) && (x === height-1 || piles[x+1][width-1] === 11)) {
            dict.add(word); found.remove(word);
          }
        }
        word = new String(); last = -1;
        for (let i = 0; i < height; i++) {
          if (piles[i][y] === 11) {
            if (last < x && x < i && InitDict.has(word) && word.length > 1 &&
            found.multiplicity(word) === InitDict.multiplicity(word)) {
              dict.add(word); found.remove(word);
            }
            word = new String();
            last = i;
          }
          else {
            if(piles[i][y] === 10) word += '#';
            else if (piles[i][y] >= 0) word += piles[i][y];
            else word += (-piles[i][y] - 1);
          }
        }
        if (last < x && x < i && InitDict.has(word) && word.length > 1 &&
          found.multiplicity(word) === InitDict.multiplicity(word)) {
          dict.add(word); found.remove(word);
        }
      }

      //erase the cell
      word = new String(), last = -1, piles[x][y] = val;

      if (val < 10) {
        //find any available word
        unwritten--;
        for (let i = 0; i < width; i++) {
          if (piles[x][i] === 11) {
            if (last < y && y < i && InitDict.has(word)) {
              if(word.length > 1) {
                dict.remove(word); found.add(word);
              }
              else if((x === 0 || piles[x-1][i-1] === 11) && (x === height-1 || piles[x+1][i-1] === 11)) {
                dict.remove(word); found.add(word);
              }
            }
            word = new String();
            last = i;
          }
          else {
            if(piles[x][i] === 10) word += '#';
            else if (piles[x][i] >= 0) word += piles[x][i];
            else word += (-piles[x][i] - 1);
          }
        }
        if(word.length > 0) {
          if (last < y && y < i && InitDict.has(word)) {
            if(word.length > 1) {
              dict.remove(word); found.add(word);
            }
            else if((x === 0 || piles[x-1][i-1] === 11) && (x === height-1 || piles[x+1][i-1] === 11)) {
              dict.remove(word); found.add(word);
            }
          }
        }
        word = new String(); last = -1;
        for (let i = 0; i < height; i++) {
          if (piles[i][y] === 11) {
            if (last < x && x < i && InitDict.has(word) && word.length > 1) {
              dict.remove(word); found.add(word);
            }
            word = new String();
            last = i;
          }
          else {
            if(piles[i][y] === 10) word += '#';
            else if (piles[i][y] >= 0) word += piles[i][y];
            else word += (-piles[i][y] - 1);
          }
        }
        if(word.length > 1 && last < x && InitDict.has(word)) {
          dict.remove(word); found.add(word);
        }
      }
      return { Piles : piles, Dict : dict, Found : found, height : height, width : width, unwritten : unwritten};
    }
  },

  isValid(state) {
    //Make sure that all "pile" are array
    const piles = state.Piles;
    if (not(piles instanceof Array)) return false;
    if (piles.length !== 10) return false;
    const Piles = [];
    for (const pile of piles) {
      if (not(pile instanceof Array)) return false;
      Piles.push(pile);
    }
    return true;
  },

  isEnding(state) {
    //Found all the words
    if (state.unwritten === 0) 
    return (state.Dict.size === 0 ? "won" : "lose");
    //The game continues
    return null;
  }
};
exports.default = WordPuzzle;