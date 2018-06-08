import React from "react";
import S01 from "./lib/S01.js";
import "./index.css"

class Column extends React.Component {
  render() {
    const array = [];
    for (let i = 0; i <= 5; ++i) {
      if (i < 5) array.push(<td key={i} className={this.props.type === 0 ? "s01" : "s01 lastCol"}>{this.props.col[i]}</td>)
      else array.push(<td key={i} className={this.props.type === 0 ? "s01 lastRow" : "s01 lastRow lastCol"}>{this.props.col[i]}</td>)
    }
    return <tr>{array}</tr>
  }  
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      A: null, B: null, C: null, D: null, E: null,
    }
    
    this.handleChange = this.handleChange.bind(this);
  }

  async setStateAsync(state) {
    return new Promise(resolve => this.setState(state, resolve));
  }

  async handleChange(event) {
    const value = event.target.value
    if(parseInt(value) != value && value != "") return null
    const name = event.target.name
    await this.setStateAsync({[name]: value})
    for(let i = 0; i < 5; ++i) for(let j = 0; j < 5; ++j) {
      if(this.props.state.board[i][j] === name) {
        if(value) {
          if(parseInt(this.props.state.board2[i][j]) == this.props.state.board2[i][j]) {
            this.props.state.board2[5][j] = parseInt(this.props.state.board2[5][j]) + parseInt(this.props.state.board2[i][j])
            this.props.state.board2[i][5] = parseInt(this.props.state.board2[i][5]) + parseInt(this.props.state.board2[i][j])
          }
          this.props.state.board2[i][j] = value
          if(parseInt(this.props.state.board2[i][j]) == this.props.state.board2[i][j]) {
            this.props.state.board2[5][j] = parseInt(this.props.state.board2[5][j]) - parseInt(this.props.state.board2[i][j])
            this.props.state.board2[i][5] = parseInt(this.props.state.board2[i][5]) - parseInt(this.props.state.board2[i][j])
          }
        }
        else {
          if(parseInt(this.props.state.board2[i][j]) == this.props.state.board2[i][j]) {
            this.props.state.board2[5][j] = parseInt(this.props.state.board2[5][j]) + parseInt(this.props.state.board2[i][j])
            this.props.state.board2[i][5] = parseInt(this.props.state.board2[i][5]) + parseInt(this.props.state.board2[i][j])
          }
          this.props.state.board2[i][j] = name
          if(parseInt(this.props.state.board2[i][j]) == this.props.state.board2[i][j]) {
            this.props.state.board2[5][j] = parseInt(this.props.state.board2[5][j]) - parseInt(this.props.state.board2[i][j])
            this.props.state.board2[i][5] = parseInt(this.props.state.board2[i][5]) - parseInt(this.props.state.board2[i][j])
          }
        }
      }
    }
    this.props.move({x: this.state})
  }

  render() {
    return (
      <div>
         <table>
          <tbody>
              <pre>             Current Board             </pre>
              <div>
                <Column col={this.props.state.board2[0]} type={0}/>  
                <Column col={this.props.state.board2[1]} type={0}/>  
                <Column col={this.props.state.board2[2]} type={0}/> 
                <Column col={this.props.state.board2[3]} type={0}/>  
                <Column col={this.props.state.board2[4]} type={0}/>
                <Column col={this.props.state.board2[5]} type={1}/>
              </div>

              <tr><pre>                     </pre></tr>

              <pre>             Original Board            </pre>
              <div>
                <Column col={this.props.state.board[0]}/>  
                <Column col={this.props.state.board[1]}/>  
                <Column col={this.props.state.board[2]}/> 
                <Column col={this.props.state.board[3]}/>  
                <Column col={this.props.state.board[4]}/>
                <Column col={this.props.state.board[5]}/>
              </div>

          </tbody>
        </table>
        <br/>
          <div className="submit-form">
            <span>
              A = <input name="A" type="text" maxlength="1" value={this.state.A} onChange={this.handleChange}/>
            </span>
            <span>
              B = <input name="B" type="text" maxlength="1" value={this.state.B} onChange={this.handleChange}/>
            </span>
            <span>
              C = <input name="C" type="text" maxlength="1" value={this.state.C} onChange={this.handleChange}/>
            </span>
            <span>
              D = <input name="D" type="text" maxlength="1" value={this.state.D} onChange={this.handleChange}/>
            </span>
            <span>
              E = <input name="E" type="text" maxlength="1" value={this.state.E} onChange={this.handleChange}/>
            </span>
          </div>
          <br/>
      </div>
    )
  }
}

export default Board;
