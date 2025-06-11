// types/product.types.ts - Enhanced with cache metadata
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

// Configuración de estrategias de caché
export enum CacheStrategy {
  TIME_BASED = 'time_based',           // Basado en tiempo (actual)
  ETAG = 'etag',                       // Basado en ETag
  POLLING = 'polling',                 // Polling periódico
  MANUAL_REFRESH = 'manual_refresh',   // Solo refresh manual
  VERSION_BASED = 'version_based'      // Basado en versión de API
}