import * as React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { api } from "../../clients/api";
import {
  GreenContainedButton,
  RedContainedButton,
} from "../utils/button/Button";
import DropDown from "../utils/dropDown/DropDown";
import { Modal } from "../utils/modal/Modal";
import type { ITasks } from "./types";

const Task: React.FC = () => {
  const { id, taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = React.useState<ITasks>();
  const [isUpdateOpen, setIsUpdateOpen] = React.useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState<boolean>(false);

  const fetchProjectData = React.useCallback(async () => {
    try {
      const { data } = await api.get(`/projects/${id}/tasks/${taskId}`);
      setTask(data);
    } catch (err) {
      console.error(err);
    }
  }, [id, taskId]);

  React.useEffect(() => {
    fetchProjectData();
  }, [fetchProjectData]);

  const handleDeleteProject = React.useCallback(async () => {
    try {
      await api.delete(`/projects/${id}/tasks/${taskId}`);
    } catch (err) {
      console.error(err);
    } finally {
      navigate(`/projects/${id}/tasks`);
    }
  }, [id, navigate, taskId]);
  return (
    <div className="w-full px-7">
      <div
        onClick={() => navigate(`/projects/${id}/tasks`)}
        className="bg-Green50 border border-solid border-white px-5 py-7 h-auto rounded-2xl relative shadow-Green400 hover:shadow-Green500 transition"
      >
        <div className="flex items-baseline justify-between w-full">
          <h5 className="font-semibold mb-5 max-w-[90%] break-all">
            {task?.title}
          </h5>
          <div
            className="w-[10%] flex justify-end"
            onClick={(e) => e.stopPropagation()}
          >
            <DropDown
              icon={
                <BsThreeDotsVertical className="text-gray-500 cursor-pointer" />
              }
              menuItems={[
                {
                  label: "Update",
                  onClick: () => setIsUpdateOpen(true),
                },
                {
                  label: "Delete",
                  onClick: () => setIsDeleteOpen(true),
                },
              ]}
            />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 grid-cols-1 text-Black100 my-3.5">
          <div className="flex items-center justify-start gap-1.5">
            <p>status : </p>
            <p>{task?.status}</p>
          </div>
          <div className="flex items-center justify-start gap-1.5">
            <p>deadline : </p>
            <p>{task?.date && new Date(task.date)?.toLocaleDateString()}</p>
          </div>
          <div className="flex items-center justify-start gap-1.5">
            <p>assigned to : </p>
            <p>{task?.assignedTo.username}</p>
          </div>
        </div>
        <h3 className="font-semibold">Description</h3>
        <p className="mt-2.5">{task?.description}</p>
      </div>

      {/* <Modal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}>
        <CreateProject
          project={task}
          onClose={() => setIsUpdateOpen(false)}
          onSuccess={() => fetchProjectData()}
        />
      </Modal> */}
      <Modal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)}>
        <div>
          <p>Are you sure you want to delete this task?</p>
          <div className="flex items-center justify-between w-full mt-10">
            <GreenContainedButton
              text="Delete"
              type="button"
              onClick={handleDeleteProject}
            />
            <RedContainedButton
              text="Cancel"
              type="button"
              onClick={() => setIsDeleteOpen(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Task;
