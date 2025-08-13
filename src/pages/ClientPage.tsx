import { HomeIcon } from "lucide-react";
import { ClientesTable } from "../components/clients";
import { useNavigate } from "react-router-dom";
import { useClient } from "../hooks/useClient";

export const ClientPage = () => {
  const { clients } = useClient();

  const navigate = useNavigate();
  return (
    <>
      <div className="p-6">
        <button
          className={`bg-gray-400 px-3 py-1.5 hover:bg-gray-700 text-white text-sm rounded-md shadow-sm focus:outline-none mb-3`}
          onClick={() => navigate(-1)}
        >
          <HomeIcon />
        </button>

        <h1 className="text-2xl font-bold mb-2 flex-1">Gestión de Clientes</h1>
        <ClientesTable clients={clients} />
      </div>
    </>
  );
};

export default ClientPage;
