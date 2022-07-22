import React from "react";
import { RiStarFill, RiStarLine, RiStarHalfFill } from "react-icons/ri";

const RatingStars = ({ rating }) => {
  let stars = [1, 1, 1, 1, 0];
  let numFillStar = Math.floor(rating);
  let numHalfStar = Math.round(rating) < 0 ? 1 : 0;
  let numLineStar = 5 - numFillStar - numHalfStar;

  // console.log(numFillStar, numHalfStar, numLineStar);

  return (
    <>
      {stars.map((nums, i) =>
        nums === 1 ? (
          <RiStarFill key={i} />
        ) : nums === 0.5 ? (
          <RiStarHalfFill key={i} />
        ) : (
          <RiStarLine key={i} />
        ),
      )}
    </>
  );
};

export default RatingStars;
