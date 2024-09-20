import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "MyApp/lib/api-client";
import { IDrink } from "MyApp/types/drinks";
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
const addNewDrink = async (newDrink: IDrink) => {
  try {
    const res = await apiClient.post("/api/drinks", newDrink);
    return res.data;
  } catch (error) {
    throw new Error("Error adding drinks");
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
  const mutation = useMutation({
    mutationFn: ({ newDrink }: { newDrink: IDrink }) => addNewDrink(newDrink),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drinks"] });
      toast.success("Added drink!");
    },
    onError: () => {
      toast.error("Failed to add drink!");
    },
  });

  return { drinks, error, isLoading, addDrink: mutation.mutate };
};
