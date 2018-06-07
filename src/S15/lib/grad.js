"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

function check(x, y, m, n) {
  if (x >= 0 && x < n && y >= 0 && y < m) return true;
  return false;
}

const Grad = {
  default(props = { m: 6, n: 6 }) {
    // n cot, m hang
    const m = props.m;
    const n = props.n;
    let cnti = [];
    let cntj = [];

    const field = Array(n).fill(Array(m).fill(null));
    const gentent = Array(n).fill(Array(m).fill(0));

    const dx = [-1, 0, 0, 1];
    const dy = [0, -1, 1, 0];
    const dx2 = [-1, -1, -1, 0, 0, 1, 1, 1];
    const dy2 = [-1, 0, 1, -1, 1, -1, 0, 1];
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
                check(i + dx[k], j + dy[k], m, n) &&
                field[i + dx[k]][j + dy[k]] === "tree"
              )
                findtree = true;

            if (findtree) {
              let alreadytent = false;
              for (let k = 0; k < 8; ++k)
                if (
                  check(i + dx2[k], j + dy2[k], m, n) &&
                  gentent[i + dx2[k]][j + dy2[k]] === 1
                )
                  alreadytent = true;
              if (!alreadytent) gentent[i][j] = 1;
            }
          }
        }
      }
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j) {
        cnti[i] += gentent[i][j];
        cntj[j] += gentent[i][j];
      }
    return { field, cnti, cntj };
  },
  actions: {
    async place(state, { x, y }) {
      const field = state.field;
      const n = field.length;
      const m = field[0].length;
      const cnti = state.cnti;
      const cntj = state.cntj;

      if (field[x][y] === "tree") throw new Error("Tree is here!");

      if (field[x][y] === "tent") {
        field[x][y] = null;
        return { field, cnti, cntj };
      }

      // Check validtree
      let validtree = false;
      for (let k = 0; k < 4; ++k)
        if (
          check(x + dx[k] + dy[k], m, n) &&
          field[x + dx[k]][y + dy[k]] === "tree"
        )
          validtree = true;
      if (!validtree)
        throw new Error("No adjancent trees found! Move is invalid.");

      // Check tentaround
      let tentaround = false;
      for (let k = 0; k < 8; ++k)
        if (
          check(x + dx2[k] + dy2[k], m, n) &&
          field[x + dx2[k]][y + dy2[k]] === "tent"
        )
          tentaround = true;
      if (!tentaround) throw new Error("Nearby tent found! Move is invalid.");
      field[x][y] = "tent";
      return { field, cnti, cntj };
    }
  },
  isValid(state) {
    const piles = state.piles;
    if (!(piles instanceof Array)) return false;
    for (const pile of piles) if (!(pile instanceof Array)) return false;
    return true;
  },
  isEnding(state) {
    const field = state.field;
    const n = field.length;
    const m = field[0].length;
    const cnti = [];
    const cntj = [];
    for (let i = 0; i < n; ++i)
      for (let j = 0; j < m; ++j)
        if (field[i][j] === "tent") {
          ++cnti[i];
          ++cntj[j];
        }

    for (let i = 0; i < n; ++i) if (cnti[i] !== state.cnti[i]) return null;
    for (let j = 0; j < m; ++j) if (cntj[j] !== state.cntj[j]) return null;
    return "won";
  }
};

exports.default = Grad;
