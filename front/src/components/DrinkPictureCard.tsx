"use client";

import { TrashIcon } from "@heroicons/react/16/solid";
import classNames from "classnames";
import { IPicture } from "MyApp/types/drinks";

export default function DrinkPictureCard({ pic, onRemove }: { pic: IPicture; onRemove: (id: number) => void }) {
  return (
    <div key={pic.id} className="relative rounded-lg shadow overflow-hidden">
      <img
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${pic.path}`}
        alt={pic.path}
        className="w-full h-40 lg:h-60 xl:h-70 2xl:h-80 object-cover"
      />
      <TrashIcon
        width={24}
        height={24}
        className={classNames("absolute top-2 right-2 cursor-pointer")}
        onClick={() => onRemove(pic.id || 0)}
      />
    </div>
  );
}
