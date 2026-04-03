import axios from "axios";
import * as React from "react";
import { useParams } from "react-router";
import { api } from "../../clients/api";
import { RedContainedButton } from "../utils/button/Button";
import UserSearchInput from "../utils/userSearchInput/UserSearchInput";
import type { ICollaborator } from "./types";

interface CollaboratorModalProps {
  collaborators: ICollaborator[];
  fetchProjectData: () => Promise<void>;
}

const CollaboratorModal: React.FC<CollaboratorModalProps> = ({
  collaborators,
  fetchProjectData,
}) => {
  const { id } = useParams();

  const [allUsers, setAllUsers] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState<string | null>(null);

  const fetchData = React.useCallback(async () => {
    try {
      const { data } = await api.get("/emails");
      setAllUsers(data.emails);
    } catch (err) {
      console.error(err);
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddCollaborator = React.useCallback(
    async (user: string) => {
      try {
        await api.post(`/projects/${id}/collaborators`, { email: user });
        setMessage("Collaborator added successfully");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setMessage(
            err.response?.data?.message || "Failed to add collaborator",
          );
        } else if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage("Failed to add collaborator");
        }
      } finally {
        fetchProjectData();
      }
    },
    [fetchProjectData, id],
  );

  const handleRemoveCollaborator = React.useCallback(
    async (user: string) => {
      try {
        await api.delete(`/projects/${id}/collaborators`, {
          data: { email: user },
        });
        setMessage("Collaborator removed successfully");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setMessage(
            err.response?.data?.message || "Failed to remove collaborator",
          );
        } else if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage("Failed to remove collaborator");
        }
      } finally {
        fetchProjectData();
      }
    },
    [fetchProjectData, id],
  );

  return (
    <div className="flex flex-col gap-5">
      <h5 className="mb-">collaborator: </h5>
      <UserSearchInput
        users={allUsers || []}
        onAdd={(user) => handleAddCollaborator(user)}
      />
      {!!collaborators?.length && (
        <div className="flex items-center justify-start w-full flex-wrap gap-2 mt-3">
          <p>collaborators:</p>
          <div className="flex items-center justify-start w-full flex-wrap gap-4">
            {collaborators?.map((collaborator) => (
              <div
                key={collaborator.email}
                className="flex items-center justify-start gap-1.5"
              >
                <p>{collaborator.email}</p>
                <RedContainedButton
                  type="button"
                  text="Remove"
                  onClick={() => handleRemoveCollaborator(collaborator.email)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {message && <div className="mt-2 text-sm">{message}</div>}
    </div>
  );
};

export default CollaboratorModal;
