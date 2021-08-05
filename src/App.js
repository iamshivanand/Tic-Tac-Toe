import React, { useState } from "react";
import "./App.css";

import ChooseMode from "./components/chooseMode/ChooseMode";
import PickSide from "./components/PickSide/PickSide";
import Game from "./components/Game/Game";

//material ui imports
import { Grid } from "@material-ui/core";

import { AnimatePresence } from "framer-motion";

function App() {
  const [showChooseMode, setShowChooseMode] = useState(true);
  const [showPickSide, setShowPickSide] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);
  const [player1Choice, setPlayer1Choice] = useState({
    name: "",
    mode: "",
  });
  const [player2Choice, setPlayer2Choice] = useState({
    name: "",
    mode: "",
  });

  // console.log("Appplayer1Choice", player1Choice);
  // console.log("Appplayer2Choice", player2Choice);
  // console.log("isSinglePlayer", isSinglePlayer);
  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
          {showChooseMode && (
            <ChooseMode
              setPlayer1Choice={setPlayer1Choice}
              player1Choice={player1Choice}
              player2Choice={player2Choice}
              setPlayer2Choice={setPlayer2Choice}
              setShowChooseMode={setShowChooseMode}
              setShowPickSide={setShowPickSide}
              setIsSinglePlayer={setIsSinglePlayer}
            />
          )}
          {showPickSide && (
            <PickSide
              setPlayer1Choice={setPlayer1Choice}
              player1Choice={player1Choice}
              player2Choice={player2Choice}
              setPlayer2Choice={setPlayer2Choice}
              setShowChooseMode={setShowChooseMode}
              setShowPickSide={setShowPickSide}
              setShowGame={setShowGame}
            />
          )}
          {showGame && (
            <Game
              player1Choice={player1Choice}
              player2Choice={player2Choice}
              isSinglePlayer={isSinglePlayer}
              setShowChooseMode={setShowChooseMode}
              setShowGame={setShowGame}
            />
          )}
        </Grid>
      </AnimatePresence>
    </div>
  );
}

export default App;
