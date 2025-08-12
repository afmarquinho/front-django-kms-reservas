/**
 * RoomTable
 * props:
 *  - rooms: array de salas
 *  - onUpdateStatus(room)
 *  - onToggleState(room)
 *  - onDelete(room)
 */

import { useState } from "react";
import { formatCurrency, formatDate } from "../../helpers/helpers";
import type { TRoom } from "../../types";
import { RoomForm } from "./RoomForm";
import { SquaresExcludeIcon } from "lucide-react";

export type RoomTableProp = {
  rooms: TRoom[];
  onToggleState?: (room: TRoom) => void;
  onDelete?: (room: TRoom) => void;
};

const RoomTable: React.FC<RoomTableProp> = ({
  rooms,
  onToggleState,
  onDelete,
}) => {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editRoom, setEditRoom] = useState<TRoom | null>(null);

  const handleEdit = (r: TRoom) => {
    setEditRoom(r);
    setIsFormOpen(true);
  };

  return (
    <>
      <div className={`w-full flex justify-end items-center`}>
        <button
          className={`flex items-center justify-center gap-2 bg-purple-600 px-3 py-1.5 hover:bg-purple-700 text-white text-sm rounded-md shadow-sm focus:outline-none mb-3`}
          onClick={() => setIsFormOpen(true)}
        >
          <SquaresExcludeIcon /> <span>Agregar</span>
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 select-none">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600"></th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Dirección
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                Capacidad
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                Tarifa / hora
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                Disponible
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
            {rooms.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No hay salas disponibles
                </td>
              </tr>
            ) : (
              rooms.map((r, index) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">
                    {r.nombre}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                    {r.direccion}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-700">
                    {r.capacidad}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium text-gray-800">
                    {formatCurrency(r.tarifa_por_hora)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm">
                    {r.disponible ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Sí
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600">
                    {formatDate(r.created)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(r)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md shadow-sm focus:outline-none"
                      aria-label={`Editar ${r.nombre}`}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => onToggleState && onToggleState(r)}
                      className="px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-md shadow-sm focus:outline-none w-22"
                      aria-label={`Cambiar estado ${r.nombre}`}
                    >
                      {r.disponible ? "Desactivar" : "Activar"}
                    </button>

                    <button
                      onClick={() => onDelete && onDelete(r)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md shadow-sm focus:outline-none"
                      aria-label={`Eliminar ${r.nombre}`}
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
        <RoomForm
          setIsFormOpen={setIsFormOpen}
          setEditRoom={setEditRoom}
          editRoom={editRoom}
        />
      )}
    </>
  );
};

/** helper interno para formatear tarifa */

export default RoomTable;
