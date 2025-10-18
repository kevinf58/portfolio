import { JournalType } from "@/types/api/Journal.type";
import ReadOnlyCrepe from "@/components/ReadOnlyCrepe";
import DeleteButton from "@/components/DeleteButton";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiURL}/journal/${id}`, { cache: "force-cache" });

  if (!res.ok) {
    notFound();
  }

  const data: JournalType = await res.json();

  const journal: JournalType = {
    ...data,
    date: new Date(data.date),
  };

  return (
    <section className="relative flex justify-center min-h-[calc(100vh-4.75rem)] w-full bg-light-black shadow-default py-36 md:px-10 sm:px-6 px-2">
      <div className="min-h-full max-w-[65rem] w-full lg:px-48 sm:px-20 px-8 lg:py-32 sm:py-24 py-12 gap-1 rounded-sm border-2 border-tint/10 bg-gray hover:scale-101 duration-100">
        <ReadOnlyCrepe markdown={journal.markdown} />
      </div>
      <DeleteButton id={id} />
    </section>
  );
};

export default Page;
