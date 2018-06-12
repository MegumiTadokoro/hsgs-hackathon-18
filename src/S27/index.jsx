import React from "react";
import S27 from "./lib/S27.js";
 
import "./index.less";
 
function Square(props) {
  return (
    <button
      className={"square " + (props.status === 1 ? "bl" : "")}
      onClick={props.onClick}
      disabled={(props.value === '=' || props.edge || (props.isEnding === "won"))}
    >
      {((props.value === 1000000007) ? null : props.value)}
    </button>
  );
}
 
class Board extends React.Component {
  render() {
    const err = this.props.error ? this.props.error.message : null;
    let array = [];
 
    const isEnding = this.props.isEnding;
    const Piles = this.props.state.Board;
    const Row = this.props.state.Row;
    const Column = this.props.state.Col;
    const height = this.props.state.height;
    const width = this.props.state.width;

    console.log("print table");
    console.table(Piles);
    console.table(Row);
    console.table(Column);
    
    for (let i = 0; i < height; i++) {
      let subarray = [];
      for (let j = 0; j < width; j++) {
        let status = 0;
        if((i % 2 === 1 && j % 2 === 1) || 
        (i > height - 3 && j > width - 3) || 
        (i === height - 1 && j % 2 === 1) ||
        (i % 2 === 1 && j === width - 1)) status = 1;
        
        subarray.push(
          <Square
            key={"data" + i + "-" + j}
            status = {status}
            edge = {i === height - 1 || j === width - 1}
            value={Piles[i][j]}
            isEnding={isEnding}
            onClick={() => this.props.move({ x: i, y: j })}
          />
        );
      }
      if(i % 2 === 0 && i !== height - 1) {
        if(Row[i] === 1) 
          subarray.push(<span key = {"AC" + i} className = "note" style = {{color : "lightgreen", marginLeft : "8px"}}>AC</span>)
        else 
          subarray.push(<span key = {"WA" + i} className = "note" style = {{color : "lightcoral", marginLeft : "8px"}}>WA</span>)
      }
      array.push(<div className = "newline" key = {"line" + i}>{subarray}</div>);
    }
    let subarray = [];
    for(let i = 0; i < width-2; i++) {
      if(i % 2 === 0) {
        if(Column[i] === 1) 
      subarray.push(<span key = {"ac" + i} className = "note" style = {{color : "lightgreen", margin : "8px"}}>AC</span>)
        else 
          subarray.push(<span key = {"wa" + i} className = "note" style = {{color : "lightcoral", margin : "8px"}}>WA</span>)
      }
      else subarray.push(<span key = {"wa" + i} className = "note" style = {{color : "lightcoral", marginLeft : "53px"}}> </span>);
    }
    array.push(<div className = "newline" key = {"line_end"}>{subarray}</div>);
    
    return (
      <div className = "s27">
        <span className = "note">Hoàng tử Thảo Nguyên giải được, còn bạn thì sao?</span>
        <label className="btn" onClick = {() => this.props.reset()}> Reset </label>
        <br/>
        <br/>
        <br/>
        <div>{array}</div>
        <div key = {"WON"}>
          <span className="note">{(isEnding === "won" ? "Wow, bạn tìm được hết tất cả các số rồi! <3" : null)}</span>
        </div>
        <h1 className = "footer">Made by Megumi Tadokoro and Futymy</h1>
      </div>
    );
  }
}

export default Board;