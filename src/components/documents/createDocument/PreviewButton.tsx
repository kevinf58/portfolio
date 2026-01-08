import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

//TODO: MAYBE DO A FADE OUT FROM TOP TO A FADE IN FROM BOTTOM ANIMATION WHEN CLICKING THE PREVIEW BUTTON
const PreviewButton = ({ isPreview, setIsPreview }: { isPreview: boolean; setIsPreview: Dispatch<SetStateAction<boolean>> }) => {
  const togglePreview = () => {
    setIsPreview((prevState) => !prevState);
  };

  return (
    <Button size="md" variant="secondary" onClick={togglePreview}>
      {isPreview ? <FaRegEdit size={18} /> : <MdOutlineRemoveRedEye size={18} />}
      <span>{isPreview ? "Edit" : "Preview"}</span>
    </Button>
  );
};

export default PreviewButton;
