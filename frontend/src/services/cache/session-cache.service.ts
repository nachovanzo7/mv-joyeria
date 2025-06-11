// services/cache/smart-cache.service.ts
import { ICacheService } from "@/interfaces/cache.interface";
import { CacheData, Producto, CacheMetadata, CacheStrategy } from "@/types/product.types";

export class SmartCacheService implements ICacheService {
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos default
  private readonly strategy: CacheStrategy;

  constructor(
    private readonly key: string, 
    strategy: CacheStrategy = CacheStrategy.TIME_BASED,
    private readonly cacheDuration: number = 5 * 60 * 1000
  ) {
    this.strategy = strategy;
  }

  get(): CacheData | null {
    try {
      const cached = sessionStorage.getItem(this.key);
      if (!cached) return null;
      
      const data: CacheData = JSON.parse(cached);
      
      if (this.isCacheExpired(data)) {
        this.clear();
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error reading cache:', error);
      return null;
    }
  }

  set(productos: Producto[], metadata?: CacheMetadata): void {
    try {
      const data: CacheData = {
        productos,
        timestamp: Date.now(),
        metadata
      };
      sessionStorage.setItem(this.key, JSON.stringify(data));
    } catch (error) {
      console.error('Error setting cache:', error);
    }
  }

  clear(): void {
    try {
      sessionStorage.removeItem(this.key);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  // Verificar si el caché ha expirado según la estrategia
  private isCacheExpired(data: CacheData): boolean {
    const now = Date.now();
    
    switch (this.strategy) {
      case CacheStrategy.TIME_BASED:
        return now - data.timestamp > this.cacheDuration;
      
      case CacheStrategy.MANUAL_REFRESH:
        return false; // Nunca expira automáticamente
      
      case CacheStrategy.POLLING:
        // Expira más rápido para forzar checks frecuentes
        return now - data.timestamp > (this.cacheDuration / 2);
      
      case CacheStrategy.ETAG:
      case CacheStrategy.VERSION_BASED:
        // Solo expira por tiempo si no hay metadata
        return !data.metadata && (now - data.timestamp > this.cacheDuration);
      
      default:
        return now - data.timestamp > this.cacheDuration;
    }
  }

  // Obtener metadatos del caché
  getMetadata(): CacheMetadata | null {
    const cached = this.get();
    return cached?.metadata || null;
  }

  // Verificar si necesita revalidación
  needsRevalidation(): boolean {
    const cached = this.get();
    if (!cached) return true;

    switch (this.strategy) {
      case CacheStrategy.POLLING:
        return Date.now() - cached.timestamp > 30000; // 30 segundos
      
      case CacheStrategy.ETAG:
      case CacheStrategy.VERSION_BASED:
        return true; // Siempre verificar con servidor
      
      default:
        return this.isCacheExpired(cached);
    }
  }
}