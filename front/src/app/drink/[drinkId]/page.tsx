"use client";

import ReviewStars from "MyApp/components/ReviewStars";
import { useDrink } from "MyApp/hooks/useDrink";
import { useRouter } from "next/navigation";
import Pictures from "./Pictures";
import Reviews from "./Reviews";

export default function Page({ params }: { params: { drinkId: number } }) {
  const { drink, isLoading, error } = useDrink(params.drinkId);
  const router = useRouter();

  if (isLoading) return <div> Loading ... </div>;
  if (error) return <div> Error loading </div>;
  if (!drink) return <div> Drink not found </div>;

  const goBack = () => {
    router.push("/");
  };

  return (
    <div className="p-6">
      <button onClick={goBack} className="mb-4 text-black dark:text-white">
        &larr; Go Back
      </button>
      <div className="max-w-2xl mx-auto border border-gray-300 rounded-lg shadow overflow-hidden">
        <img src="https://v1.tailwindcss.com/img/card-top.jpg" alt={drink.name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h1 className="text-3xl font-bold">{drink.name}</h1>
          <p className="mt-2 text-gray-600">{drink.description}</p>
          <ReviewStars rating={Math.floor(drink.reviewAverageRating)} />
        </div>
      </div>

      <Reviews drinkId={params.drinkId} />
      <Pictures drinkId={params.drinkId} />
    </div>
  );
}
