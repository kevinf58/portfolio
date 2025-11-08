import { DocumentType, Journal } from "@/types/api/Document.type";
import ReadOnlyCrepe from "@/components/ReadOnlyCrepe";
import DeleteButton from "@/components/DeleteButton";
import { notFound } from "next/navigation";
import { dateToReadable } from "@/utils/dateUtils";
import Card from "@/components/common/cards/Card";

const Page = async ({ params }: { params: Promise<{ type: DocumentType; id: string }> }) => {
  const { type, id } = await params;

  const apiURL = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${apiURL}/${type}/${id}`, { cache: "default" });

  if (!res.ok) {
    notFound();
  }

  const data: Journal = await res.json();

  const journal: Journal = {
    ...data,
    date: new Date(data.date),
  };

  return (
    <section className="relative flex justify-center min-h-[calc(100vh-4.75rem)] w-full bg-light-black shadow-default py-36 md:px-10 sm:px-6 px-2">
      <div className="min-h-full max-w-[65rem] w-full lg:px-48 sm:px-20 px-8 lg:py-32 sm:py-24 py-12 gap-1 rounded-sm border-2 border-tint/10 bg-gray">
        <h1 className="text-[42px] leading-[50px] mt-8">{journal.title}</h1>
        <p className="text-white/50 text-xs mb-8 font-light italic">
          {dateToReadable(journal.date.toISOString().split("T")[0])}
        </p>
        <div className="flex gap-1.5 text-xs mb-2">
          {journal.tags.map((tag) => (
            <Card href="" key={tag}>
              {tag}
            </Card>
          ))}
        </div>
        <hr className="opacity-20 mb-6" />
        <ReadOnlyCrepe markdown={journal.markdown} />
      </div>
      <DeleteButton id={Number(id)} type={type} />
    </section>
  );
};

export default Page;
