"use client";

import classNames from "classnames";
import { IDrink } from "MyApp/types/drinks";
import { useRouter } from "next/navigation";
import ReviewStars from "./ReviewStars";

export default function DrinkCard({ drink }: { drink: IDrink }) {
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
        <div
          onClick={goDetail}
          className={classNames(
            "cursor-pointer inline-flex items-center",
            "px-3 py-2 mt-2",
            "text-sm font-medium text-center text-white",
            "bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300",
            "dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          )}
        >
          Read more
        </div>
      </div>
    </div>
  );
}
