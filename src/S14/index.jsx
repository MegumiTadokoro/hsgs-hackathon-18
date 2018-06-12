import React from "react";
import WordPuzzle from "./lib/S14.js";

import "./index.less";

function Square(props) {
  return (
    <button
      className={"square" + (props.value === 11 ? " blocked" : (props.value < 0 ? " unclick" : ""))}
      onClick={props.onClick}
      disabled={(props.value === 11 || props.value < 0) || (props.isEnding === "won")}
    >
      {((props.value === 10 || props.value === 11) ? null : (props.value < 0 ? -props.value - 1 : props.value))}
    </button>
  );
}

class Board extends React.Component {
  render() {
    let space = [];
    for(let i = 0; i < 5; i++) space.push(<br key = {"br" + i} />);
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
            key={"data" + i + "-" + j}
            value={Piles[i][j]} isEnding={isEnding} x = {i} y = {j}
            onClick={() => this.props.move({ x: i, y: j })}
          />
        );
      array.push(<div className = "newline" key = {"line" + i}>{subarray}</div>);
    }
    /*console.log(isEnding);
    console.log("Print out dictionary");
    Dict.forEach(function (value) {
      console.log(value);
    });*/
    let dictionary = [], cnt = 1;
    if (isEnding !== "won") {
      dictionary.push(<div className = "note" key = {"not_won"}>Những số còn đang đợi bạn...</div>);
      Dict.forEach(function (value) {
        dictionary.push(<span className ="note" key = {"word" + cnt}>{value + "; "}</span>);
        cnt++;
      });
    }
    else {
      dictionary.push(
        <div key = {"WON"}>
          <p className="note">{(isEnding === "won" ? "Wow, bạn tìm được hết tất cả các số rồi! <3" : "")}</p>
        </div>
      );
    }

    var tot = this.props.state.tot, progress, w;
    if(tot === 0) progress = 100;
    else progress = 100*(tot-cnt)/tot;
    w = progress/5;

    /*
        <div className="meter">
          <span style={{width: (w), }}>{progress.toFixed(2) + '%'}</span>
        </div>
    */

    return (
      <div className = "s14">
        <span className = "note">Bạn có phải là <b style={{font:"bold"}}>
          T<span style={{color: "#ff0000"}}>ourist</span>
        </b>?</span>
        <label className="btn" onClick = {() => this.props.reset()}> Reset </label>
        <br/>
        <br/>
        <br/>
        <div>{array}</div>
        {dictionary}
        <h1 className = "footer">Made by Megumi Tadokoro, tested by Nguyen Tuan Dung</h1>
      </div>
    );
  }
}

export default Board;
