import * as React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { api, apiWithCallback } from "../../clients/api";
import { useUser } from "../../context/UserContext";
import { useLoading } from "../../hooks/useLoading";
import Spinner from "../utils/spiner/Spinner";
import Tooltip from "../utils/tooltip/Tooltip";
import type { IProjects } from "./types";

const Projects: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  const [projects, setProjects] = React.useState<IProjects[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await apiWithCallback(
          () => api.get("/projects"),
          () => setLoading(loading),
        );
        setProjects(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [loading, setLoading]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full grid sm:grid-cols-4 gap-6 px-7">
      {projects.map((project) => (
        <div
          key={project._id}
          onClick={() => navigate(`/projects/${project._id}`)}
          className="bg-Green50 border border-solid border-white px-5 py-7 h-auto rounded-2xl relative shadow-Green400 cursor-pointer hover:shadow-Green500 transition"
        >
          <h5 className="font-semibold mb-5">{project.name}</h5>
          <Tooltip text={project.description}>
            <p className="text-Black100 line-clamp-3 cursor-pointer mb-2.5">
              {project.description}
            </p>
          </Tooltip>
          <p className="text-Black100 mt-5 text-sm absolute bottom-2.5 left-5 transform">
            {project.owner.email === user?.email
              ? "You are the owner"
              : "You are not the owner"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Projects;
