"use client";

import { JournalType } from "@/types/api/Journal.type";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import Loading from "@/app/loading";
import { Button } from "@/components/common/Button";
import { toast } from "react-toastify";

// read only crepe editor component to be used to display markdown
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
  const router = useRouter();
  const id = Number(params.id);

  const [journal, setJournal] = useState<JournalType | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchJournal = async () => {
      try {
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
      } catch (err) {
        console.error(err);
        toast.error("Failed to load journal entry.");
      }
    };

    fetchJournal();
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this journal? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/journal/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete journal");
      }

      toast.success("Journal deleted successfully!");
      router.push("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete journal.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!journal) return <Loading />;

  return (
    <section className="relative flex justify-center min-h-[calc(100vh-4.75rem)] w-full bg-light-black shadow-default py-36 md:px-10 sm:px-6 px-2">
      <div className="min-h-full max-w-[65rem] w-full lg:px-48 sm:px-20 px-8 lg:py-32 sm:py-24 py-12 gap-1 rounded-sm border-2 border-tint/10 bg-gray hover:scale-101 duration-100">
        <MilkdownProvider>
          <ReadOnlyCrepe markdown={journal.markdown} />
        </MilkdownProvider>
      </div>
      <Button className="!fixed bottom-5 right-10" type="hollow" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </section>
  );
};

export default Page;
