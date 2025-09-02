import Card from "./common/cards/Card";
import { FaReact, FaPython, FaCss3Alt, FaHtml5, FaDatabase, FaGitAlt, FaJava } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiTailwindcss } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

const Technologies = () => {
  return (
    <>
      <h1 className="text-3xl font-medium lg:text-start text-center">Technologies</h1>
      <div className="flex flex-wrap gap-4 mt-8 mx-6">
        <Card>
          <>
            <FaReact className="text-[#30A2FF]" />
            React
          </>
        </Card>
        <Card>
          <>
            <SiTypescript className="text-[#3178C6] bg-white rounded-xs" />
            TypeScript
          </>
        </Card>
        <Card>
          <>
            <SiJavascript className="text-[#FFDF00] bg-black" />
            TypeScript
          </>
        </Card>
        <Card>
          <>
            <FaPython className="text-[#336D9C]" />
            Python
          </>
        </Card>
        <Card>
          <>
            <FaHtml5 className="text-[#FC490B]" />
            HTML
          </>
        </Card>
        <Card>
          <>
            <FaCss3Alt className="text-[#2196F3]" />
            CSS
          </>
        </Card>
        <Card>
          <>
            <SiTailwindcss className="text-[#38BDF9]" />
            Tailwind CSS
          </>
        </Card>
        <Card>
          <>
            <FaDatabase className="text-white" />
            SQL
          </>
        </Card>
        <Card>
          <>
            <RiNextjsFill className="text-[#161416]" />
            Next.JS
          </>
        </Card>
        <Card>
          <>
            <FaGitAlt className="text-[#F2645A]" />
            Git
          </>
        </Card>
        <Card>
          <>
            <FaJava className="text-[#DE8E2F]" />
            Java
          </>
        </Card>
      </div>
    </>
  );
};

export default Technologies;
