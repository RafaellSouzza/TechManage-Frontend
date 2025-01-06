export enum TipoUsuarioEnum {
  ADMINISTRADOR = 'Administrador',
  EDITOR = 'Editor',
  VISUALIZADOR = 'Visualizador',
}

export interface UsuarioRequest {
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  tipoUsuario: TipoUsuarioEnum;
  foto?: string;
}

export interface UsuarioResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  tipoUsuario: TipoUsuarioEnum;
  foto?: string;
}

export interface Usuario extends UsuarioResponse {
  dataCriacao: Date;
  ativo: boolean;
}
