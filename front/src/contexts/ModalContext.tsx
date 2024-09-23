"use client";

import Form, { FORM_MODE } from "MyApp/components/Form";
import Modal from "MyApp/components/Modal";
import React, { createContext, ReactNode, useContext, useState } from "react";

export interface FormField {
  name: string;
  label: string;
  component: "input" | "textarea" | "star-rating";
  type?: "text" | "number";
}

interface ModalContextType {
  isOpen: boolean;
  openModal: (
    fields: FormField[],
    mode: FORM_MODE,
    initialValues: Record<string, any>,
    title: string,
    onSubmit: (data: any) => void
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [mode, setMode] = useState<FORM_MODE>(FORM_MODE.CREATE);
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});
  const [handleSubmit, setHandleSubmit] = useState<(data: Record<string, any>) => void>(() => () => {});
  const [title, setTitle] = useState<string>("Create");

  const openModal = (
    fields: FormField[],
    mode: FORM_MODE,
    initialValues: Record<string, any>,
    title: string,
    onSubmit: (data: any) => void
  ) => {
    setFormFields(fields);
    setMode(mode);
    setInitialValues(initialValues);
    setTitle(title);
    setHandleSubmit(() => onSubmit); // Set the onSubmit handler
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setFormFields([]);
    setInitialValues({});
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {isOpen && (
        <Modal onClose={closeModal}>
          <Form
            formFields={formFields}
            mode={mode}
            initialValues={initialValues}
            title={title}
            onSubmit={(data: Record<string, any>) => {
              handleSubmit(data); // Call the provided onSubmit handler
              closeModal();
            }}
          />
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
