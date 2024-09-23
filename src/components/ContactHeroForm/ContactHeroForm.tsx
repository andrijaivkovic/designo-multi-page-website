import { useState, type ChangeEvent, type SyntheticEvent } from "react";

import Input from "../Input/Input";

import "./ContactHeroForm.css";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const formInitialState = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

const ContactHeroForm = () => {
  const [formData, setFormData] = useState<FormData>(formInitialState);

  const handleChange = (e: ChangeEvent) => {
    const { id, value } = e.target as HTMLInputElement;

    setFormData((values) => ({ ...values, [id]: value }));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const isFormValid = formElement.checkValidity();

    if (isFormValid) {
      console.log(formData);
      setFormData(formInitialState);
    }

    if (!isFormValid) {
      console.log("form is not valid");
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off"
      noValidate
      className="contact__form"
    >
      <div className="contact__form-inputs">
        <Input
          value={formData.name}
          onChange={handleChange}
          name="name"
          id="name"
          placeholder="Name"
          autocomplete="name"
        />
        <Input
          value={formData.email}
          onChange={handleChange}
          id="email"
          name="email"
          placeholder="Email Address"
          type="email"
          autocomplete="email"
        />
        <Input
          value={formData.phone}
          onChange={handleChange}
          id="phone"
          name="phone"
          placeholder="Phone Number"
          type="text"
          autocomplete="tel-local"
        />
        <Input
          name="message"
          id="message"
          placeholder="Your message"
          isTextarea={true}
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <div className="contact__form-actions">
        <button className="button inverted" type="submit">
          <p>Submit</p>
        </button>
      </div>
    </form>
  );
};

export default ContactHeroForm;
