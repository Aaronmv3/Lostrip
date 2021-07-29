import { Foto, Filtro } from './alojamientos.model';
import { comentario } from './comentarios.model';
export interface Experiencias{
    nombre?: string;
    precio?: number;
    dueno?: string;
    descripcion?: string;
    id?: number;
    valoracion?: number;
    estrellas?: number;
    fotos?: Foto[];
    localizacion?: string;
    oferta?: boolean;
    comentarios?: comentario[],
    filtros?: Filtro[];
  }