import React from "react";
import Grad from "./lib/grad.js";

import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  render() {
    const field = this.props.state.field;
    // console.log(field);
    const N = field.length;
    const M = field[0].length;

    const err = this.props.error ? this.props.error.message : null;
    const array = [];
    for (let j = 0; j < M; ++j) {
      let subarray = [];
      for (let i = 0; i < N; ++i)
        subarray.push(
          <Square
            value={this.props.state.field[i][j]}
            onClick={() => this.props.place({ x: i, y: j })}
          />
        );
      subarray.push(
        <div className="board-side">{this.props.state.cntj[j]}</div>
      );
      array.push(<div className="board-row">{subarray}</div>);
    }
    let subarray = [];
    for (let i = 0; i < N; ++i) {
      subarray.push(
        <div className="board-side">{this.props.state.cnti[i]}</div>
      );
    }
    subarray.push(<div className="board-side" />);
    array.push(subarray);
    return (
      <div>
        <div>{array}</div>
        <pre>{JSON.stringify(this.props)}</pre>
        <pre>{JSON.stringify(err)}</pre>
      </div>
    );
  }
}

export default Board;
