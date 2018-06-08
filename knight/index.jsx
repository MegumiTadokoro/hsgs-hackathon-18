import React from "react";
import Knight from "./lib/knight.js";

import "./index.css";

// class Row extends React.Component {
	// render() 
	// {
		// const arr = [];
		// const K = this.props.R;
		// for (let id = 0; id < this.props.M; id++) 
		// {
			// arr.push(<button onClick={() => this.props.move({ x: {K} , y: {id} } )}></button>);
		// }
		//console.log(arr);
		// return {arr};
	// }
// }

class Chess extends React.Component 
{
	render() 
	{
		// Calculate the value of N and M
		const N = this.props.state.Board.length;
		const M = this.props.state.Board[0].length;
		//console.log(K);
		const moves = [];
		for (let i = 0; i < N; i++)
		{
			const arr = [];
			for(let j = 0; j < M; j++)
			{
				switch(this.props.state.Board[i][j])
				{
					case 0:
						arr.push(<td><button0 onClick={() => this.props.move({ x: i , y: j } )}>X</button0></td>);
						break;
					case 1:
						arr.push(<td><button1 onClick={() => this.props.move({ x: i , y: j } )}>O</button1></td>);
						break;
					case 2:
						arr.push(<td><button2 onClick={() => this.props.move({ x: i , y: j } )}>X</button2></td>);
						break;
					case 3:
						arr.push(<td><button3 onClick={() => this.props.move({ x: i , y: j } )}>X</button3></td>);
						break;
					default :
						;
				}
			}
			moves.push(
			<tr>
				{arr}
			</tr>);
		}
		const err = this.props.error ? this.props.error.message : null;
		return (
		<div>
			<table>
				{moves}
			</table>
			<pre>{JSON.stringify(this.props)}</pre>
			<pre>{JSON.stringify(err)}</pre>
		</div>
		);
	}
}

export default Chess;
