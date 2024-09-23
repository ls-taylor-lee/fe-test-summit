"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import DrinkCard from "MyApp/components/DrinkCard";
import { FORM_MODE } from "MyApp/components/Form";
import { FormField, useModal } from "MyApp/contexts/ModalContext";
import { useDrinks } from "MyApp/hooks/useDrinks";
import { IDrink, IDrinkForm } from "MyApp/types/drinks";
import { useEffect, useState } from "react";

const formFields: FormField[] = [
  { name: "name", label: "Name", component: "input", type: "text" },
  { name: "description", label: "Description", component: "textarea", type: "text" },
];

const InitialDrinkFormData: IDrinkForm = {
  name: "",
  description: "",
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const { drinks, error, isLoading, addDrink, updateDrink, deleteDrink } = useDrinks({
    offset: 0,
    length: 10,
    searchTerm: debouncedSearchTerm,
  });

  const { openModal } = useModal();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 1 seconds debounce

    return () => {
      clearTimeout(handler); // Cleanup the timeout on unmount or when searchTerm changes
    };
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCreate = () => {
    openModal(formFields, FORM_MODE.CREATE, { ...InitialDrinkFormData }, "Add Drink", (data) => {
      addDrink({
        newDrink: data,
      });
    });
  };

  const handleEdit = (prevData: IDrink) => {
    openModal(formFields, FORM_MODE.EDIT, { ...prevData }, "Edit Drink", (data) => {
      updateDrink({ drink: { ...prevData, ...data } });
    });
  };

  const handleDelete = (drinkId: number) => {
    deleteDrink({ drinkId });
  };

  if (error) return <div> Error fetching data </div>;

  return (
    <div className="p-4 min-h-screen">
      <div className="flex mb-4 items-center">
        <h1 className="text-2xl font-bold">All Drinks</h1>
        <button className="text-black dark:text-white px-4 py-2 rounded" onClick={() => handleCreate()}>
          <PlusCircleIcon width={24} height={24} />
        </button>
      </div>
      <input
        type="text"
        placeholder="Search for a drink..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 mb-4 w-full bg-white dark:bg-black"
      />

      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {drinks?.items.map((v: IDrink) => {
            return (
              <DrinkCard
                key={v.id}
                drink={v}
                openModalForEdit={() => handleEdit({ ...v })}
                handleDeleteDrink={handleDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
