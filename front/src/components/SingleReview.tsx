"use client";

import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";
import moment from "moment";
import { IReview } from "MyApp/types/drinks";
import ReviewStars from "./ReviewStars";

export default function SingleReview({
  review,
  openModalForEdit,
  handleReviewDelete,
}: {
  review: IReview;
  openModalForEdit: (review: IReview) => void;
  handleReviewDelete: (reviewId: number) => void;
}) {
  return (
    <li key={review.id} className="p-6">
      <div className="flex justify-between mb-2">
        <div className="text-lg font-bold">{review.user_name}</div>
        <div className="flex items-center">
          <ReviewStars rating={review.rating} />
        </div>
      </div>
      <p className="text-gray dark:text-gray-300 text-sm mb-4">
        {moment(review.updatedAt).format("YYYY-MM-DD h:mm:ss a")}
      </p>
      <p className="text-gray dark:text-gray-300 text-base mb-4">{review.description}</p>
      <div className="flex space-x-2 justify-end mb-4">
        <button className="text-blue-600 hover:text-blue-800 transition" onClick={() => openModalForEdit(review)}>
          <PencilSquareIcon width={20} height={20} />
        </button>
        <button
          className="text-red-600 hover:text-red-800 transition"
          onClick={() => handleReviewDelete(review.id || 0)}
        >
          <TrashIcon width={20} height={20} />
        </button>
      </div>
      <hr className="border-t-2 border-gray-300" />
    </li>
  );
}
