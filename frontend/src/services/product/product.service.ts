// services/product/enhanced-product.service.ts
import { IProductService } from "@/interfaces/product.interface";
import { SmartCacheService } from "@/services/cache/smart-cache.service";
import { Producto, CacheStrategy } from "@/types/product.types";

export class EnhancedProductService implements IProductService {
  private readonly API_URL = "http://127.0.0.1:8000/api/productos/";
  private refreshInterval?: NodeJS.Timeout;

  constructor(
    private readonly cacheService: SmartCacheService,
    private readonly strategy: CacheStrategy = CacheStrategy.TIME_BASED
  ) {
    // Configurar polling si es necesario
    if (strategy === CacheStrategy.POLLING) {
      this.startPolling();
    }
  }

  async fetchProducts(forceRefresh: boolean = false): Promise<Producto[]> {
    // Refresh forzado
    if (forceRefresh) {
      return this.fetchFromAPI();
    }

    // Verificar caché
    const cachedData = this.cacheService.get();
    
    // No hay caché, fetch desde API
    if (!cachedData) {
      return this.fetchFromAPI();
    }

    // Diferentes estrategias de validación
    switch (this.strategy) {
      case CacheStrategy.ETAG:
        return this.handleETagStrategy(cachedData.productos);
      
      case CacheStrategy.VERSION_BASED:
        return this.handleVersionStrategy(cachedData.productos);
      
      case CacheStrategy.MANUAL_REFRESH:
        return cachedData.productos;
      
      case CacheStrategy.POLLING:
        // El polling maneja la actualización en background
        return cachedData.productos;
      
      default: // TIME_BASED
        return cachedData.productos;
    }
  }

  private async handleETagStrategy(cachedProducts: Producto[]): Promise<Producto[]> {
    const metadata = this.cacheService.getMetadata();
    
    try {
      const response = await fetch(this.API_URL, {
        method: 'HEAD',
        headers: metadata?.etag ? { 'If-None-Match': metadata.etag } : {}
      });

      // Si es 304, los datos no han cambiado
      if (response.status === 304) {
        return cachedProducts;
      }

      // Los datos cambiaron, fetch nuevos
      return this.fetchFromAPI();
    } catch (error) {
      console.warn('ETag check failed, using cached data:', error);
      return cachedProducts;
    }
  }

  private async handleVersionStrategy(cachedProducts: Producto[]): Promise<Producto[]> {
    try {
      // Endpoint específico para versión (implementar en tu backend)
      const versionResponse = await fetch(`${this.API_URL}version/`);
      
      if (!versionResponse.ok) {
        return cachedProducts;
      }

      const { version } = await versionResponse.json();
      const cachedVersion = this.cacheService.getMetadata()?.version;

      if (version === cachedVersion) {
        return cachedProducts;
      }

      // Nueva versión disponible
      return this.fetchFromAPI();
    } catch (error) {
      console.warn('Version check failed, using cached data:', error);
      return cachedProducts;
    }
  }

  private async fetchFromAPI(): Promise<Producto[]> {
    const response = await fetch(this.API_URL);
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    // Extraer headers para metadatos
    const etag = response.headers.get('etag');
    const lastModified = response.headers.get('last-modified');
    const version = response.headers.get('x-api-version');
    
    const data = await response.json();
    const productos = this.parseProductData(data);
    
    // Guardar con metadatos
    this.cacheService.set(productos, { etag, lastModified, version });
    
    return productos;
  }

  private parseProductData(data: any): Producto[] {
    if (Array.isArray(data)) return data;
    
    if (data && typeof data === 'object') {
      const possibleKeys = ['results', 'data', 'items', 'productos'];
      for (const key of possibleKeys) {
        if (Array.isArray(data[key])) {
          return data[key];
        }
      }
    }
    
    throw new Error(`Formato de datos inválido`);
  }

  private startPolling(): void {
    // Verificar cambios cada 30 segundos
    this.refreshInterval = setInterval(async () => {
      try {
        if (this.cacheService.needsRevalidation()) {
          await this.fetchFromAPI();
        }
      } catch (error) {
        console.warn('Polling update failed:', error);
      }
    }, 30000);
  }

  // Métodos de la interfaz
  getCachedProducts(): Producto[] | null {
    return this.cacheService.get()?.productos || null;
  }

  cacheProducts(productos: Producto[]): void {
    this.cacheService.set(productos);
  }

  clearCache(): void {
    this.cacheService.clear();
  }

  // Cleanup
  destroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }
}