import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { api } from "../../clients/api";
import {
  GreenContainedButton,
  GreenOutlinedButton,
  RedContainedButton,
} from "../utils/button/Button";
import { dateIsValid } from "../utils/dateIsValid/DateIsValid";
import { Modal } from "../utils/modal/Modal";
import CreateTask from "./CreateTask";
import type { ITasks } from "./types";

const Tasks: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isCreateTaskOpen, setIsCreateTaskOpen] =
    React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<ITasks[]>();

  const fetchTaskData = React.useCallback(async () => {
    try {
      const { data } = await api.get(`/projects/${id}/task`);
      console.log("data", data);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  React.useEffect(() => {
    fetchTaskData();
  }, [fetchTaskData]);

  console.log("tasks", tasks);

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
          <table className="w-full border-Green400 border border-solid rounded-[10px] text-black border-separate border-spacing-0 overflow-hidden">
            <thead>
              <tr>
                <th className="p-3 bg-gray-50 border-b border-Green400">
                  Task title
                </th>
                <th className="p-3 bg-gray-50 border-b border-Green400">
                  Assigned
                </th>
                <th className="p-3 bg-gray-50 border-b border-Green400">
                  Deadline
                </th>
                <th className="p-3 bg-gray-50 border-b border-Green400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => (
                <tr
                  key={task._id}
                  onClick={() => navigate(`/projects/${id}/tasks/${task._id}`)}
                  className={`text-center cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition`}
                >
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{task.assignedTo?.username}</td>
                  <td className="p-3">
                    {new Date(task.date)?.toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {dateIsValid(task.date) ? (
                      <RedContainedButton
                        text="Overdue"
                        type="button"
                        className="w-[50%]"
                      />
                    ) : (
                      <GreenContainedButton
                        text={task.status}
                        type="button"
                        className="w-[50%]"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      >
        <CreateTask
          onClose={() => setIsCreateTaskOpen(false)}
          onSuccess={() => fetchTaskData()}
        />
      </Modal>
    </>
  );
};

export default Tasks;
