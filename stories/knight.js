import React from "react";
import { storiesOf } from "@storybook/react";
import Chess from "../knight/index.jsx";
import Game from "../knight/lib/knight.js";
import ReactGame from "react-gameboard/lib/component";

const KN = ReactGame(Game);

storiesOf("Knight", module)
  .add("Easy", () => (
    <KN row={3} col={4}>
      <Chess/>
    </KN>
  ))
  .add("Impossible", () => (
    <KN row={8} col={8}>
      <Chess/>
    </KN>
  ));
