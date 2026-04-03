import * as React from "react";
import { GreenOutlinedButton } from "../utils/button/Button";
import { Modal } from "../utils/modal/Modal";
import CreateTask from "./CreateTask";

interface TasksProps {}

const Tasks: React.FC<TasksProps> = ({}) => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] =
    React.useState<boolean>(false);

  const handleOpenCreateTask = React.useCallback(() => {
    setIsCreateTaskOpen(true);
  }, []);
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <GreenOutlinedButton
          text="Create New Task"
          type="button"
          onClick={handleOpenCreateTask}
        />
      </div>
      <div className="h-[80%] mt-5 w-full flex justify-center">
        <div className="w-[90%] bg-white rounded-2xl px-7 py-9">
          <table className="w-full border-Green400 border border-solid rounded-2xl text-black">
            <thead>
              <tr>
                <th>Task title</th>
                <th>Assigned</th>
                <th>Deadline</th>
                <th>Status</th>
                <th className="hidden">Badge</th>
              </tr>
            </thead>
            <tbody id="taskTableBody"></tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      >
        <CreateTask onClose={() => setIsCreateTaskOpen(false)} />
      </Modal>
    </>
  );
};

export default Tasks;
