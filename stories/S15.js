import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/S15/index.jsx";
import Game from "../src/S15/lib/grad.js";
import ReactGame from "react-gameboard/lib/component";

const Grad = ReactGame(Game);

storiesOf("Grad (S15)", module)
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
    const options = {
      range: true,
      step: 1,
      min: 2,
      max: 100
    };
    const input_n = number("Row", 6, options);
    const input_m = number("Column", 6, options);
    const n = input_n > 1 ? input_n : 6;
    const m = input_m > 1 ? input_m : 6;
    return (
      <Grad n={n} m={m}>
        <Board />
      </Grad>
    );
  });
