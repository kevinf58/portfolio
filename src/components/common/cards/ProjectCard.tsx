import Image from "next/image";
import Card from "./Card";
import { FiArrowUpRight } from "react-icons/fi";
import { CardProps } from "@/types/components/Card.props";

const ProjectCard = (props: CardProps) => {
  return (
    <Card href="/project" className={`group transition-discrete duration-150 ${props.className}`}>
      <div className="mx-4 my-5">
        <div className="flex flex-col">
          <Image src={"/images/Portfolio-01.png"} alt="" width={500} height={10000} className="object-top" />
          <div className="flex items-center gap-4 mt-2">
            <h3 className="font-sans font-bold text-1.5xl leading-7">This Project!</h3>
            <FiArrowUpRight
              size={20}
              className="-translate-x-0.5 group-hover:translate-x-0 group-hover:-translate-y-0.5 duration-200"
            />
          </div>
          <h6 className="font-serif text-xs text-dark-white mb-5">Tuesday, April 21, 2024</h6>
          <p className="font-serif text-xs">This is a description...</p>
          <div className="flex flex-wrap space-x-2.5 space-y-2 font-sans text-xs mt-3">
            <Card href="">TypeScript</Card>
            <Card href="">React</Card>
            <Card href="">Tailwind CSS</Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
