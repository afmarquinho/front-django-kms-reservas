import { useEffect, useState } from "react";
import { getClients } from "../api/clientApi";

const ClientPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const data = getClients();
    console.log(data);
  }, []);

  return <div>ClientPage</div>;
};
export default ClientPage;
