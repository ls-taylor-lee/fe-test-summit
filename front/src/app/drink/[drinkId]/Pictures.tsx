"use client";

import DrinkPictureCard from "MyApp/components/DrinkPictureCard";
import PictureUploadForm from "MyApp/components/PictureUploadForm";
import { usePictures } from "MyApp/hooks/usePictures";
import { IPicture } from "MyApp/types/drinks";

export default function Pictures({ drinkId }: { drinkId: number }) {
  const { pictures, isLoading, error, addPicture, deletePicture } = usePictures(drinkId);
  if (isLoading) return <div> Loading Pictures </div>;
  if (error) return <div> Failed to load pictures </div>;
  if (!pictures) return <div></div>;

  const handleAddPicture = (file: File | null) => {
    addPicture({ file });
  };
  const handlePictureDelete = (picId: number) => {
    deletePicture({ pictureId: picId });
  };

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Pictures</h2>
      <div className="my-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {pictures.map((pic: IPicture) => (
            <DrinkPictureCard key={pic.id} pic={pic} onRemove={handlePictureDelete} />
          ))}
          <PictureUploadForm addPicture={handleAddPicture} />
        </div>
      </div>
    </section>
  );
}
