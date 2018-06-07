import React from "react";
import Grad from "./lib/grad.js";

import "./index.css";

class Row extends React.Component {
  render() {
    const array = [];
    for (let i = 0; i < this.props.N; ++i)
      array.push(
        <button
          onClick={() =>
            this.props.place({
              x: i,
              y: this.props.M
            })
          }
          className={this.props.field[i][j]}
        >
          {this.props.field[i][j]}
        </button>
      );
    return <div>{array}</div>;
  }
}

class Board extends React.Component {
  render() {
    const field = this.props.state.field;
    const N = field.length;
    const M = field[0].length;

    const err = this.props.error ? this.props.error.message : null;
    const array = [];
    for (let j = 0; j < M; ++j)
      array.push(<Row N={N} M={j} field={this.props.state.field} />);
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
