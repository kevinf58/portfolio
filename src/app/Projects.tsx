import DocumentCard from "@/components/DocumentCard";
import { getDocuments } from "@/services/getDocuments.service";
import { DOCUMENT_TYPE } from "@/types/Document.type";
import { DOCUMENTS_LOADED_LIMIT } from "@/utils/constants";

const getProjects = async () => {
  const res = await getDocuments({ type: DOCUMENT_TYPE.JOURNAL, limit: DOCUMENTS_LOADED_LIMIT, offset: 0 });

  if (!res.success) {
    throw new Error(res.info.code + " " + res.info.message);
  }

  return res.data;
};
const Projects = async () => {
  const projects = await getProjects();

  return !projects || projects.length === 0 ? (
    <div>No Projects Found.</div>
  ) : (
    <section className="flex flex-col items-center w-full gap-2 py-20 px-6">
      <span className="font-sans font-bold text-5xl text-tint">Projects</span>

      <div className="flex flex-col w-full max-w-6xl mx-auto">
        {projects.map((project) => (
          <DocumentCard {...project} key={project.id} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
