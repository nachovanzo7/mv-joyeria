// types/product.types.ts
export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
  disponible: boolean;
  categorias: { id: number; nombre: string; slug: string }[];
  material: { id: number; tipo: string };
};

export interface CacheMetadata {
  etag?: string | null;
  lastModified?: string | null;
  version?: string;
}

export interface CacheData {
  productos: Producto[];
  timestamp: number;
  metadata?: CacheMetadata;
}

export interface ProductState {
  productos: Producto[];
  loading: boolean;
  error: string | null;
  imageErrors: Set<number>;
  isFromCache: boolean;
  lastUpdated?: Date;
}

export const CacheStrategy = {
  TIME_BASED: 'time_based',
  ETAG: 'etag',
  POLLING: 'polling',
  MANUAL_REFRESH: 'manual_refresh',
  VERSION_BASED: 'version_based',
} as const;

export type CacheStrategy = typeof CacheStrategy[keyof typeof CacheStrategy];
