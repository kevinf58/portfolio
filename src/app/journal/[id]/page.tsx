"use client";

import { JournalType } from "@/types/api/Journal.type";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";

const ReadOnlyCrepe = ({ markdown }: { markdown: string }) => {
  useEditor(
    (root) => {
      const crepe = new Crepe({ root, defaultValue: markdown });

      crepe.setReadonly(true);

      return crepe;
    },
    [markdown],
  );

  return <Milkdown />;
};

const Page = () => {
  const params = useParams();
  const id = Number(params.id);

  const [journal, setJournal] = useState<JournalType | null>(null);

  useEffect(() => {
    const fetchJournal = async () => {
      const res = await fetch(`/api/journal/${id}`);
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to fetch journal");
      }

      const data: JournalType = await res.json();
      setJournal({
        ...data,
        date: new Date(data.date),
      });
    };

    fetchJournal();
  }, [id]);

  if (!journal) return <h1>Loading...</h1>;

  return (
    <section className="relative flex justify-center min-h-[calc(100vh-4.75rem)] w-full bg-light-black shadow-default py-36 md:px-10 sm:px-6 px-2">
      <div className="min-h-full max-w-[65rem] w-full lg:px-48 sm:px-20 px-8 lg:py-32 sm:py-24 py-12 gap-1 rounded-sm border-2 border-tint/10 bg-gray hover:scale-101 duration-100 cursor-pointer">
        <MilkdownProvider>
          <ReadOnlyCrepe markdown={journal.markdown} />
        </MilkdownProvider>
      </div>
    </section>
  );
};

export default Page;
