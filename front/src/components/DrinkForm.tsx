"use client";

import { IDrinkForm } from "MyApp/types/drinks";

interface IDrinkFormProps {
  isEditing: boolean;
  newDrink: IDrinkForm;
  setNewDrink: (drink: IDrinkForm) => void;
  handleSaveDrink: () => void;
}

export default function DrinkForm({ isEditing, newDrink, setNewDrink, handleSaveDrink }: IDrinkFormProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Drink" : "Add a New Drink"}</h3>
      <div className="mb-4">
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-black bg-white dark:text-white dark:bg-black"
          value={newDrink.name}
          onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2 rounded-lg text-black bg-white dark:text-white dark:bg-black"
          value={newDrink.description}
          onChange={(e) => setNewDrink({ ...newDrink, description: e.target.value })}
        />
      </div>

      <button
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 text-white transition w-full"
        onClick={() => handleSaveDrink()}
      >
        {isEditing ? "Save Changes" : "Submit Drink"}
      </button>
    </div>
  );
}
