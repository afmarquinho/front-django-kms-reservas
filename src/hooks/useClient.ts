import { useEffect, useState } from "react";
import { createClient, getClients, updateClient } from "../api/clientApi";
import type { TClient, TClientForm } from "../types";

export const useClient = () => {
  const [clients, setClients] = useState<TClient[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // const cachedClients = localStorage.getItem("clients");
    // if (cachedClients) {
    //   setClients(JSON.parse(cachedClients));
    // } else {
    //   loadClients();
    // }
    loadClients(); //TODO: Al activar el local storage, quitar esta línea
  }, []);

  const loadClients = async () => {
    try {
      const { data } = await getClients();
      setClients(data);
      localStorage.setItem("clients", JSON.stringify(data));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error("Error al cargar los clientes", err);
    } finally {
      setLoading(false);
    }
  };

  const createNewClient = async (client: TClientForm) => {
    try {
      const { data } = await createClient(client);

      setClients((prevClients) => {
        const updatedClients = [...prevClients, data];
        localStorage.setItem("clients", JSON.stringify(updatedClients));
        return updatedClients;
      });
    } catch (err) {
      console.error("Error al crear el cliente", err);
    }
  };
  const onEditClient = async (id:number, client: TClientForm) => {
    setLoading(true);
    try {
      // console.log("SALA A EDITAR", room)
      await updateClient(id, client);
      const updatedClients = clients.map((r) =>
        r.id === id ? { ...r, client} : r
      );

      setClients(updatedClients);
      localStorage.setItem("clients", JSON.stringify(updatedClients));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error(
        `Error al editar la sala`,
        err
      );
    } finally {
      setLoading(false);
    }
  };


  return {
    clients,
    loading,
    error,
    reload: loadClients,
    setClients,
    createNewClient,
    onEditClient
  };
};
