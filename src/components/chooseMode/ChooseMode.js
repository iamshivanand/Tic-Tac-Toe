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
const AIbuttonVariants = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
    backgroundColor: "rgb(77, 77, 255)",
    boxShadow: "0px 0px 20px rgba(0, 0, 200, 0.8)",
    color: "white",
    transition: {
      duration: 0.3,
    },
  },
};
const imageVariants = {
  hidden: {
    opacity: 0,
    y: "-100vh",
  },
  visible: {
    opacity: 1,
    y: 0,
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

const ChooseMode = ({
  setPlayer1Choice,
  setPlayer2Choice,
  player2Choice,
  player1Choice,
  setShowPickSide,
  setShowChooseMode,
  setIsSinglePlayer,
}) => {
  const [singlePlayer, setSinglePlayer] = useState(false);
  const [doublePlayer, setDoublePlayer] = useState(false);

  const handleSinglePlayer = (e) => {
    setPlayer1Choice({ ...player1Choice, name: e.target.value });
    setPlayer2Choice({ ...player2Choice, name: "AI" });
    console.log(e.target.value);
  };
  const handleSinglePlayerClick = () => {
    setShowPickSide(true);
    setShowChooseMode(false);
    setIsSinglePlayer(true);
  };
  const handleDoublePlayer = (e) => {
    if (e.target.name === "player1") {
      setPlayer1Choice({ ...player1Choice, name: e.target.value });
    }
    if (e.target.name === "player2") {
      setPlayer2Choice({ ...player2Choice, name: e.target.value });
    }
  };
  const handledoublePlayerClick = () => {
    setShowPickSide(true);
    setShowChooseMode(false);
    setIsSinglePlayer(false);
  };
  const handleBackButton = () => {
    setSinglePlayer(false);
    setDoublePlayer(false);
  };
  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {singlePlayer && (
        <div className="singlePlayerPopUpWrapper">
          <motion.div className="singlePlayerPopUp" variants={allvariants}>
            <form>
              <h2>Add Your Name</h2>
              <div className="inputField">
                <input
                  type="text"
                  placeholder="Enter your Name"
                  onChange={handleSinglePlayer}
                  required
                />
              </div>
              {player1Choice.name && (
                <div>
                  <motion.button
                    variants={friendbuttonVariants}
                    whileHover="hover"
                    type="submit"
                    className="restartbutton"
                    onClick={handleSinglePlayerClick}
                  >
                    Done
                  </motion.button>
                </div>
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
            </form>
          </motion.div>
        </div>
      )}
      {doublePlayer && (
        <div className="singlePlayerPopUpWrapper">
          <div className="singlePlayerPopUp">
            <h2>Add Players</h2>
            <div className="inputField">
              <input
                name="player1"
                type="text"
                required
                placeholder="Your Name"
                onChange={handleDoublePlayer}
              />
            </div>
            <div className="inputField">
              <input
                name="player2"
                type="text"
                required
                placeholder="Friend's Name"
                onChange={handleDoublePlayer}
              />
            </div>
            {player1Choice.name && player2Choice.name && (
              <button
                className="restartbutton"
                onClick={handledoublePlayerClick}
              >
                Done
              </button>
            )}
            <button
              type="submit"
              className="restartbutton"
              onClick={handleBackButton}
            >
              Back
            </button>
          </div>
        </div>
      )}
      <div className="imageContainer">
        <div className="cross">
          <motion.img
            src={Cross}
            alt="cross"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", stiffness: 90, delay: 0.4 }}
          />
        </div>
        <div className="circle">
          <motion.img
            src={Circle}
            alt="cross"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", stiffness: 90, delay: 0.5 }}
          />
        </div>
      </div>
      <h2>Choose your play mode</h2>

      <div className="buttonContainer">
        <div>
          <motion.button
            className="button AIbutton"
            onClick={() => {
              setSinglePlayer(true);
            }}
            variants={AIbuttonVariants}
            whileHover="hover"
          >
            With AI
          </motion.button>
        </div>
        <div>
          <motion.button
            className="button friendButton"
            onClick={() => {
              setDoublePlayer(true);
            }}
            variants={friendbuttonVariants}
            whileHover="hover"
          >
            With a friend
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChooseMode;
