import { useState, type ChangeEvent, type FormEvent } from "react";
import type { TClientForm } from "../types";

export const useClientForm = (initialValue: TClientForm) => {
  const [formValues, setFormValues] = useState<TClientForm>(initialValue);
  const [error, setError] = useState<string>("");

  const onInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setError("");
    const { name, value, type } = event.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formValues.nombre === "") {
      setError("Ingresa un nombre");
      return;
    }

    if (formValues.email === "") {
      setError("Ingresa un correo");
      return;
    }

    setError("");
  };

  const resetForm = (values: TClientForm) => {
    setFormValues(values);
  };

  return {
    formValues,
    error,
    onInputChange,
    onSubmit,
    resetForm,
    setFormValues,
  };
};
