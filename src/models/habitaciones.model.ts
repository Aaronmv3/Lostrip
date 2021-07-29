import { Foto } from './alojamientos.model';
export interface Habitacion{
    id?: number;
    nombreHab: string;
    precio: number;
    capacidad: number;
    fotosHab: Foto[];
    caracteristicas: Caracteristica[];
  }

  export interface Caracteristica{
    caracteristica: string;
  }