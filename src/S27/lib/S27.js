"use strict";
Object.defineProperty(exports, "__esModule", {value : true});

const oo = 1000000007;
const array = [];
for (let i = 0; i < 10; i++) array.push(i);
array.push('+');
array.push('-');
array.push('*');

const S27 = {
    default (props = {height: 9, width: 9}) {
        const height = props.height;
        const width = props.width;
    
        let Board = [];
        let Row = [];
        let Col = [];
        const sign = [];
        sign.push('+');
        sign.push('-');
        sign.push('*');

        for (let i = 0; i < height; i++) {
            let subarray = [];
            for (let j = 0; j < width; j++) {
                subarray.push(0);
            }
            Board.push(subarray);
        }

        for (let i = 0; i < height - 2; i++) {
            for (let j = 0; j < width - 2; j++) {
                if (i % 2 === 1 && j % 2 === 1) Board[i][j] = oo;
                else if (i % 2 === 0 && j % 2 === 0) Board[i][j] = Math.floor(Math.random() * 9 + 1);
                else {
                    let idx = Math.floor(Math.random() * 3);
                    Board[i][j] = sign[idx];
                }
            }
        }

        for (let i = 0; i <= height - 3; i = i + 2) {
            if (width > 1) Board[i][width - 2] = '=';
            if (height > 1) Board[height - 2][i] = '=';
        }

        for (let i = height - 2; i < height; i++) {
            for (let j = 1; j <= width - 4; j = j + 2) {
                Board[i][j] = oo;
            }
        }

        for (let i = 1; i <= height - 2; i = i + 2) {
            for (let j = width - 2; j < width; j++) {
                Board[i][j] = oo;
            }
        }

        if (width > 1 && height > 0) Board[height - 1][width - 2] = oo;
        if (height > 0 && width > 0) Board[height - 1][width - 1] = oo;

        for (let i = 0; i <= height - 3; i = i + 2) {
            let stack = [];
            for (let j = 0; j < width - 2; j++) {
                if (j % 2 === 0) {
                    stack.push(Board[i][j]);
                }
                else {
                    if (Board[i][j] === '+') {
                        stack.push(Board[i][j + 1]);
                        j++;
                    }
                    else if (Board[i][j] === '-') {
                        stack.push(-Board[i][j + 1]);
                        j++;
                    }
                    else {
                        let onTop = stack.pop();
                        stack.push(onTop * Board[i][j + 1]);
                        j++;
                    }
                }
            }

            let expVal = 0;
            while (stack.length > 0) {
                let topVal = stack.pop();
                expVal += topVal;
            }

            //Now expVal is the value of expression. We simply assign it to RHS.
            Board[i][width - 1] = expVal;
        }

        for (let i = 0; i <= width - 3; i = i + 2) {
            let other_stack = [];
            for (let j = 0; j < height - 2; j++) {
                if (j % 2 === 0) other_stack.push(Board[j][i]);
                else {
                    if (Board[j][i] === '+') {
                        other_stack.push(Board[j + 1][i]);
                        j++;
                    }
                    else if (Board[j][i] === '-') {
                        other_stack.push(-Board[j + 1][i]);
                        j++;
                    }
                    else {
                        let num_top = other_stack.pop();
                        other_stack.push(num_top * Board[j + 1][i]);
                        j++;
                    }
                }
            }

            let ans = 0;
            while (other_stack.length > 0) {
                let num = other_stack.pop();
                ans += num;
            }

            if(height > 0) Board[height - 1][i] = ans;
        }

        for (let i = 1; i < height - 2; i++) {
            for (let j = 0; j < width - 2; j++) {
                if (i % 2 === 1 && j % 2 === 1) continue;
                Board[i][j] = oo;
            }
        }

        Row.push(1);
        for (let i = 1; i < height; i++) Row.push(0);
        for (let i = 0; i < width; i++) Col.push(0);

        console.table(Board);
        return {Board, Row, Col, height, width};       
    },

    actions: {
        async move (state, {x, y}) {
            
            if (x >= 7 || y >= 7) throw new Error("Invalid move!");
            if (x % 2 === 1 && y % 2 === 1) throw new Error("Invalid move!");

            let board = state.Board;
            let row = state.Row;
            let col = state.Col;

            if (board[x][y] === oo) {
                if (!(x % 2 === 0 && y % 2 === 0)) board[x][y] = '+';
                else board[x][y] = 0;
            }
            else {
                let pos = 0;
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === board[x][y]) {
                        pos = i + 1;
                        break;
                    }
                }

                if (!(x % 2 === 0 && y % 2 === 0)) {
                    if (pos === array.length) pos = 10;
                }
                else if (pos === 10) pos = 0;
                board[x][y] = array[pos];
            }

            const height = state.height;
            const width = state.width;

            for (let i = 0; i < height - 2; i = i + 2) {
                let stack = [];
                let ok = true;
                for (let j = 0; j < width - 2; j++) {
                    if (j % 2 === 0) {
                        if (board[i][j] === oo) {
                            ok = false;
                            break;
                        }
                        stack.push(board[i][j]);
                        console.log(j, board[i][j]);
                    }
                    else {
                        console.log(j, board[i][j]);
                        if (board[i][j] === '+') {
                            if (board[i][j + 1] === oo) {
                                ok = false;
                                break;
                            }
                            stack.push(board[i][j + 1]);
                            j++;
                        }
                        else if (board[i][j] === '-') {
                            if (board[i][j + 1] === oo) {
                                ok = false;
                                break;
                            }
                            stack.push(-board[i][j + 1]);
                            j++;
                        }
                        else {
                            let onTop = stack.pop();
                            if (board[i][j + 1] === oo) {
                                ok = false;
                                break;
                            }

                            stack.push(onTop * board[i][j + 1]);
                            j++;
                        }
                    }
                }   

                if (!ok) continue;
                
                let ans = 0;
                while (stack.length > 0) {
                    let top = stack.pop();
                    ans = ans + top;
                }

                if (ans !== board[i][width - 1]) {
                    row[i] = 2;
                    console.log(i, ans, board[i][width - 1]);
                }
                else row[i] = 1;
            }

            for (let i = 0; i < width - 2; i = i + 2) {
                let stack = [];
                let ok = true;
                for (let j = 0; j < height - 2; j++) {
                    if (j % 2 === 0) {
                        if (board[j][i] === oo) {
                            ok = false;
                            break;
                        }
                        stack.push(board[j][i]);
                    }
                    else {
                        if (board[j][i] === '+') {
                            if (board[j + 1][i] === oo) {
                                ok = false;
                                break;
                            }
                            stack.push(board[j + 1][i]);
                            j++;
                        }
                        else if (board[j][i] === '-') {
                            if (board[j + 1][i] === oo) {
                                ok = false;
                                break;
                            }
                            stack.push(-board[j + 1][i]);
                            j++;
                        }
                        else {
                            let onTop = stack.pop();
                            if (board[j + 1][i] === oo) {
                                ok = false;
                                break;
                            }

                            stack.push(onTop * board[j + 1][i]);
                            j++;
                        }
                    }
                }   

                if (!ok) continue;
                
                let ans = 0;
                while (stack.length > 0) {
                    let top = stack.pop();
                    ans = ans + top;
                }

                if (ans !== board[height - 1][i]) {
                    col[i] = 2;
                    console.log(i, ans);
                }
                else col[i] = 1;
            }

            console.log("row");
            console.table(row);
            console.log("Column");
            console.table(col);
            return {Board: board, Row: row, Col: col, height: height, width: width};
        },

        async reset (state) {
            const height = state.height;
            const width = state.width;

            let board = state.Board;
            let row = state.Row;
            let col = state.Col;
            for (let i = 1; i < height - 2; i++) {
                for (let j = 0; j < width - 2; j++) {
                    if (i % 2 === 1 && j % 2 === 1) continue;

                    board[i][j] = oo;
                }
            }

            row[i] = 1;
            for (let i = 1; i < height; i++) row[i] = 0;
            for (let i = 0; i < width; i++) col[i] = 0;

            return {Board: board, Row: row, Col: col, height: height, width: width};
        }
    },

    isValid(state) {
        const piles = state.Board;
        if (not(piles instanceof Array)) return false;
        const Piles = [];
        for (const pile of piles) {
            if (not(pile instanceof Array)) return false;

            Piles.push(pile);
        }

        return true;
    },

    isEnding(state) {
        const height = state.height;
        const width = state.width;

        let ok = true;
        for (let i = 0; i < height - 2; i = i + 2) {
            if (state.Row[i] !== 1) ok = false;
        }

        for (let i = 0; i < width - 2; i = i + 2) {
            if (state.Col[i] !== 1) ok = false;
        }

        if (ok) return "won";
        return null;
    }
};
exports.default = S27;