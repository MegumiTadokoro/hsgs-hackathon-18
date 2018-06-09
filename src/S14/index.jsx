import React from "react";
import WordPuzzle from "./lib/S14.js";

import "./index.css";

var id = 0;

function Square(props) {
  return (
    <button
      key={id++}
      className={"square" + (props.value === 11 ? " blocked" : " empty")}
      onClick={props.onClick}
      disabled={(props.value === 11 || props.value < 0) || (props.isEnding === "won")}
    >
      {((props.value === 10 || props.value === 11) ? null : (props.value < 0 ? -props.value - 1 : props.value))}
    </button>
  );
}

class Board extends React.Component {
  render() {
    const err = this.props.error ? this.props.error.message : null;
    let array = [];

    const height = this.props.state.height;
    const width = this.props.state.width;
    const Piles = this.props.state.Piles;
    const Dict = this.props.state.Dict;
    const isEnding = this.props.isEnding;

    for (let i = 0; i < height; i++) {
      let subarray = [];
      for (let j = 0; j < width; j++)
        subarray.push(
          <Square
            value={Piles[i][j]} isEnding={isEnding}
            onClick={() => this.props.move({ x: i, y: j })}
          />
        );
      array.push(<div>{subarray}</div>);
    }
    // Dictionary
    let dictionary = [];
    console.log(isEnding);
    if (isEnding !== "won" && isEnding !== "lose") {
      dictionary.push(<div>Words haven't been found</div>);
      Dict.forEach(function (value) {
        dictionary.push(<div>{value}</div>);
      });
    }
    else if (isEnding === "won") {
      dictionary.push(
        <div>
          <p className={"note " + "mid1"}>{(isEnding === "won" ? "Congratulations, you have" : "")}</p>
          <p className={"note " + "mid2"}>{(isEnding === "won" ? "found all the numbers!" : "")}</p>
        </div>
      );
    }
    else {
      dictionary.push(
        <div>
          <h1 className={"note " + "mid1"}>{(isEnding === "won" ? "Sadly, you still have" : "")}</h1>
          <h1 className={"note " + "mid2"}>{(isEnding === "won" ? "word to find!" : "")}</h1>
        </div>
      );
    }
    return (
      <div>
        <table><tbody>{array}</tbody></table>
        {dictionary}
      </div>
    );
  }
}

export default Board;
