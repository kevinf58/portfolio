"use client";

import { useEffect, useState } from "react";
import DocumentCard from "../common/cards/DocumentCard";
import { Button } from "../common/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import TextAnimation from "../common/TextAnimation";
import { Journal } from "@/types/api/Document.type";

const JournalEntries = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [journals, setJournals] = useState<Journal[]>([]);

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchJournals = async () => {
      const res = await fetch(`${apiURL}/journal`);
      if (res.ok) {
        const data: Journal[] = await res.json();
        const formattedData = data.map((journal) => ({
          ...journal,
          date: new Date(journal.date),
        }));

        setJournals(formattedData);
      }
    };

    fetchJournals();
  }, []);

  return (
    <section className="lg:w-1/3 sm:w-3/4 w-full">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-4xl text-tint">Journal Entries</span>
        <div className="w-1/3 h-[3px] bg-primary mt-1" />
      </TextAnimation>
      <TextAnimation className="mt-8 mb-12 font-serif" element="p">
        I’m a strong believer in documenting my journey as a developer. Journaling not only allows me to track my
        growth, but also to solidify my learning of concepts and improve my communication skills!
      </TextAnimation>
      <div className="flex flex-col space-y-4 md:items-start items-center">
        {journals.map((journal) => (
          <TextAnimation element="div" key={journal.id}>
            <DocumentCard
              state={[isFocused, setIsFocused]}
              id={journal.id}
              title={journal.title}
              date={journal.date}
              tags={journal.tags}
              markdown={journal.markdown}
              type={journal.type}
            />
          </TextAnimation>
        ))}
        <Button href={"/journal"} type="hollow">
          Read More
          <MdKeyboardArrowRight className="lg:group-hover:translate-x-0.5 transition-transform duration-150 ease-in" />
        </Button>
      </div>
    </section>
  );
};

export default JournalEntries;
