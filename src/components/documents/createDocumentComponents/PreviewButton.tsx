import Button from "@/components/ui/Button";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const PreviewButton = () => {
  return (
    <Button size="md" variant="secondary">
      <MdOutlineRemoveRedEye size={18} />
      <span>Preview</span>
    </Button>
  );
};

export default PreviewButton;
