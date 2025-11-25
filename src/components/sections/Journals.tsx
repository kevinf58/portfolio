"use client";

import { useEffect, useState } from "react";
import { Button } from "../common/Button";
import { MdKeyboardArrowRight } from "react-icons/md";
import TextAnimation from "../common/TextAnimation";
import { Journal } from "@/types/Document.type";
import DocumentCard from "../common/cards/DocumentCard";

const Journals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);

  useEffect(() => {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;

    const fetchJournals = async () => {
      const res = await fetch(`${apiURL}/journal`);
      if (res.ok) {
        const data: Journal[] = await res.json();
        setJournals(data);
      }
    };

    fetchJournals();
  }, []);

  return (
    <section className="flex flex-col items-center w-full gap-2">
      <TextAnimation element="h1">
        <span className="font-sans font-bold text-5xl text-tint">Journals</span>
      </TextAnimation>
      {/* <TextAnimation className="mt-8 mb-12 font-serif text-sm" element="p">
        I’m a strong believer in documenting my journey as a developer. Journaling not only allows me to track my
        growth, but also to solidify my learning of concepts and improve my communication skills!
      </TextAnimation> */}
      <div className="flex flex-col w-[80rem]">
        {journals.map((journal) => (
          <TextAnimation element="div" key={journal.id}>
            <DocumentCard
              id={journal.id}
              title={journal.title}
              date={journal.date}
              tags={journal.tags}
              markdown={journal.markdown}
              type={journal.type}
              category={journal.category}
            />
          </TextAnimation>
        ))}
      </div>
      <Button href={"/journal"} variant="hollow">
        Read More
        <MdKeyboardArrowRight className="lg:group-hover:translate-x-0.5 transition-transform duration-150 ease-in" />
      </Button>
    </section>
  );
};

export default Journals;
