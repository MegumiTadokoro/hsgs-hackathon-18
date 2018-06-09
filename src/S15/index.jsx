import React from "react";
import Grad from "./lib/grad.js";

import "./index.less";

function Square(props) {
  return (
    <button
      className={"square" + (props.value === null ? "" : "-" + props.value)}
      onClick={props.onClick}
      disabled={props.isOver}
    />
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
            key={"data" + i + "-" + j}
            value={this.props.state.field[i][j]}
            isOver={this.props.isEnding}
            onClick={() => this.props.place({ x: i, y: j })}
          />
        );
      subarray.push(
        <div className="board-side" key={"sidej" + j}>
          {this.props.state.cntj[j]}
        </div>
      );
      array.push(
        <div className="board-row" key={"line" + j}>
          {subarray}
        </div>
      );
    }
    let subarray = [];
    for (let i = 0; i < N; ++i) {
      subarray.push(
        <div className="board-side" key={"sidei" + i}>
          {this.props.state.cnti[i]}
        </div>
      );
    }
    subarray.push(
      <button className="board-side" key="resetBtn" onClick={this.props.reset}>
        Reset
      </button>
    );
    array.push(subarray);

    let error = [];
    if (err !== null) error.push(JSON.stringify(err));

    return (
      <div className="s15">
        <div>{array}</div>
        <br />
        <br />
        <br />
        <h1 style={{ color: "red" }}>{error}</h1>
        <h1 style={{ color: "green" }}>
          {this.props.isEnding === "won" ? "YOU WON" : ""}
        </h1>
      </div>
    );
  }
}

export default Board;
