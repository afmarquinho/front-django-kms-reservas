import { useEffect, type FormEvent } from "react";
import { useClientForm } from "../../hooks/useClientForm";
import type { TClient, TClientForm } from "../../types";
import { useClient } from "../../hooks/useClient";

const initialClient: TClientForm = {
  nombre: "",
  email: "",
};
type ClientFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditClient: React.Dispatch<React.SetStateAction<TClient | null>>;
  editClient: TClient | null;
};

export const ClientForm = ({
  setIsFormOpen,
  editClient,
  setEditClient,
}: ClientFormProps) => {
  const { formValues, error, onInputChange, onSubmit, resetForm } =
    useClientForm(initialClient);

  const { createNewClient, onEditClient } = useClient();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);

    if (!editClient) {
      createNewClient(formValues);
    } else {
      setEditClient({ ...editClient, ...formValues });
      onEditClient(editClient.id, formValues);
    }
    resetForm(initialClient);
    setIsFormOpen(false);
    setEditClient(null);
  };

  const handleCancel = () => {
    resetForm(initialClient);
    setIsFormOpen(false);
    setEditClient(null);
  };

  useEffect(() => {
    if (editClient) {
      resetForm({
        nombre: editClient.nombre,
        email: editClient.email,
      });
    } else {
      resetForm(initialClient);
    }
  }, [editClient]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-black/70`}
    >
      <form
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center select-none">
          {editClient ? "Editar Cliente" : "Nuevo Cliente"}
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
        )}

        {/* Campo Nombre */}
        <div>
          <label className="block mb-1 text-sm font-medium ">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
            value={formValues.nombre}
            onChange={onInputChange}
          />
        </div>

        {/* Campo Email */}
        <div>
          <label className="block mb-1 text-sm font-medium ">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
            value={formValues.email}
            onChange={onInputChange}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
