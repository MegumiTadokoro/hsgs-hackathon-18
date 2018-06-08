import React from "react";
import { storiesOf } from "@storybook/react";
import { 
	number,
	withKnobs 
} from '@storybook/addon-knobs';
import Board from "../src/S15/index.jsx";
import Game from "../src/S15/lib/grad.js";
import ReactGame from "react-gameboard/lib/component";

const Grad = ReactGame(Game);

storiesOf("Grad", module)
	.addDecorator(withKnobs)
  .add("Simple Mode", () => (
    <Grad n={4} m={4}>
      <Board />
    </Grad>
  ))
  .add("Normal Mode", () => (
    <Grad n={6} m={6}>
      <Board />
    </Grad>
  ))
  .add("Expert Mode", () => (
    <Grad n={8} m={8}>
      <Board />
    </Grad>
  ))
  .add("Custom Mode", () => {
		const input_n = number("Row", 4);
    const input_m = number("Column", 4);
    const n = isNaN(input_n) ? 6 : input_n > 0 ? input_n : 6;
    const m = isNaN(input_m) ? 6 : input_m > 0 ? input_m : 6;
    return (
      <Grad n={n} m={m}>
        <Board />
      </Grad>
    );
  });
