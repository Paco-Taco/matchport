export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  tokens: Tokens;
  user: User;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  username: string;
  email: string;
  rol: string;
}

export interface Data {
  user_data: UserData;
  apex_token: string;
  teus_token: string;
}

export interface UserData {
  usuario_info: UsuarioInfo;
  empresa_info: EmpresaInfo;
}

export interface EmpresaInfo {
  sk_contexto: string;
  s_nombre_comercial: string;
  s_razon_social: string;
  s_rfc: string;
  sucursales: object;
}

export interface UsuarioInfo {
  sk_grupo_empresarial: string;
  sk_usuario: string;
  s_usuario: string;
  s_correo: string;
  s_nombre: string;
  s_apellido_paterno: string;
  s_apellido_materno: string;
  s_rfc: string;
  sk_area: string;
  area: string;
  sk_departamento: string;
  departamento: string;
  sk_puesto: string;
  puesto: string;
}
