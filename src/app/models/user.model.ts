export interface UsuarioRequest {
    nome: string;
    email: string;
    telefone: string;
    foto?: string; 
  }
  
  export interface UsuarioResponse {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    foto?: string;
  }
  
  export interface Usuario extends UsuarioResponse {
    dataCriacao: Date;
    ativo: boolean;
  }
  