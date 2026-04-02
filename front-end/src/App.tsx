import { useCallback, useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/navbar/Navbar";
import CreateProject from "./components/projects/CreateProject";
import Projects from "./components/projects/Projects";
import Register from "./components/registerOrLogin/Register";
import { Modal } from "./components/utils/modal/Modal";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsRegisterOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Navbar setIsRegisterOpen={setIsRegisterOpen} />
      <div className="py-5 h-[92%] w-full">
        <Routes>
          <Route
            path="/projects"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-project"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <CreateProject />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      {isRegisterOpen && (
        <Modal isOpen={isRegisterOpen} onClose={handleClose}>
          <Register handleClose={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default App;
