import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "MyApp/lib/api-client";
import { toast } from "react-toastify";

// Fetch pictures for a specific drink
const fetchPictures = async (drinkId: number) => {
  try {
    const res = await apiClient.get(`/api/drinks/${drinkId}/pictures`);
    return res.data;
  } catch (error) {
    throw new Error("Error fetching pictures");
  }
};

// Add a new picture for a drink
const addPicture = async (drinkId: number, file: File | null) => {
  try {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file); // Append the file to the FormData object
    const res = await apiClient.post(`/api/drinks/${drinkId}/pictures`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    throw new Error("Error adding picture");
  }
};

// Delete a picture for a drink
const deletePicture = async (drinkId: number, pictureId: number) => {
  try {
    const res = await apiClient.delete(`/api/drinks/${drinkId}/pictures/${pictureId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error deleting picture");
  }
};

// Custom hook to manage pictures
export const usePictures = (drinkId: number) => {
  const queryClient = useQueryClient();

  // Fetch pictures using useQuery
  const {
    data: pictures,
    error,
    isLoading,
  } = useQuery({ queryKey: ["pictures", drinkId], queryFn: () => fetchPictures(drinkId) });

  // Add picture using useMutation
  const addMutation = useMutation({
    mutationFn: ({ file }: { file: File | null }) => addPicture(drinkId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pictures", drinkId] });
      toast.success("Added picture!");
    },
    onError: () => {
      toast.error("Failed to add picture");
    },
  });

  // Delete picture using useMutation
  const deleteMutation = useMutation({
    mutationFn: ({ pictureId }: { pictureId: number }) => deletePicture(drinkId, pictureId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pictures", drinkId] });
      toast.success("Deleted picture!");
    },
    onError: () => {
      toast.error("Failed to add picture");
    },
  });

  return { pictures, error, isLoading, addPicture: addMutation.mutate, deletePicture: deleteMutation.mutate };
};
