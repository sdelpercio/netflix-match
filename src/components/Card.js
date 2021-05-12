import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useAnimation } from "framer";

const Card = ({ children, onVote, ...props }) => {
  const cardElem = useRef(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const rotations = [
    "rotate-3",
    "rotate-6",
    "rotate-12",
    "-rotate-3",
    "-rotate-6",
    "-rotate-12",
  ];

  const [vote, setVote] = useState(undefined);
  const [constrained, setConstrained] = useState(true);
  const [direction, setDirection] = useState();
  const [velocity, setVelocity] = useState();

  const generateClassNames = () => {
    return (
      "absolute bg-gray-200 rounded-2xl w-1/2 md:w-1/3 transform " +
      rotations[Math.floor(Math.random() * rotations.length)]
    );
  };

  const getVote = (childNode, parentNode) => {
    const childRect = childNode.getBoundingClientRect();
    const parentRect = parentNode.getBoundingClientRect();
    let result =
      parentRect.left >= childRect.right
        ? false
        : parentRect.right <= childRect.left
        ? true
        : undefined;
    return result;
  };

  // determine direction of swipe based on velocity
  const getDirection = () => {
    return velocity >= 1 ? "right" : velocity <= -1 ? "left" : undefined;
  };

  const getTrajectory = () => {
    setVelocity(x.getVelocity());
    setDirection(getDirection());
  };

  const flyAway = (min) => {
    const flyAwayDistance = (direction) => {
      const parentWidth = cardElem.current.parentNode.getBoundingClientRect()
        .width;
      const childWidth = cardElem.current.getBoundingClientRect().width;
      return direction === "left"
        ? -parentWidth / 2 - childWidth / 2
        : parentWidth / 2 + childWidth / 2;
    };

    if (direction && Math.abs(velocity) > min) {
      setConstrained(false);
      controls.start({ x: flyAwayDistance(direction) });
    }
  };

  useEffect(() => {
    const unsubscribeX = x.onChange(() => {
      const childNode = cardElem.current;
      const parentNode = cardElem.current.parentNode;
      const result = getVote(childNode, parentNode);
      result !== undefined && onVote(result);
    });

    return () => unsubscribeX();
  });

  return (
    <motion.div
      className={generateClassNames()}
      animate={controls}
      dragConstraints={constrained && { left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      ref={cardElem}
      style={{ x }}
      onDrag={getTrajectory}
      onDragEnd={() => flyAway(500)}
      whileTap={{ scale: 1.1 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
export default Card;
