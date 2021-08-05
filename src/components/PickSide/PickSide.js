import React, { useState } from "react";

import "./style.css";
//images are imported
import Cross from "../../images/cross.png";
import Circle from "../../images/circle.png";

import { motion } from "framer-motion";
const friendbuttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
    backgroundColor: "rgba(255, 255, 255, 1)",
    boxShadow: "0px 0px 20px rgba(200, 200, 200, 1)",
    transition: {
      duration: 0.3,
    },
  },
};
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const allvariants = {
  hidden: { opacity: 0, y: "-100vh" },
  visible: { opacity: 1, y: 0 },
};
const buttonvariants = {
  hidden: { opacity: 0, x: "-100vw" },
  visible: { opacity: 1, x: 0 },
};

const PickSide = ({
  setPlayer1Choice,
  setPlayer2Choice,
  player2Choice,
  player1Choice,
  setShowPickSide,
  setSshowGame,
  setShowChooseMode,
}) => {
  const [value, setValue] = useState();
  //   console.log("value: ", value);

  const handleChangeX = () => {
    setPlayer1Choice({ ...player1Choice, mode: "X" });
    setValue("X");
    setPlayer2Choice({ ...player2Choice, mode: "O" });
  };
  const handleChangeO = () => {
    setPlayer1Choice({ ...player1Choice, mode: "O" });
    setPlayer2Choice({ ...player2Choice, mode: "X" });
    setValue("O");
  };
  const handleContinue = () => {
    setShowPickSide(false);
    setSshowGame(true);
  };
  const handleBackButton = () => {
    setShowChooseMode(true);
    setShowPickSide(false);
    player1Choice.mode = "";
  };
  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={allvariants}
        initial="hidden"
        animate="visible"
        transition={{ type: "spring", delay: 0.6 }}
      >
        <h1>
          <span style={{ color: "red" }}>{player1Choice.name}</span> Pick your
          side
        </h1>
      </motion.div>
      <form>
        <div className="selectImage">
          <motion.div
            className="radioButton"
            variants={allvariants}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", delay: 0.7 }}
          >
            <label>
              <img src={Cross} alt="select Cross" />
              <br />
              <input
                type="radio"
                id="Cross"
                name="CrossImage"
                value="X"
                checked={value === "X"}
                onChange={handleChangeX}
              />
            </label>
          </motion.div>
          <motion.div
            className="radioButton"
            variants={allvariants}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", delay: 0.8 }}
          >
            <label>
              <img src={Circle} alt="select Circle" />
              <br />
              <input
                type="radio"
                id="Circle"
                name="CircleImage"
                value="O"
                checked={value === "O"}
                onChange={handleChangeO}
              />
            </label>
          </motion.div>
        </div>
      </form>
      <div>
        {player1Choice.mode && (
          <motion.div
            className="buttonContainer"
            variants={buttonvariants}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring" }}
          >
            <button className="continueButton" onClick={handleContinue}>
              Continue
            </button>
          </motion.div>
        )}
        <div>
          <motion.button
            variants={friendbuttonVariants}
            whileHover="hover"
            type="submit"
            className="restartbutton"
            onClick={handleBackButton}
          >
            Back
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PickSide;
