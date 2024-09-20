"use client";

import { MagnifyingGlassIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { IDrink } from "MyApp/types/drinks";
import { useRouter } from "next/navigation";
import ReviewStars from "./ReviewStars";

export default function DrinkCard({
  drink,
  openModalForEdit,
  handleDeleteDrink,
}: {
  drink: IDrink;
  openModalForEdit: (drink: IDrink) => void;
  handleDeleteDrink: (drinkId: number) => void;
}) {
  const router = useRouter();

  const goDetail = () => {
    router.push(`/drink/${drink.id}`);
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow">
      <img className="rounded-t-lg" src="https://v1.tailwindcss.com/img/card-top.jpg" alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {drink.name} <span className="text-sm">{drink.reviewAverageRating}</span>
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{drink.description}</p>
        <ReviewStars rating={Math.floor(drink.reviewAverageRating)} />
        <div className="flex space-x-2 justify-end">
          <button className="text-black-600 hover:text-black-800 transition" onClick={() => goDetail()}>
            <MagnifyingGlassIcon width={20} height={20} />
          </button>
          <button className="text-black-600 hover:text-black-800 transition" onClick={() => openModalForEdit(drink)}>
            <PencilSquareIcon width={20} height={20} />
          </button>
          <button
            className="text-red-600 hover:text-red-800 transition"
            onClick={() => handleDeleteDrink(drink.id || 0)}
          >
            <TrashIcon width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
