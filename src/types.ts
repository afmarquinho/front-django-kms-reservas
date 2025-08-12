
export type TRoomForm = {
  nombre: string;
  direccion: string;
  capacidad: number;
  tarifa_por_hora: number; // viene como string del backend
};

export type TRoom =  TRoomForm & {
  id: number;  
  disponible: boolean;
  created: string; // ISO date
  updated: string; // ISO date
};
