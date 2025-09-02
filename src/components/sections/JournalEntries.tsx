import { useState } from "react";
import JournalCard from "../common/cards/JournalCard";

const JournalEntries = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <section className="w-1/3">
      <h2 className="font-sans font-bold text-4xl text-tint">Journal Entries</h2>
      <div className="w-1/3 h-[3px] bg-primary mt-1" />
      <p className="mt-8 mb-12 font-serif">
        I’m a strong believer in documenting my journey as a developer. Journaling not only allows me to track my
        growth, but also to solidify my learning of concepts and improve my communication skills!
      </p>
      <div className="space-y-4">
        <JournalCard state={[isFocused, setIsFocused]} />
        <JournalCard state={[isFocused, setIsFocused]} />
        <JournalCard state={[isFocused, setIsFocused]} />
      </div>
    </section>
  );
};

export default JournalEntries;
