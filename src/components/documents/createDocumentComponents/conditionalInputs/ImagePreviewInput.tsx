import { useDocumentFormContext } from "@/hooks/useDocumentForm";
import { MAX_IMAGE_SIZE } from "@/lib/constants";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const ImagePreviewInput = () => {
  const [imageName, setImageName] = useState("");

  const context = useDocumentFormContext();

  // document type verification check before getting conditional props
  if (context.type !== DOCUMENT_TYPE.PROJECT) return null;
  const { imageInputPreviewRef } = context;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageName("");
      return;
    }

    // client side error handling
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      throw new Error("Only image files are allowed");
    } else if (file.size > MAX_IMAGE_SIZE) {
      toast.error(`The image size of '${file.name}' exceeds the 2MB limit`);
      throw new Error(`The image size of '${file.name}' exceeds the 2MB limit`);
    }

    setImageName(file.name);
  };

  return (
    <label
      htmlFor="image"
      className={`relative inline-flex items-center gap-2 cursor-pointer select-none py-2 px-3 text-xs! bg-light-gray shadow-inner focus-within:ring-2 ring-primary/80 rounded-sm duration-200`}
      title={imageName || "Choose an image"}
    >
      <input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" ref={imageInputPreviewRef} />
      <span className="whitespace-nowrap">Choose image</span>
      <span className="ml-auto text-[10px] text-dark-white truncate max-w-40">{imageName || "No file chosen"}</span>

      {imageName && (
        <MdDeleteOutline
          title="Remove image"
          onClick={(e) => {
            e.preventDefault();
            setImageName("");

            if (imageInputPreviewRef.current) imageInputPreviewRef.current.value = "";
          }}
          className=" ml-2 text-[16px] text-white hover:text-red duration-200"
        />
      )}
    </label>
  );
};

export default ImagePreviewInput;
