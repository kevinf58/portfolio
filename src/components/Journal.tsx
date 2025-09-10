import { Button } from "./common/Button";
import Card from "./common/cards/Card";
import { AiFillTool } from "react-icons/ai";
import Link from "./common/Link";

const Journal = () => {
  return (
    <>
      <h1 className="text-3xl font-medium lg:text-start text-center">Journal</h1>
      <div className="my-8 mx-6">
        <p>
          I’m a strong believer in documenting my journey as a developer. Doing this through the form of a blog not only
          allows me to track my growth, but also to solidify my learning of concepts, improve my communication skills,
          and perhaps share something useful with others along the way!
        </p>
      </div>
      <div className="w-full flex sm:px-12 sm:justify-start justify-center gap-6">
        <Card>
          <div className="p-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">My Journal #28</span>
            </div>
            <div className="mt-3 mb-7 text-sm">General thoughts, lessons, and reflections from my journey</div>
            <div className="flex gap-3">
              <AiFillTool className="w-6 h-5" />
              <span className="text-xs font-medium">NextJS • TypeScript • Tailwind • AWS • Redux</span>
            </div>
            <div className="flex items-center gap-3 mt-2 mb-6">
              <span className="size-3 bg-green rounded-full" />
              <span className="text-xs">Completed</span>
            </div>
            <span className="text-xs text-white/40">Tues, Apr 22nd, 2025</span>
          </div>
          <span className="absolute top-3 right-3">
            <span className="relative flex size-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green/70 opacity-75"></span>
              <span className="relative inline-flex size-3.5 rounded-full bg-green"></span>
            </span>
          </span>
        </Card>
      </div>
      <Button>
        <Link href={"/projects"}>View my Projects</Link>
      </Button>
    </>
  );
};

export default Journal;
