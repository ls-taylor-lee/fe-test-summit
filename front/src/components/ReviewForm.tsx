"use client";

import { IReviewForm } from "MyApp/types/drinks";
import StarRating from "./StarRating";

interface IReviewFormProps {
  isEditing: boolean;
  newReview: IReviewForm;
  setNewReview: (review: IReviewForm) => void;
  handleSaveReview: () => void;
}

export default function ReviewForm({ isEditing, newReview, setNewReview, handleSaveReview }: IReviewFormProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Review" : "Add a New Review"}</h3>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-black bg-white dark:text-white dark:bg-black"
          value={newReview.user_name}
          onChange={(e) => setNewReview({ ...newReview, user_name: e.target.value })}
        />
      </div>

      {/* Star Rating */}
      <div className="mb-4">
        <label className="block mb-2">Rating</label>
        <StarRating
          rating={newReview.rating}
          onRatingChange={(newRating) => setNewReview({ ...newReview, rating: newRating })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Review</label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-black bg-white dark:text-white dark:bg-black"
          value={newReview.description}
          onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
        />
      </div>

      <button
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 text-white transition w-full"
        onClick={() => handleSaveReview()}
      >
        {isEditing ? "Save Changes" : "Submit Review"}
      </button>
    </div>
  );
}
