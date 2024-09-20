import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "MyApp/lib/api-client";
import { IDrink, IDrinkForm } from "MyApp/types/drinks";
import { toast } from "react-toastify";

// Fetch drinks
const fetchDrinks = async ({ offset, length }: { offset: number; length: number }) => {
  try {
    const res = await apiClient.get("/api/drinks", { params: { offset, length } });
    return res.data;
  } catch (error) {
    throw new Error("Error fetching drinks");
  }
};

// Add a new drink
const addNewDrink = async (newDrink: IDrinkForm) => {
  try {
    const res = await apiClient.post("/api/drinks", newDrink);
    return res.data;
  } catch (error) {
    throw new Error("Error adding drinks");
  }
};

const updateDrink = async (drink: IDrink) => {
  try {
    const res = await apiClient.put(`/api/drinks/${drink.id}`, drink);
    return res.data;
  } catch (error) {
    throw new Error("Error updating drinks");
  }
};

const deleteDrink = async (drinkId: number) => {
  try {
    const res = await apiClient.delete(`/api/drinks/${drinkId}`);
    return res.data;
  } catch (error) {
    throw new Error("Error deleting drinks");
  }
};

// Custom hook for managing drinks
export const useDrinks = ({ offset = 0, length = 10 }: { offset: number; length: number }) => {
  const queryClient = useQueryClient();

  // Fetch drinks using useQuery
  const {
    data: drinks,
    error,
    isLoading,
  } = useQuery({ queryKey: ["drinks"], queryFn: () => fetchDrinks({ offset, length }) });

  // Add a new drink using useMutation
  const addMutation = useMutation({
    mutationFn: ({ newDrink }: { newDrink: IDrinkForm }) => addNewDrink(newDrink),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drinks"] });
      toast.success("Added drink!");
    },
    onError: () => {
      toast.error("Failed to add drink!");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ drink }: { drink: IDrink }) => updateDrink(drink),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drinks"] });
      toast.success("Updated drink!");
    },
    onError: () => {
      toast.error("Failed to update drink!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ drinkId }: { drinkId: number }) => deleteDrink(drinkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drinks"] });
      toast.success("Deleted drink!");
    },
    onError: () => {
      toast.error("Failed to delete drink!");
    },
  });

  return {
    drinks,
    error,
    isLoading,
    addDrink: addMutation.mutate,
    updateDrink: updateMutation.mutate,
    deleteDrink: deleteMutation.mutate,
  };
};
