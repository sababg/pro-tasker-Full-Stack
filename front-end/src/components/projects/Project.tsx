import * as React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { api } from "../../clients/api";
import { useUser } from "../../context/UserContext";
import DropDown from "../utils/dropDown/DropDown";
import { Modal } from "../utils/modal/Modal";
import CollaboratorModal from "./CollaboratorModal";
import type { IProjects } from "./types";

const Project: React.FC = () => {
  const { id } = useParams();
  const { user } = useUser();

  const [project, setProject] = React.useState<IProjects>();
  const [isCollaboratorsOpen, setIsCollaboratorsOpen] =
    React.useState<boolean>(false);

  const fetchProjectData = React.useCallback(async () => {
    try {
      const { data } = await api.get(`/projects/${id}`);
      setProject(data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  React.useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  return (
    <div className="w-full px-7">
      <div className="bg-Green50 border border-solid border-white px-5 py-7 h-auto rounded-2xl relative shadow-Green400 hover:shadow-Green500 transition">
        <div className="flex items-baseline justify-between w-full">
          <h5 className="font-semibold mb-5 max-w-[90%] break-all">
            {project?.name}
          </h5>
          <div className="w-[10%] flex justify-end">
            <DropDown
              icon={
                <BsThreeDotsVertical className="text-gray-500 cursor-pointer" />
              }
              menuItems={[
                {
                  label: "Collaborators",
                  onClick: () => setIsCollaboratorsOpen(true),
                },
              ]}
            />
          </div>
        </div>
        <p className="text-Black100 mb-2.5">{project?.description}</p>
        {!!project?.collaborators?.length && (
          <div className="flex items-center justify-start w-full flex-wrap gap-2">
            <p>collaborators:</p>
            <p>
              {project?.collaborators
                ?.map((collaborator) => collaborator.email)
                .join(", ")}
            </p>
          </div>
        )}
        <p className="text-Black100 mt-5 text-sm absolute bottom-2.5 left-5 transform">
          {project?.owner.email === user?.email
            ? "You are the owner"
            : "You are not the owner"}
        </p>
      </div>
      <Modal
        isOpen={isCollaboratorsOpen}
        onClose={() => setIsCollaboratorsOpen(false)}
      >
        <CollaboratorModal
          collaborators={project?.collaborators || []}
          fetchProjectData={fetchProjectData}
        />
      </Modal>
    </div>
  );
};

export default Project;
