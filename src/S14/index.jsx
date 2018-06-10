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
            value={Piles[i][j]} isEnding={isEnding} x = {i} y = {j}
            onClick={() => this.props.move({ x: i, y: j })}
          />
        );
      array.push(<div>{subarray}</div>);
    }
    console.log(isEnding);
    console.log("Print out dictionary");
    Dict.forEach(function (value) {
      console.log(value);
    });
    let dictionary = [], cnt = 0;
    if (isEnding !== "won") {
      dictionary.push(<div className = "note">Những số còn đang đợi bạn...</div>);
      Dict.forEach(function (value) {
        dictionary.push(<span className ="note">{value + " "}</span>);
        cnt++;
        if(cnt % 5 === 0) dictionary.push(<br/>);
      });
    }
    else {
      dictionary.push(
        <div>
          <p className="note">{(isEnding === "won" ? "Wow, bạn tìm được hết tất cả các số rồi! <3" : "")}</p>
        </div>
      );
    }

    var tot = this.props.state.tot, progress, w;
    if(tot === 0) progress = 100;
    else progress = 100*(tot-cnt)/tot;
    w = progress/5;
    //<div>{tot + " " + cnt + " " + progress}</div>

    return (
      <div>
        <h1 className = "note">Bạn có phải là <b style={{font:"bold"}}>
          T<span style={{color: "#ff0000"}}>ourist</span>
        </b>? </h1>
        <table><tbody>{array}</tbody></table>
        <div className="meter">
          <span style={{width: (w), }}>{progress.toFixed(2) + '%'}</span>
        </div>
        {dictionary}
      </div>
    );
  }
}

export default Board;
