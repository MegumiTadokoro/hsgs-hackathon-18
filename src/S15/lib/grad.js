"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function check(x, y) {
  if (x >= 0 && x < n && y >= 0 && y < m) return true;
  return false;
}

const Grad = {
  default(props = { n: 6, m: 6 }) {
    const m = props.m;
    const n = props.n;

    const dx = [-1, 0, 0, 1];
    const dy = [0, -1, 1, 0];
    const dx2 = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy2 = [-1, 0, 1, -1, 1, -1, 0, 1];

    const field = Array(m).fill(Array(n).fill(null));
    const gentent = Array(m).fill(Array(n).fill(0));
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j) {
        const treehere = Math.floor(Math.random() * 4);
        if (treehere < 1) field[i][j] = "tree";
      }
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j) {
        if (field[i][j] !== "tree") {
          const tenthere = Math.floor(Math.random() * 5);
          if (tenthere < 4) {
            const findtree = false;
            for (let k = 0; k < 4; ++k)
              if (
                check(i + dx[k], j + dy[k]) &&
                field[i + dx[k]][j + dy[k]] === "tree"
              )
                findtree = true;

            if (findtree) {
              let alreadytent = false;
              for (let k = 0; k < 8; ++k)
                if (
                  check(i + dx2[k], j + dy2[k]) &&
                  gentent[i + dx2[k]][j + dy2[k]] === 1
                )
                  alreadytent = true;
              if (!alreadytent) gentent[i][j] = 1;
            }
          }
        }
      }
    const cnti = [];
    const cntj = [];
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j) {
        cnti[i] += gentent[i][j];
        cntj[j] += gentent[i][j];
      }
    return { field, cnti, cntj };
  },
  actions: {
    async place(state, { x, y }) {
      let field = state.field;
      if (field[x][y] === "tree") throw new Error("Tree is here!");

      // Check validtree
      let validtree = false;
      for (let k = 0; k < 4; ++k)
        if (check(x + dx[k] + dy[k]) && field[x + dx[k]][y + dy[k]] === "tree")
          validtree = true;
      if (!validtree)
        throw new Error("No adjancent trees found! Move is invalid.");

      // Check tentaround
      let tentaround = false;
      for (let k = 0; k < 8; ++k)
        if (check(i + dx2[k], j + dy2[k]) && gentent[i + dx2[k]][j + dy2[k]])
          tentaround = true;
      if (!tentaround) throw new Error("Nearby tent found! Move is invalid.");
      field[x][y] = "tent";
      return { field };
    }
  },
  isValid(state) {
    const piles = state.piles;
    if (!(piles instanceof Array)) return false;
    for (const pile of piles)
      if (!(pile instanceof Array)) return false;
    return true;
  },
  isEnding(state) {
    const cnti = [];
    const cntj = [];
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j) {
        cnti[i] += gentent[i][j];
        cntj[j] += gentent[i][j];
      }
    for (let i = 0; i < n; ++i) if (cnti[i] !== state.cnti[i]) return null;
    for (let j = 0; j < m; ++j) if (cntj[j] !== state.cntj[j]) return null;
    return "won";
  }
};

exports.default = Grad;
