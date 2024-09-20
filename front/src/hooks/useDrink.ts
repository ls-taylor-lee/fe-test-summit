import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "MyApp/lib/api-client";
import { IDrink } from "MyApp/types/drinks";
import { toast } from "react-toastify";

// Fetch a specific drink
const fetchDrinkById = async (drinkId: number) => {
  try {
    const res = await apiClient.get(`/api/drinks/${drinkId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error fetching drink");
  }
};

// Update a drink
const updateDrink = async (drinkId: number, updatedDrink: IDrink) => {
  try {
    const res = await apiClient.post(`/api/drinks/${drinkId}`, updatedDrink);
    return res.data;
  } catch (error) {
    throw new Error("Error updating drink");
  }
};

// Delete a drink
const deleteDrink = async (drinkId: number) => {
  try {
    const res = await apiClient.delete(`/api/drinks/${drinkId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error deleting drink");
  }
};

// Custom hook to fetch, update, and delete a specific drink
export const useDrink = (drinkId: number) => {
  const queryClient = useQueryClient();

  // Fetch drink by ID using useQuery
  const {
    data: drink,
    error,
    isLoading,
  } = useQuery<IDrink>({ queryKey: ["drink", drinkId], queryFn: () => fetchDrinkById(drinkId) });

  // Update drink using useMutation
  const updateMutation = useMutation({
    mutationFn: ({ updatedDrink }: { updatedDrink: IDrink }) => updateDrink(drinkId, updatedDrink),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drink", drinkId] });
      toast.success("Updated drink!");
    },
    onError: () => {
      toast.error("Failed to update drink!");
    },
  });

  // Delete drink using useMutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteDrink(drinkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drinks"] });
      toast.success("Deleted drink!");
    },
    onError: () => {
      toast.error("Failed to delete drink!");
    },
  });

  return { drink, error, isLoading, updateDrink: updateMutation.mutate, deleteDrink: deleteMutation.mutate };
};
