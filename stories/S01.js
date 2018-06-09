import React from "react";
import { storiesOf } from "@storybook/react";
import { number, withKnobs } from "@storybook/addon-knobs";
import Board from "../src/S01/index.jsx";
import Game from "../src/S01/lib/S01.js";
import ReactGame from "react-gameboard/lib/component";

const S01 = ReactGame(Game);

storiesOf("S01", module)
  .addDecorator(withKnobs)
  .add("Easy Mode", () => (
    <S01 N={4}>
      <Board />
    </S01>
  ))
  .add("Medium Mode", () => (
    <S01 N={5}>
      <Board />
    </S01>
  ))
  .add("Hard Mode", () => (
    <S01 N={7}>
      <Board />
    </S01>
  ))
  .add("Custom", () => {
    const options = {
      range: true,
      step: 1,
      min: 1,
      max: 10
    };
    return (
      <S01 N={number("Size of board", 5, options)}>
        <Board />
      </S01>
    );
  });
