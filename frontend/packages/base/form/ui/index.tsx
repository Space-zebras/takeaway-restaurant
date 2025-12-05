import React from "react";
import './index.css';

type Input = { label: string; name: string; type: string; required?: boolean };

type FormProps = {
  inputs: Input[];
  formData: Record<string, string>;
  setFormData: React.Dispatch<React.SetStateAction<Record<string, string>>>;
};

export const Form = ({ inputs, formData, setFormData }: FormProps) => {
  return (
    <>
      {inputs.map((input) => (
        <div key={input.name} className="form__group">
          <label htmlFor={input.name} className="form__label">
            {input.label}
          </label>
          <input
            id={input.name}
            name={input.name}
            type={input.type}
            required={input.required}
            value={formData[input.name] || ""}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            className="form__input"
          />
        </div>
      ))}
    </>
  );
};
