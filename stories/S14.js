import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, number } from '@storybook/addon-knobs';
import Board from "../src/S14/index.jsx";
import Game from "../src/S14/lib/S14.js";
import ReactGame from "react-gameboard/lib/component";

const WordPuzzle = ReactGame(Game);

storiesOf("Word Puzzle (S14)", module)
  .addDecorator(withKnobs)
  .add("Div 3 mode", () => (
    <WordPuzzle height={8} width={8}>
      <Board />
    </WordPuzzle>
  ))
  .add("Div 2 mode", () => (
    <WordPuzzle height={10} width={10}>
      <Board />
    </WordPuzzle>
  ))
  .add("Div 1 mode", () => (
    <WordPuzzle height={12} width={12}>
      <Board />
    </WordPuzzle>
  ))
  .add("Special mode - for IOIers only", () => (
    <WordPuzzle height={17} width={17}>
      <Board />
    </WordPuzzle>
  ))
  .add("Custom mode", () => {
    const options = {
      range: true,
      step: 1,
      min: 2,
      max: 100
    };
    const input_n = number("Số hàng", 10, options);
    const input_m = number("Số cột", 10, options);
    const n = input_n > 1 ? input_n : 10;
    const m = input_m > 1 ? input_m : 10;
    return (
      <WordPuzzle height={n} width={m}>
        <Board />
      </WordPuzzle>
    );
  });


