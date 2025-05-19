export interface Usuario {
  nombre: string;
  email: string;
  password: string;
  tipo: 'cliente' | 'administrador' | 'transportista';
  estado?: 'activo' | 'inactivo';
}
