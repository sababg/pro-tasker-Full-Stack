import * as React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import { api } from "../../clients/api";
import {
  GreenContainedButton,
  GreenOutlinedButton,
  RedContainedButton,
} from "../utils/button/Button";
import { dateIsValid } from "../utils/dateIsValid/DateIsValid";
import DropDown from "../utils/dropDown/DropDown";
import { Modal } from "../utils/modal/Modal";
import CreateTask from "./CreateTask";
import TaskModal from "./TaskModal";
import type { ITasks } from "./types";

const Tasks: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isCreateTaskOpen, setIsCreateTaskOpen] =
    React.useState<boolean>(false);
  const [tasks, setTasks] = React.useState<ITasks[]>();
  const [isUpdateOpen, setIsUpdateOpen] = React.useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState<boolean>(false);

  const fetchTaskData = React.useCallback(async () => {
    try {
      const { data } = await api.get(`/projects/${id}/task`);
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  React.useEffect(() => {
    fetchTaskData();
  }, [fetchTaskData]);

  const handleOpenCreateTask = React.useCallback(() => {
    setIsCreateTaskOpen(true);
  }, []);

  const handleDeleteTask = React.useCallback(
    async (taskId: string) => {
      try {
        await api.delete(`/projects/${id}/tasks/${taskId}`);
      } catch (err) {
        console.error(err);
      } finally {
        setIsUpdateOpen(false);
        setIsDeleteOpen(false);
        fetchTaskData();
      }
    },
    [fetchTaskData, id],
  );

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
          <div className="flex flex-col gap-3 sm:hidden">
            {tasks?.map((task) => (
              <div
                key={task._id}
                onClick={() => navigate(`/projects/${id}/tasks/${task._id}`)}
                className="bg-white border border-Green400 rounded-[10px] p-4 cursor-pointer hover:bg-green-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Task title</span>
                      <span className="font-medium">{task.title}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Assigned</span>
                      <span>{task.assignedTo?.username}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Deadline</span>
                      <span>{new Date(task.date)?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Status</span>
                      {dateIsValid(task.date) ? (
                        <RedContainedButton
                          text="Overdue"
                          type="button"
                          className="w-[40%]"
                        />
                      ) : (
                        <GreenContainedButton
                          text={task.status}
                          type="button"
                          className="w-[40%]"
                        />
                      )}
                    </div>
                  </div>
                  <div onClick={(e) => e.stopPropagation()} className="ml-2">
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
              </div>
            ))}
          </div>
          <table className="w-full sm:table hidden overflow-auto border-Green400 border border-solid rounded-[10px] text-black border-separate border-spacing-0">
            <thead>
              <tr className="overflow-hidden">
                <th className="p-3 bg-gray-50 border-b border-Green400 rounded-t-[10px]">
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
                <th className="p-3 bg-gray-50 border-b border-Green400 rounded-tr-[10px]"></th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => (
                <>
                  <tr
                    key={task._id}
                    onClick={() =>
                      navigate(`/projects/${id}/tasks/${task._id}`)
                    }
                    className={`text-center cursor-pointer ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition`}
                  >
                    <td className="p-3 rounded-b-[10px]">{task.title}</td>
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
                    <td className="p-3 rounded-br-[10px]">
                      <div onClick={(e) => e.stopPropagation()}>
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
                    </td>
                  </tr>
                  <TaskModal
                    fetchProjectData={fetchTaskData}
                    handleDeleteProject={() => handleDeleteTask(task._id)}
                    isDeleteOpen={isDeleteOpen}
                    setIsDeleteOpen={setIsDeleteOpen}
                    isUpdateOpen={isUpdateOpen}
                    setIsUpdateOpen={setIsUpdateOpen}
                    task={task}
                    key={task._id}
                  />
                </>
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
