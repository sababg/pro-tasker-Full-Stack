// src/components/Modal.tsx
import { type ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, className, children }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`relative bg-white rounded-2xl max-h-[80%] overflow-auto shadow-lg py-6 px-9 ${className || "sm:w-[50%] w-[90%]"} z-10`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
};
