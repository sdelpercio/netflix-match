import React from "react";
import { Frame, useMotionValue, useTransform, useAnimation } from "framer";

// Card component with destructured props
const Card = ({
  title,
  poster_path,
  overview,
  release_date,
  original_language,
  vote_average,
  id,
  toggleMovies,
}) => {
  // To move the card as the user drags the cursor
  const xMotionValue = useMotionValue(0);
  const yMotionValue = useMotionValue(0);

  // To rotate the card as the card moves on drag
  //   const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);

  // To decrease opacity of the card when swipped
  // on dragging card to left(-200) or right(200)
  // opacity gradually changes to 0
  // and when the card is in center opacity = 1
  const opacityValue = useTransform(
    xMotionValue,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );

  // Framer animation hook
  const animControls = useAnimation();

  return (
    <div w="100px" h="200px">
      <Frame
        center
        drag="true"
        x={xMotionValue}
        y={yMotionValue}
        // rotate={rotateValue}
        opacity={opacityValue}
        dragConstraints={{ left: -1000, right: 1000 }}
        // style={style}
        onDragEnd={(event, info) => {
          // If the card is dragged only upto 150 on x-axis
          // bring it back to initial position
          if (-150 <= info.point.x <= 150) {
            animControls.start({ x: 0, y: 0 });
          } else if (info.point.x > 150) {
            // If card is dragged beyond 150
            // make it disappear
            console.log("info:", info);
            toggleMovies(event, id);

            // Making use of ternary operator
            animControls.start({ x: info.point.x < 0 ? -200 : 200 });
          } else {
            console.log("remove movie");
          }
        }}
      >
        <div key={id}>
          <h1>{title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
            alt="movie poster"
          />
          <p>{overview}</p>
          <div>
            <p>Released: {release_date}</p>
            <p>Language: {original_language}</p>
            <p>Rating: {vote_average}</p>
          </div>
        </div>
      </Frame>
    </div>
  );
};
export default Card;
