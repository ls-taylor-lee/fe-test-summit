import { FormField } from "MyApp/contexts/ModalContext";
import React, { useState } from "react";
import StarRating from "./StarRating";

interface FormProps {
  formFields: FormField[];
  mode: FORM_MODE;
  initialValues: Record<string, any>;
  title: string;
  onSubmit: (data: any) => void;
}

export enum FORM_MODE {
  CREATE,
  EDIT,
}

const Form: React.FC<FormProps> = ({ formFields, mode = FORM_MODE.CREATE, initialValues, title, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, any>>({ ...initialValues });

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderFormField = (field: FormField) => {
    switch (field.component) {
      case "star-rating":
        return (
          <div className="mb-4" key={field.name}>
            <label className="block mb-2">{field.label}</label>
            <StarRating
              rating={formData[field.name]}
              onRatingChange={(v) => setFormData({ ...formData, [field.name]: v })}
            />
          </div>
        );

      case "textarea":
        <div className="mb-4" key={field.name}>
          <label className="block mb-2">{field.label}</label>
          <textarea
            className="w-full border border-gray-300 px-3 py-2 rounded-lg text-black bg-white dark:text-white dark:bg-black"
            value={formData[field.name]}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
          />
        </div>;
      case "input":
      default:
        return (
          <div className="mb-4" key={field.name}>
            <label className="block mb-2">{field.label}</label>
            <input
              type={field.type}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg text-black bg-white dark:text-white dark:bg-black"
              value={formData[field.name]}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            />
          </div>
        );
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {formFields.map((field) => {
        return renderFormField(field);
      })}
      <button
        className="bg-green-600 px-4 py-2 rounded hover:bg-green-500 text-white transition w-full"
        onClick={() => handleSubmit()}
      >
        {mode === FORM_MODE.CREATE ? "Add" : "Edit"}
      </button>
    </div>
  );
};

export default Form;
