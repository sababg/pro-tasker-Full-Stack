import * as React from "react";
import { useEffect } from "react";
import { api } from "../../clients/api";
import type { IProjects } from "./types";

const Projects: React.FC = () => {
  const [projects, setProjects] = React.useState<IProjects[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await api.get("/projects");
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-Green50 border border-solid border-white "
        >
          {project.name}
        </div>
      ))}
    </>
  );
};

export default Projects;
