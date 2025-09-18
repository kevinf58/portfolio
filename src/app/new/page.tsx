import Editor from "@/components/common/Editor";

const Page = () => {
  return (
    <section className="relative h-[calc(100vh-4.75rem)] w-full flex flex-col justify-center font-medium bg-light-black shadow-primary">
      <div className="h-full w-full">
        <div className="bg-black h-full w-1/2 overflow-y-scroll">
          <Editor />
        </div>
      </div>
    </section>
  );
};

export default Page;
