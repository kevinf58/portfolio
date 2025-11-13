import { useDocumentFormContext } from "./DocumentLayoutContext";

const TitleInput = () => {
  const MAX_TITLE_LENGTH = 60;

  const { title, setTitle } = useDocumentFormContext();

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Enter a title..."
        value={title}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= MAX_TITLE_LENGTH) setTitle(value);
        }}
        className={`w-full h-min outline-none py-2 px-3 !text-xs ease-in pr-10 input-base`}
      />
      <span className="absolute right-2 pb-0.5 top-1/2 -translate-y-1/2 text-[10px] text-dark-white pointer-events-none">
        {title.length}/{MAX_TITLE_LENGTH}
      </span>
    </div>
  );
};

export default TitleInput;
