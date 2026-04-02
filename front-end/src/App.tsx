import { useCallback, useState } from "react";
import { Routes } from "react-router";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/registerOrLogin/Register";
import { Modal } from "./components/utils/modal/Modal";

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsRegisterOpen((prev) => !prev);
  }, []);

  return (
    <>
      <Navbar setIsRegisterOpen={setIsRegisterOpen} />
      <Routes></Routes>
      {isRegisterOpen && (
        <Modal isOpen={isRegisterOpen} onClose={handleClose}>
          <Register handleClose={handleClose} />
        </Modal>
      )}
    </>
  );
}

export default App;
