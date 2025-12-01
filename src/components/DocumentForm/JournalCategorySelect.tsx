import Tag from "../common/Tag";
import { useDocumentFormContext } from "./DocumentLayoutContext";

const JournalCategorySelect = () => {
  const { category, setCategory } = useDocumentFormContext();

  return (
    <div className={`flex items-center gap-2 flex-wrap py-2 text-xs`}>
      <span>Category</span>
      <Tag onClick={() => setCategory("DAILY")} className={`${category === "DAILY" && "text-blue bg-blue/25"}`}>
        DAILY
      </Tag>
      <Tag onClick={() => setCategory("LEARNING")} className={`${category === "LEARNING" && "text-green bg-green/25"}`}>
        LEARNING
      </Tag>
      <Tag
        onClick={() => setCategory("DEVELOPMENT")}
        className={`${category === "DEVELOPMENT" && "text-yellow bg-yellow/25"}`}
      >
        DEVELOPMENT
      </Tag>
      <Tag
        onClick={() => setCategory("RECRUITING")}
        className={`${category === "RECRUITING" && "text-purple bg-purple/25"}`}
      >
        RECRUITING
      </Tag>
      <Tag onClick={() => setCategory("TRADING")} className={`${category === "TRADING" && "text-orange bg-orange/25"}`}>
        TRADING
      </Tag>
    </div>
  );
};

export default JournalCategorySelect;
