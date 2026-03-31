import { useState } from "react";
import { Routes } from "react-router";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/register/Register";
import { Modal } from "./components/utils/modal/Modal";

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  return (
    <>
      <Navbar setIsRegisterOpen={setIsRegisterOpen} />
      <Routes></Routes>
      {isRegisterOpen && (
        <Modal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen((prev) => !prev)}
        >
          <Register />
        </Modal>
      )}
    </>
  );
}

export default App;
