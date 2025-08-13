// Tipos para rooms
export type TRoomForm = {
  nombre: string;
  direccion: string;
  capacidad: number;
  tarifa_por_hora: number; // viene como string del backend
};

export type TRoom = TRoomForm & {
  id: number;
  disponible: boolean;
  created: string; // ISO date
  updated: string; // ISO date
};

// Tipos para clientes
export type TClientForm = {
  nombre: string;
  email: string;
};

export type TClient = TClientForm & {
  id: number;
  created: string; // ISO date
  updated: string; // ISO date
};
