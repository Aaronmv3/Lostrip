export class UsuarioModel {
    userID: string;
    nombre: string;
    apellidos?: string;
    email: string;
    nick?: string;
    fechaNacimiento?: string;
    usuarioRol: string;
    telefono?: number;
    fotoPerfil: string;
    password?: string;
    nacionalidad?: string;
    genero?: string;
    reservas?: string[];
}