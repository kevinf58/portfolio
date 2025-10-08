import { JournalPageParams } from "@/types/api/Journal.type";

const Page = async (props: JournalPageParams) => {
  const { id } = await props.params;

  return (
    <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-light-black shadow-primary">
      Journal {id}
    </section>
  );
};

export default Page;
