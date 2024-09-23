import "./Input.css";

import { useState, type ChangeEvent, type HTMLInputTypeAttribute } from "react";

interface InputProps {
  id?: string;
  isTextarea?: boolean;
  name?: string;
  placeholder: string;
  required?: boolean;
  minLength?: number;
  type?: HTMLInputTypeAttribute;
  onChange: any;
  value: string;
  rows?: number;
  autocomplete?: string;
}

const errorMessages = {
  valueMissing: "Can't be empty",
  typeMismatch: "Wrong format",
  tooShort: "Too short",
};

const Input = ({
  id = "",
  isTextarea = false,
  onChange,
  name = "",
  placeholder,
  required = true,
  minLength = 4,
  type = "text",
  value,
  rows = 3,
  autocomplete = "",
}: InputProps) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckValidity = (e: ChangeEvent) => {
    const inputElement = e.target as HTMLInputElement;

    if (inputElement.validity.valueMissing) {
      setErrorMessage(errorMessages.valueMissing);
    }

    if (inputElement.validity.typeMismatch) {
      setErrorMessage(errorMessages.typeMismatch);
    }

    if (inputElement.validity.tooShort) {
      setErrorMessage(errorMessages.tooShort);
    }

    if (inputElement.validity.valid) {
      setErrorMessage("");
    }
  };

  if (!isTextarea) {
    return (
      <div className="input-container">
        <input
          id={id}
          onChange={(e) => {
            onChange(e);
            handleCheckValidity(e);
          }}
          value={value}
          className="input__element"
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          autoComplete={autocomplete}
        />
        {errorMessage && (
          <div className="input__error input__error--normal">
            <p>{errorMessage}</p>
            <img src="/icons/icon-input-error.svg" alt="Input error icon" />
          </div>
        )}
      </div>
    );
  }

  if (isTextarea) {
    return (
      <div className="input-container">
        <textarea
          id={id}
          className="input__element"
          onChange={(e) => {
            onChange(e);
            handleCheckValidity(e);
          }}
          value={value}
          placeholder={placeholder}
          required={required}
          minLength={minLength}
          rows={rows}
        />
        {errorMessage && (
          <div className="input__error input__error--textarea">
            <p>{errorMessage}</p>
            <img src="/icons/icon-input-error.svg" alt="Input error icon" />
          </div>
        )}
      </div>
    );
  }
};

export default Input;
