import React from "react";
import { storiesOf } from "@storybook/react";
import Board from "../src/S15/index.jsx";
import Game from "../src/S15/lib/grad.js";
import ReactGame from "react-gameboard/lib/component";

const Grad = ReactGame(Game);

storiesOf("Grad", module)
  .add("Demo", () => (
    <Grad n={6} m={6}>
      <Board />
    </Grad>
  ))
  .add("Auto", () => (
    <Grad>
      <Board />
    </Grad>
  ));
