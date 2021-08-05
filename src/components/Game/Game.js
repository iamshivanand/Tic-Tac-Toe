import React, { useState, useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import "./style.css";
import { calculateWinner } from "./Helper";

//components
import Board from "./Board";

import { motion } from "framer-motion";

const settingButtonVariants = {
  hover: {
    rotate: 360,
    scale: 1.5,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const allvariants = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: { opacity: 1, y: 0 },
};

const Game = ({ player1Choice, player2Choice, isSinglePlayer }) => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const [player1Win, setPlayer1Win] = useState(0);
  const [player2Win, setPlayer2Win] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [winnerName, setWinnerName] = useState();
  const [flag1, setFlag1] = useState(false);
  const xO = xIsNext ? "X" : "O";
  useEffect(() => {
    if (isSinglePlayer && player1Choice.mode === "O") {
      setXisNext(false);
    }
  }, []);
  const [arr, setArr] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    var flag = false;
    for (let k = 0; k < arr.length; k++) {
      if (i === arr[k]) {
        flag = true;
        setFlag1(false);
      }
    }

    if (!flag) {
      setFlag1(true);
      return;
    }

    //return if won or occupied
    if (winner || squares[i]) {
      setShowPopup(true);
      //   console.log("restart again");
      if (winner === "X") {
        //if winner is X then check which player have choose X
        if (player1Choice.mode === "X") {
          setWinnerName(player1Choice.name);
          setPlayer1Win(player1Win + 1);
        } else {
          setWinnerName(player2Choice.name);
          setPlayer2Win(player2Win + 1);
        }
      }
      if (winner === "O") {
        if (player1Choice.mode === "O") {
          setWinnerName(player1Choice.name);
          setPlayer1Win(player1Win + 1);
        } else {
          setWinnerName(player2Choice.name);
          setPlayer2Win(player2Win + 1);
        }
      }

      return;
    }
    //hum kateengay
    squares[i] = xO;

    //array changes
    let arr1 = [];
    for (let k = 0; k < arr.length; k++) {
      if (arr[k] !== i) {
        // console.log(arr[k]);
        arr1.push(arr[k]);
      }
    }

    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    if (!isSinglePlayer) {
      setXisNext(!xIsNext);
    }

    //computer ji katengay
    setTimeout(() => {
      if (isSinglePlayer) {
        var item = arr1[Math.floor(Math.random() * arr1.length)];
        console.log(item);
        if (xO === "X") {
          squares[item] = "O";
        }
        if (xO === "O") {
          squares[item] = "X";
        }

        //array changes
        let arr2 = [];
        for (let k = 0; k < arr1.length; k++) {
          if (arr1[k] !== item) {
            // console.log(arr[k]);
            arr2.push(arr1[k]);
          }
        }
        setArr([...arr2]);

        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        //   setXisNext(!xIsNext);
      }
    }, 1000);
  };
  const restartGame = () => {
    setShowPopup(false);
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setWinnerName("");
    if (isSinglePlayer && player1Choice.mode === "O") {
      setXisNext(false);
      setArr([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    } else {
      setXisNext(true);
      setArr([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    }
  };
  //   console.log("Winner", winner);

  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {showPopup && (
        <div className="popUpWrapper">
          <motion.div className="popUp" variants={allvariants}>
            <h2 className={winner === "X" ? "X" : "O"}>
              {winnerName} {!winner ? "Match Draw!!" : "Won!!"}
            </h2>
            <button className="restartbutton" onClick={restartGame}>
              Restart
            </button>
          </motion.div>
        </div>
      )}

      <motion.div
        className="detailsContainer"
        variants={allvariants}
        transition={{ type: "spring", delay: 0.6 }}
      >
        <div className="playerName">
          <span className={xO === player1Choice.mode ? ` ${xO}` : null}>
            {player1Choice.name} ({player1Choice.mode})
          </span>
        </div>
        <div className="score">
          <span>
            {player1Win}-{player2Win}
          </span>
        </div>
        <div className="playerName">
          <span className={xO === player2Choice.mode ? ` ${xO}` : null}>
            {player2Choice.name} ({player2Choice.mode})
          </span>
        </div>
      </motion.div>
      <motion.div
        className="gameBoard"
        variants={allvariants}
        transition={{ type: "spring", delay: 0.7 }}
      >
        <Board
          squares={history[stepNumber]}
          onClick={handleClick}
          flag1={flag1}
        />
      </motion.div>
      <motion.div
        className="settingButton"
        variants={settingButtonVariants}
        transition={{ type: "spring", delay: 0.8 }}
        whileHover="hover"
      >
        <SettingsIcon />
      </motion.div>
    </motion.div>
  );
};

export default Game;
