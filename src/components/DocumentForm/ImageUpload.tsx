import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useDocumentFormContext } from "./DocumentLayoutContext";

const ImageUpload = () => {
  const [imageName, setImageName] = useState("");

  const { fileInputRef } = useDocumentFormContext();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageName("");
      return;
    }
    setImageName(file.name);
  };

  return (
    <label
      htmlFor="image"
      className={`relative inline-flex items-center gap-2 cursor-pointer select-none py-2 px-3 !text-xs bg-white/8 shadow-inner focus-within:ring-2 ring-primary/80 rounded-sm duration-200`}
      title={imageName || "Choose an image"}
    >
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="sr-only"
        ref={fileInputRef}
      />
      <span className="whitespace-nowrap">Choose image</span>
      <span className="ml-auto text-[10px] text-white/50 truncate max-w-[10rem]">{imageName || "No file chosen"}</span>

      {imageName && (
        <MdDeleteOutline
          title="Remove image"
          onClick={(e) => {
            e.preventDefault();
            setImageName("");

            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
          className=" ml-2 text-[16px] text-white hover:text-red duration-200"
        />
      )}
    </label>
  );
};

export default ImageUpload;
