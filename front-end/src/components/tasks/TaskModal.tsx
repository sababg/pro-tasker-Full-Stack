import * as React from "react";
import {
  GreenContainedButton,
  RedContainedButton,
} from "../utils/button/Button";
import { Modal } from "../utils/modal/Modal";
import CreateTask from "./CreateTask";
import type { ITasks } from "./types";

interface TaskModalProps {
  isUpdateOpen: boolean;
  setIsUpdateOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: ITasks | undefined;
  fetchProjectData: () => Promise<void>;
  handleDeleteProject: () => Promise<void>;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isUpdateOpen,
  setIsUpdateOpen,
  isDeleteOpen,
  setIsDeleteOpen,
  task,
  fetchProjectData,
  handleDeleteProject,
}) => {
  return (
    <>
      <Modal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)}>
        <CreateTask
          task={task}
          onClose={() => setIsUpdateOpen(false)}
          onSuccess={() => fetchProjectData()}
        />
      </Modal>
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
    </>
  );
};

export default TaskModal;
