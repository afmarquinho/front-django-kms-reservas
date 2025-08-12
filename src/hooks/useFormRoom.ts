import { useState, type ChangeEvent, type FormEvent } from "react";
import type { TRoomForm } from "../types";

export const useFormRoom = (initialValue: TRoomForm) => {
  const [formValues, setFormValues] = useState<TRoomForm>(initialValue);
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
    if (formValues.capacidad === 0 || formValues.capacidad <= 0) {
      setError("Ingresa una capacidad válida");
      return;
    }
    if (formValues.direccion === "") {
      setError("Ingresa una dirección");
      return;
    }
    if (formValues.tarifa_por_hora === 0 || formValues.tarifa_por_hora <= 0) {
      setError("Ingresa una tarifa válida");
      return;
    }

    setError("");
  };

  const resetForm = () => {
    setFormValues(initialValue);
  };

  return { formValues, error, onInputChange, onSubmit, resetForm };
};
