import { UserPlusIcon } from "lucide-react";
import type { TClient } from "../../types";
import { formatDate } from "../../helpers/helpers";
import { useState } from "react";
import { ClientForm } from "./ClientForm";

type ClientTableProps = {
  clients: TClient[];
};

export const ClientesTable: React.FC<ClientTableProps> = ({ clients }) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editClient, setEditClient] = useState<TClient | null>(null);

    const handleEdit = (c: TClient) => {
      setEditClient(c);
      setIsFormOpen(true);
    };

  return (
    <>
      <div className="w-full flex justify-end items-center">
        <button
          className="flex items-center justify-center gap-2 bg-purple-600 px-3 py-1.5 hover:bg-purple-700 text-white text-sm rounded-md shadow-sm focus:outline-none mb-3"
          onClick={() => setIsFormOpen(true)}
        >
          <UserPlusIcon className="w-4 h-4" /> <span>Agregar</span>
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 select-none">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                #
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                Creado
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {clients.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No hay clientes registrados
                </td>
              </tr>
            ) : (
              clients.map((c, index) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {c.nombre}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                    {c.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600">
                    {formatDate(c.created)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(c)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md shadow-sm focus:outline-none"
                      aria-label={`Editar ${c.nombre}`}
                    >
                      Editar
                    </button>

                    <button
                      // onClick={() => onDelete(c)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md shadow-sm focus:outline-none"
                      aria-label={`Eliminar ${c.nombre}`}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ClientForm
          setIsFormOpen={setIsFormOpen}
          editClient={editClient}
          setEditClient={setEditClient}
        />
      )}
    </>
  );
};
