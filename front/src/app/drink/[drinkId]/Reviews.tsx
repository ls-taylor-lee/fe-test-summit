"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Modal from "MyApp/components/Modal";
import ReviewForm from "MyApp/components/ReviewForm";
import SingleReview from "MyApp/components/SingleReview";
import { useReviews } from "MyApp/hooks/useReviews";
import { IReview, IReviewForm } from "MyApp/types/drinks";
import { useCallback, useState } from "react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReview, setCurrentReview] = useState<IReview | null>(null);
  const [newReview, setNewReview] = useState({ ...InitialReviewFormData });

  const handleSaveReview = useCallback(() => {
    if (isEditing) {
      handleUpdateReview({ ...currentReview, drinkId, ...newReview });
    } else {
      handleAddReview(newReview);
    }

    closeModal();
  }, [currentReview, newReview]);

  const openModalForAdd = () => {
    setNewReview({ ...InitialReviewFormData });
    setIsEditing(false);
    setCurrentReview(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (review: IReview) => {
    setNewReview(review);
    setIsEditing(true);
    setCurrentReview(review);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleAddReview = (newReview: IReviewForm) => {
    addReview({
      newReview: {
        drinkId,
        ...newReview,
      },
    });
  };

  const handleUpdateReview = (newReview: IReview) => {
    updateReview({ reviewId: newReview.id || 0, updatedReview: newReview });
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
        <button className="text-black dark:text-white px-4 py-2 rounded" onClick={() => openModalForAdd()}>
          <PlusCircleIcon width={24} height={24} />
        </button>
      </div>

      {reviews && reviews?.items.length > 0 ? (
        <ul className="space-y-6">
          {reviews?.items.map((review: IReview) => (
            <SingleReview
              key={review.id}
              review={review}
              openModalForEdit={openModalForEdit}
              handleReviewDelete={handleReviewDelete}
            />
          ))}
        </ul>
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ReviewForm
          newReview={newReview}
          setNewReview={setNewReview}
          handleSaveReview={handleSaveReview}
          isEditing={isEditing}
        />
      </Modal>
    </section>
  );
}
