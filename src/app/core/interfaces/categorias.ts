import { Producto } from "./productos";

export interface Categoria {
  forEach(arg0: (categoria: any) => void): unknown;
  id: number;
  nombre: string;
  fotoUrl: string;
  productos: Producto[]
}