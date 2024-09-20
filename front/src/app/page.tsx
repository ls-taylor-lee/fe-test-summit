"use client";

import DrinkCard from "MyApp/components/DrinkCard";
import { useDrinks } from "MyApp/hooks/useDrinks";
import { IDrink } from "MyApp/types/drinks";

export default function Home() {
  const { drinks, error, isLoading } = useDrinks({ offset: 0, length: 10 });
  if (error) return <div> Error fetching data </div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Drinks</h1>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {drinks?.items.map((v: IDrink) => {
            return <DrinkCard key={v.id} drink={v} />;
          })}
        </div>
      )}
    </div>
  );
}
