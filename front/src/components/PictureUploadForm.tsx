import classNames from "classnames";
import React, { useState } from "react";

interface PictureUploadFormProps {
  addPicture: (file: File | null) => void;
}

const PictureUploadForm = ({ addPicture }: PictureUploadFormProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    console.log("file select");
    const reader = new FileReader();
    reader.onloadend = () => {
      addPicture(file);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div
      className={classNames(
        "cursor-pointer",
        `border-2 border-dashed rounded-lg p-4 text-center transition`,
        "flex justify-center items-center",
        "w-full h-40 lg:h-60 xl:h-70 2xl:h-80",
        isDragOver ? "border-blue-500" : "border-gray-300"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <p className="text-gray-500">Drag & drop an image here or click to upload</p>
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleFileChange(e.target.files ? e.target.files[0] : null);
          e.currentTarget.value = "";
        }}
      />
    </div>
  );
};

export default PictureUploadForm;
