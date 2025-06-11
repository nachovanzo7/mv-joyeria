import { Producto } from "../types/product.types";

export interface IProductService {
  fetchProducts(): Promise<Producto[]>;
  getCachedProducts(): Producto[] | null;
  cacheProducts(productos: Producto[]): void;
  clearCache(): void;
}