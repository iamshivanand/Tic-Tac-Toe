import React from "react";
import Cross from "../../images/cross.png";
import Circle from "../../images/circle.png";

import { motion } from "framer-motion";

const squaresVariants = {
  hidden: {
    opacity: 0,
    scale: 1.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
    },
  },
};

const Square = ({ value, onClick, flag }) => {
  const style = flag ? `squares ${alert}` : "squares";
  return (
    <div className={style} onClick={onClick}>
      {value !== null && (
        <div>
          {value === "X" && (
            <motion.img
              src={Cross}
              alt="cross"
              variants={squaresVariants}
              initial="hidden"
              animate="visible"
            />
          )}
          {value === "O" && (
            <motion.img
              src={Circle}
              alt="circle"
              variants={squaresVariants}
              initial="hidden"
              animate="visible"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Square;
