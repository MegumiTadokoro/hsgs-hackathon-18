"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MultiSet = require('mnemonist/multi-set');

var InitDict = new MultiSet();

const WordPuzzle = {
  //Define cell = 11 if it's blocked, cell = 10 if it's not written
  //Piles is the board, Dict is the list of unfound numbers, Init is the list of all numbers initiallly
  //Found is the list of found numbers, tot is the total number of found numbers
  default(props = { height: 10, width: 10 }) {
    InitDict.clear();
    const height = props.height;
    const width = props.width;
    let Piles = [], unwritten = 0, Dict = new MultiSet(), Found = new MultiSet(), tot = 0;

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
              //console.log(i, j, word);
            }
            else if((i === 0 || Piles[i-1][j-1] === 11) && (i === height-1 || Piles[i+1][j-1] === 11)) {
              Dict.add(word);
              //console.log(i, j, word);
            }
          }
          word = new String();
        }
        else word += Piles[i][j];
      }
      if(word.length > 0) {
        if(word.length > 1) {
          Dict.add(word);
          //console.log(i, 8, word);
        }
        else if((i === 0 || Piles[i-1][width-1] === 11) && (i === height-1 || Piles[i+1][width-1] === 11)) {
          Dict.add(word);
          //console.log(i, 8, word);
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
            //console.log(i, j, word);
          }
          word = new String();
        }
        else word += Piles[i][j];
      }
      if(word.length > 1) {
        Dict.add(word);
        //console.log(8, j, word);
      }
    }

    /*console.log("initial table");
    console.table(Piles);
    console.log("initial dictionary");
    Dict.forEach(function(value) {
      console.log(value);
    });*/

    //randomly erase the cell
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (Piles[i][j] !== 11) {
          let c = Math.floor(Math.random() * 2);
          if (c === 0) Piles[i][j] = 10, unwritten++;
          else Piles[i][j] = -Piles[i][j] - 1;
        }
      }
    }

    //console.log("Initial Table");
    //console.table(Piles);
    //get all the puzzled (hidden) word horizontally...
    for (let i = 0; i < height; i++) {
      let word = new String(), last = -1;
      for (let j = 0; j < width; j++) {
        if (Piles[i][j] === 11) {
          if (word.length > 0) {
            if(word.length > 1) {
              Dict.remove(word);
            }
            else if((i === 0 || Piles[i-1][j-1] === 11) && (i === height-1 || Piles[i+1][j-1] === 11)) {
              Dict.remove(word);
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
        }
        else if((i === 0 || Piles[i-1][width-1] === 11) && (i === height-1 || Piles[i+1][width-1] === 11)) {
          Dict.remove(word);
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
      }
    }
    /*console.log("initial unfound dictionary");
    InitDict.forEach(function(value) {
      console.log(value);
    });*/
    Dict.forEach(function(value) {tot++; InitDict.add(value)});
    return { Piles, Dict, Found, height, width, unwritten, tot };
  },

  actions: {
    async reset(state) {
      let piles = state.Piles, found = new MultiSet(), cnt = 0;
      const height = state.height;
      const width = state.width;
      const tot = state.tot;
      for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
          if(piles[i][j] >= 0 && piles[i][j] <= 10) {
            piles[i][j] = 10;
            cnt++;
          }
        }
      }
      return { Piles : piles, Dict : InitDict, Found : found, height : height, width : width, unwritten : cnt, tot : tot };
    },

    async move(state, { x, y }) {

      //copy the state
      let piles = state.Piles, dict = MultiSet.from(state.Dict), found = MultiSet.from(state.Found);
      let last = -1, unwritten = state.unwritten, word = new String(), val = ((piles[x][y] + 1) % 11);
      const height = state.height;
      const width = state.width;
      const tot = state.tot;

      if (x < 0 || x >= height || y < 0 || y >= width) {
        throw new Error("Invalid cell to be written");
      }
      if (piles[x][y] === 11) {
        throw new Error("Can't overwrite a blocked cell");
      }
      if (piles[x][y] < 0) {
        throw new Error("Can't overwrite a prewritten cell");
      }

      /*console.log("current table");
      console.table(piles);
      console.log("Found word");
      found.forEach(function(value) {
        console.log(value);
      });*/
      if(piles[x][y] < 10) {
        //push any found word in queue
        for (let i = 0; i < width; i++) {
          if (piles[x][i] === 11) {
            //console.log("candidate honrizontal" + word + " " + last + " " + found.multiplicity(word) + " " + InitDict.multiplicity(word));
            if (last < y && y < i && InitDict.has(word)) {
              if(word.length > 1) {
                if(found.multiplicity(word) <= InitDict.multiplicity(word)) {
                  dict.add(word);
                  //console.log("adding " + word);
                }
                found.remove(word);
              }
              else if((x === 0 || piles[x-1][i-1] === 11) && (x === height-1 || piles[x+1][i-1] === 11)) {
                if(found.multiplicity(word) <= InitDict.multiplicity(word)) {
                  dict.add(word);
                  //console.log("adding " + word);
                }
                found.remove(word);
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
        //console.log("residue " + word);
        if(word.length > 0 && last < y && InitDict.has(word)) {
          //console.log("candidate H " + word + " " + last + " " + found.multiplicity(word) + " " + InitDict.multiplicity(word));
          if(word.length > 1) {
            if(found.multiplicity(word) <= InitDict.multiplicity(word)) {
              dict.add(word);
              //console.log("adding " + word);
            }
            found.remove(word);
          }
          else if((x === 0 || piles[x-1][width-1] === 11) && (x === height-1 || piles[x+1][width-1] === 11)) {
            if(found.multiplicity(word) <= InitDict.multiplicity(word)) {
              dict.add(word);
              //console.log("adding " + word);
            }
            found.remove(word);
          }
        }
        
        word = new String(); last = -1;
        for (let i = 0; i < height; i++) {
          if (piles[i][y] === 11) {
            //console.log("candidate vertical " + word + " " + (last < x) + " " + 
            //(x < i) + " " + InitDict.has(word) + " " + (word.length > 1));
            if (last < x && x < i && InitDict.has(word) && word.length > 1) {
              if(found.multiplicity(word) <= InitDict.multiplicity(word)) {
                dict.add(word);
                //console.log("adding " + word);
              }
              found.remove(word);
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
        if (last < x && InitDict.has(word) && word.length > 1) {
          //console.log("candidate V " + word);
          if(found.multiplicity(word) <= InitDict.multiplicity(word)) {
            dict.add(word);
            //console.log("adding " + word);
          }
          found.remove(word);
        }
      }

      /*console.log("Unfound word");
      dict.forEach(function(value) {
        console.log(value);
      });*/
      //erase the cell
      word = new String(), last = -1, piles[x][y] = val;

      if(val === 0) unwritten--;
      else if(val === 10) unwritten++;
      if (val < 10) {
        //find any available word
        for (let i = 0; i < width; i++) {
          if (piles[x][i] === 11) {
            //console.log("candidate " + word);
            if (last < y && y < i && InitDict.has(word)) {
              if(word.length > 1) {
                dict.remove(word); found.add(word);
                //console.log("erasing " + word);
              }
              else if((x === 0 || piles[x-1][i-1] === 11) && (x === height-1 || piles[x+1][i-1] === 11)) {
                dict.remove(word); found.add(word);
                //console.log("erasing " + word);
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
          //console.log("candidate " + word + " " + last + " " + InitDict.has(word) + " verdict: " + (last < y && InitDict.has(word)));
          if (last < y && InitDict.has(word)) {
            //console.log("Pending");
            if(word.length > 1) {
              dict.remove(word); found.add(word);
              //console.log("erasing " + word);
            }
            else if((x === 0 || piles[x-1][width-1] === 11) && (x === height-1 || piles[x+1][width-1] === 11)) {
              dict.remove(word); found.add(word);
              //console.log("erasing " + word);
            }
          }
        }
        word = new String(); last = -1;
        for (let i = 0; i < height; i++) {
          //console.log("candidate " + word);
          if (piles[i][y] === 11) {
            if (last < x && x < i && InitDict.has(word) && word.length > 1) {
              dict.remove(word); found.add(word);
              //console.log("erasing " + word);
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
          //console.log("candidate " + word);
          dict.remove(word); found.add(word);
          //console.log("erasing " + word);
        }
      }
      /*console.log("New table");
      console.table(piles);
      console.log("New found words");
      found.forEach(function(value) {
        console.log(value);
      });*/
      return { Piles : piles, Dict : dict, Found : found, height : height, width : width, unwritten : unwritten, tot : tot};
    }
  },

  isValid(state) {
    //Make sure that all "pile" are array
    const piles = state.Piles;
    if (not(piles instanceof Array)) return false;
    if (piles.length !== state.height) return false;
    for (const pile of piles) {
      if (not(pile instanceof Array) || pile.length !== state.width) return false;
    }
    return true;
  },

  isEnding(state) {
    //Found all the words
    if (state.unwritten === 0) return (state.Dict.size === 0 ? "won" : null);
    //The game continues
    return null;
  }
};
exports.default = WordPuzzle;