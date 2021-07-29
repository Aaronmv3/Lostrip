import { Habitacion } from './habitaciones.model';
import { comentario } from './comentarios.model';
export interface Filtro {
  filtros: string;
}
export interface Foto {
  url: string;
  imagenId: string;
}
export interface Alojamiento{
    nombre?: string;
    dueno?: string;
    descripcion?: string;
    id?: number;
    valoracion?: number;
    estrellas?: number;
    fotos?: Foto[];
    localizacion?: string;
    oferta?: boolean;
    filtros?: Filtro[];
    comentarios?: comentario[];
    habitaciones?: Habitacion[];
  }
