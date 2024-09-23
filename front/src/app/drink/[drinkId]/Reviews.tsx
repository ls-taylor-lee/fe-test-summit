"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { FORM_MODE } from "MyApp/components/Form";
import SingleReview from "MyApp/components/SingleReview";
import { FormField, useModal } from "MyApp/contexts/ModalContext";
import { useReviews } from "MyApp/hooks/useReviews";
import { IReview, IReviewForm } from "MyApp/types/drinks";

const formFields: FormField[] = [
  { name: "user_name", label: "User Name", component: "input", type: "text" },
  { name: "rating", label: "Rating", component: "star-rating" },
  { name: "description", label: "Description", component: "textarea", type: "text" },
];

const InitialReviewFormData: IReviewForm = {
  user_name: "",
  rating: 5,
  description: "",
};

export default function Reviews({ drinkId }: { drinkId: number }) {
  const { reviews, isLoading, error, addReview, deleteReview, updateReview } = useReviews(drinkId, {
    offset: 0,
    length: 10,
  });

  const { openModal } = useModal();

  const handleCreate = () => {
    openModal(formFields, FORM_MODE.CREATE, { ...InitialReviewFormData }, "Add Review", (data) => {
      addReview({
        newReview: {
          drinkId,
          ...data,
        },
      });
    });
  };

  const handleEdit = (prevData: IReview) => {
    openModal(formFields, FORM_MODE.EDIT, { ...prevData }, "Edit Review", (data) => {
      updateReview({ reviewId: prevData.id || 0, updatedReview: { ...prevData, ...data } });
    });
  };

  const handleReviewDelete = (reviewId: number) => {
    deleteReview({ reviewId });
  };

  if (isLoading) return <div> Loading Reviews </div>;
  if (error) return <div> Failed to load reviews </div>;

  return (
    <section className="py-4 w-full">
      <div className="flex space-between items-center mb-4 w-full">
        <h2 className="text-2xl font-semibold">Reviews</h2>

        {/* Button to open Add Review modal */}
        <button className="text-black dark:text-white px-4 py-2 rounded" onClick={() => handleCreate()}>
          <PlusCircleIcon width={24} height={24} />
        </button>
      </div>

      {reviews && reviews?.items.length > 0 ? (
        <ul className="space-y-6">
          {reviews?.items.map((review: IReview) => (
            <SingleReview
              key={review.id}
              review={review}
              openModalForEdit={() => handleEdit({ ...review })}
              handleReviewDelete={handleReviewDelete}
            />
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}
    </section>
  );
}
