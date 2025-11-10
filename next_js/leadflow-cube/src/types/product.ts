export interface Product {
  id: string;
  nome: string;
  descricao?: string;
  preco: number;
  company_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProductData {
  nome: string;
  descricao?: string;
  preco: number;
}

export interface UpdateProductData {
  nome?: string;
  descricao?: string;
  preco?: number;
}
