import { XMarkIcon } from "@heroicons/react/24/solid";
import { useModal } from "MyApp/contexts/ModalContext";
import React, { useEffect, useRef } from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const { isOpen } = useModal();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener when modal is closed or component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black dark:bg-white bg-opacity-30 dark:bg-opacity-10 flex">
      <div
        className="relative p-4 bg-white dark:bg-black w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg"
        ref={modalRef}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <XMarkIcon width={24} height={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
