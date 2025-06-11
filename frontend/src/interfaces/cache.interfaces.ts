import { CacheData, Producto } from "../types/product.types.ts";

export interface ICacheService {
  get(): CacheData | null;
  set(productos: Producto[]): void;
  clear(): void;
}