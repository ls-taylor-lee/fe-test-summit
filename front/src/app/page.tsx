"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import DrinkCard from "MyApp/components/DrinkCard";
import DrinkForm from "MyApp/components/DrinkForm";
import Modal from "MyApp/components/Modal";
import { useDrinks } from "MyApp/hooks/useDrinks";
import { IDrink, IDrinkForm } from "MyApp/types/drinks";
import { useCallback, useState } from "react";

const InitialDrinkFormData: IDrinkForm = {
  name: "",
  description: "",
};

export default function Home() {
  const { drinks, error, isLoading, addDrink, updateDrink, deleteDrink } = useDrinks({ offset: 0, length: 10 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDrink, setCurrentDrink] = useState<IDrink | null>(null);
  const [newDrink, setNewDrink] = useState<IDrinkForm>({ ...InitialDrinkFormData });

  const closeModal = () => setIsModalOpen(false);

  const handleSaveDrink = useCallback(() => {
    if (isEditing && currentDrink) {
      handleUpdateDrink({ ...currentDrink, ...newDrink });
    } else {
      handleAddDrink(newDrink);
    }

    closeModal();
  }, [currentDrink, newDrink]);

  const openModalForAdd = () => {
    setNewDrink({ ...InitialDrinkFormData });
    setIsEditing(false);
    setCurrentDrink(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (drink: IDrink) => {
    setNewDrink(drink);
    setIsEditing(true);
    setCurrentDrink(drink);
    setIsModalOpen(true);
  };

  const handleAddDrink = (newDrink: IDrinkForm) => {
    addDrink({
      newDrink,
    });
  };
  const handleUpdateDrink = (newDrink: IDrink) => {
    updateDrink({ drink: newDrink });
  };

  const handleDeleteDrink = (drinkId: number) => {
    deleteDrink({ drinkId });
  };

  if (error) return <div> Error fetching data </div>;

  return (
    <div className="p-4 min-h-screen">
      <div className="flex mb-4 items-center">
        <h1 className="text-2xl font-bold">All Drinks</h1>
        <button className="text-black dark:text-white px-4 py-2 rounded" onClick={() => openModalForAdd()}>
          <PlusCircleIcon width={24} height={24} />
        </button>
      </div>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {drinks?.items.map((v: IDrink) => {
            return (
              <DrinkCard
                key={v.id}
                drink={v}
                openModalForEdit={openModalForEdit}
                handleDeleteDrink={handleDeleteDrink}
              />
            );
          })}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <DrinkForm
          newDrink={newDrink}
          setNewDrink={setNewDrink}
          handleSaveDrink={handleSaveDrink}
          isEditing={isEditing}
        />
      </Modal>
    </div>
  );
}
