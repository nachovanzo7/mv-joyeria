// services/api.ts
import type { Producto } from '@/types/product.types';

export async function fetchProductos(): Promise<Producto[]> {
    const response = await fetch('http://127.0.0.1:8000/api/productos/');
    if (!response.ok) {
      throw new Error('Error al cargar los productos');
    }
    const json = await response.json();
    return json.results;
  }

export async function fetchProductoById(id: string | number): Promise<Producto> {
  const response = await fetch(`http://127.0.0.1:8000/api/productos/${id}`)
  if (!response.ok) {
    throw new Error('Error al cargar los productos');
  }
  const json = await response.json();
  return json;
}