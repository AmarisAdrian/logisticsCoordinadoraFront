export interface Usuario {
  id_usuario?: number;
  nombre: string;
  email: string;
  password?: string;
  tipo: 'cliente' | 'administrador' | 'transportista';
  estado?: 'activo' | 'inactivo';
}

 export interface UsuariosResponse {
    status: string;
    message: string;
    data: Usuario[];
  }

  export interface UsuarioResponse {
    status: string;
    message: string;
    data: Usuario;
  }