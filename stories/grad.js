import React from "react";
import { storiesOf } from "@storybook/react";
import Board from "../src/S15/index.jsx";
import Game from "../src/S15/lib/grad.js";
import ReactGame from "react-gameboard/lib/component";
import { withKnobs, number } from "@storybook/addon-knobs";

const Grad = ReactGame(Game);

const gradStory = storiesOf("Grad", module);

gradStory.addDecorator(withKnobs);

gradStory
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
    const n = number("Number of rows", 6);
    const m = number("Number of columns", 6);
    return (
      <Grad n={n} m={m}>
        <Board />
      </Grad>
    );
  });
