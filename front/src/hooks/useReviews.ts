import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "MyApp/lib/api-client";
import { IReview } from "MyApp/types/drinks";
import { toast } from "react-toastify";

// Fetch reviews for a specific drink
const fetchReviews = async (drinkId: number, { offset, length }: { offset: number; length: number }) => {
  try {
    const res = await apiClient.get(`/api/drinks/${drinkId}/reviews`, { params: { offset, length } });
    return res.data;
  } catch (error) {
    throw new Error("Error fetching reviews");
  }
};

// Add a new review for a drink
const addReview = async (drinkId: number, review: IReview) => {
  try {
    const res = await apiClient.post(`/api/drinks/${drinkId}/reviews`, review);
    return res.data;
  } catch (error) {
    throw new Error("Error adding review");
  }
};

// Update a review
const updateReview = async (drinkId: number, reviewId: number, updatedReview: IReview) => {
  try {
    const res = await apiClient.put(`/api/drinks/${drinkId}/reviews/${reviewId}`, updatedReview);
    return res.data;
  } catch (error) {
    throw new Error("Error updating review");
  }
};

// Delete a review for a drink
const deleteReview = async (drinkId: number, reviewId: number) => {
  try {
    const res = await apiClient.delete(`/api/drinks/${drinkId}/reviews/${reviewId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error deleting review");
  }
};

// Custom hook to manage reviews
export const useReviews = (drinkId: number, { offset, length }: { offset: number; length: number }) => {
  const queryClient = useQueryClient();

  // Fetch reviews using useQuery
  const {
    data: reviews,
    error,
    isLoading,
  } = useQuery({ queryKey: ["reviews", drinkId], queryFn: () => fetchReviews(drinkId, { offset, length }) });

  // Add review using useMutation
  const addMutation = useMutation({
    mutationFn: ({ newReview }: { newReview: IReview }) => addReview(drinkId, newReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", drinkId] });
      toast.success("Added review!");
    },
    onError: () => {
      toast.error("Failed to add review!");
    },
  });

  // Update review using useMutation
  const updateMutation = useMutation({
    mutationFn: ({ reviewId, updatedReview }: { reviewId: number; updatedReview: IReview }) =>
      updateReview(drinkId, reviewId, updatedReview),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", drinkId] });
      toast.success("Updated review!");
    },
    onError: () => {
      toast.error("Failed to update review!");
    },
  });

  // Delete review using useMutation
  const deleteMutation = useMutation({
    mutationFn: ({ reviewId }: { reviewId: number }) => deleteReview(drinkId, reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", drinkId] });
      toast.success("Deleted review!");
    },
    onError: () => {
      toast.error("Failed to delete review!");
    },
  });

  return {
    reviews,
    error,
    isLoading,
    addReview: addMutation.mutate,
    updateReview: updateMutation.mutate,
    deleteReview: deleteMutation.mutate,
  };
};
