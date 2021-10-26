import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, clickRating }) => {
  return (
    <div className="rating" style={{ cursor: "pointer" }}>
      {[...Array(5)].map((_, index) => (
        <span
          onClick={() => {
            if (clickRating) {
              clickRating(index);
            }
          }}
          key={index}
        >
          {rating > index ? (
            <AiFillStar fontSize="20px" />
          ) : (
            <AiOutlineStar fontSize="20px" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
