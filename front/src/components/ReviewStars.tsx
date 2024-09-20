"use client";

import { StarIcon } from "@heroicons/react/16/solid";

export default function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="my-2 flex">
      {new Array(Math.floor(rating)).fill(0).map((v, i) => {
        return <StarIcon key={i} width={16} height={16} />;
      })}
    </div>
  );
}
