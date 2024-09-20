import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline"; // Importing outline star
import { StarIcon } from "@heroicons/react/24/solid"; // Importing filled star
import React, { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleClick = (newRating: number) => {
    onRatingChange(newRating);
  };

  const handleMouseEnter = (index: number) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(0);
  };

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          className="cursor-pointer"
        >
          {star <= (hoveredStar || rating) ? (
            <StarIcon className="h-8 w-8 text-yellow-400" />
          ) : (
            <StarOutlineIcon className="h-8 w-8 text-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
