"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const S01 = {
  default(props) {
    let arr = ['A', 'B', 'C', 'D', 'E']
    while (1) {
      let board = [
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, null]
      ]
      let visit = [0, 0, 0, 0, 0]

      // generate the board
      for (let i = 0; i < 5; ++i) {
        for (let j = 0; j < 5; ++j) {
          let k = Math.floor(Math.random() * 5)
          board[i][j] = arr[k]
          visit[k] = 1
        }
      }

      // alert(visit)

      let fail = 0;
      for (let i = 0; i < 5; ++i) {
        if (visit[i] == 0) fail = 1
      }

      if (fail == 1) continue

      let value = [null, null, null, null, null]
      let tmpValue = [0, 0, 0, 0, 0]

      for (let i = 0; i < 5; ++i) {
        tmpValue[i] = Math.floor(Math.random() * 10)
      }

      for (let i = 0; i < 5; ++i) {
        for (let j = 0; j < 5; ++j) {
          let id = board[i][j].charCodeAt(0) - 'A'.charCodeAt(0);
          board[i][5] = parseInt(board[i][5]) + parseInt(tmpValue[id])
          board[5][j] = parseInt(board[5][j]) + parseInt(tmpValue[id])
        }
      }
      let board2 = board.map(v => v.slice())
      return { board2: board2, board : board, value : value };
    }
  },

  actions: {
    async move(state, {x}) {
      let board = state.board.map(v => v.slice())
      let board2 = state.board2.map(v => v.slice())
      let value = [x.A, x.B, x.C, x.D, x.E]
      return {board2: board2, board: board, value: value}
    }
  },

  isValid(state) {

  },

  isEnding(state) {
    for(let i = 0; i < 5; ++i) if(parseInt(state.value[i]) != state.value[i])
      return null
    let sumRow = [0, 0, 0, 0, 0];
    let sumCol = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; ++i) {
      for (let j = 0; j < 5; ++j) {
        let id = state.board[i][j].charCodeAt(0) - 'A'.charCodeAt(0)
        sumRow[j] = parseInt(sumRow[j]) + parseInt(state.value[id]);
        sumCol[i] = parseInt(sumCol[i]) + parseInt(state.value[id]);
      }
    }
    for (let i = 0; i < 5; ++i) state.value[i] = null
    for (let i = 0; i < 5; ++i) {
      if (sumRow[i] != state.board[5][i]) {
        return null
      }
    }
    for (let i = 0; i < 5; ++i) {
      if (sumCol[i] != state.board[i][5]) {
        return null
      }
    }
    alert('Wow! You have potential! :)')
    return 'AC';
  }
};

exports.default = S01;
