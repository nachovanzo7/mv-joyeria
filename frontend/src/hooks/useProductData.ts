// hooks/useProductData.ts - Enhanced
import { useState, useCallback, useMemo, useEffect } from 'react';
import { EnhancedProductService } from '@/services/product/product.service';
import { SmartCacheService } from '@/services/cache/session-cache.service';
import { ImagePreloader } from '@/utils/image-preloader';
import { Producto, ProductState, CacheStrategy } from '@/types/product.types';

const CACHE_KEY = 'market_productos';

interface UseProductDataOptions {
  strategy?: CacheStrategy;
  cacheDuration?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

interface UseProductDataReturn extends ProductState {
  cargarProductos: (forceRefresh?: boolean) => Promise<void>;
  refreshData: () => void;
  clearCache: () => void;
  setImageErrors: React.Dispatch<React.SetStateAction<Set<number>>>;
  forceRefresh: () => void;
  isStale: boolean;
}

export function useProductData(options: UseProductDataOptions = {}): UseProductDataReturn {
  const {
    strategy = CacheStrategy.TIME_BASED,
    cacheDuration = 5 * 60 * 1000,
    autoRefresh = false,
    refreshInterval = 60000
  } = options;

  const productService = useMemo(() => {
    const cacheService = new SmartCacheService(CACHE_KEY, strategy, cacheDuration);
    return new EnhancedProductService(cacheService, strategy);
  }, [strategy, cacheDuration]);

  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  const [isFromCache, setIsFromCache] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(async () => {
      try {
        await cargarProductos(false);
      } catch (error) {
        console.warn('Auto-refresh failed:', error);
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);


  useEffect(() => {
    return () => {
      productService.destroy?.();
    };
  }, [productService]);

  const cargarProductos = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      setImageErrors(new Set());
      setIsStale(false);
      
      
      if (!forceRefresh) {
        const cachedProducts = productService.getCachedProducts();
        if (cachedProducts && cachedProducts.length > 0) {
          setProductos(cachedProducts);
          setIsFromCache(true);
          setLoading(false);
          ImagePreloader.preloadCriticalImages(cachedProducts);


          if (strategy === CacheStrategy.ETAG || strategy === CacheStrategy.VERSION_BASED) {

            setTimeout(async () => {
              try {
                const freshProducts = await productService.fetchProducts(false);
                if (JSON.stringify(freshProducts) !== JSON.stringify(cachedProducts)) {
                  setProductos(freshProducts);
                  setIsFromCache(false);
                  setLastUpdated(new Date());
                  ImagePreloader.preloadCriticalImages(freshProducts);
                }
              } catch (error) {
                console.warn('Background refresh failed:', error);
                setIsStale(true);
              }
            }, 100);
          }
          
          return;
        }
      }
      
      setIsFromCache(false);
      const productosData = await productService.fetchProducts(forceRefresh);
      
      setProductos(productosData);
      setLastUpdated(new Date());
      
      if (productosData.length > 0) {
        ImagePreloader.preloadCriticalImages(productosData);
      }
    } catch (error) {
      console.error("Error cargando productos:", error);
      setError(
        error instanceof Error 
          ? error.message 
          : "No se pudieron cargar los productos"
      );
      setIsStale(true);
    } finally {
      setLoading(false);
    }
  }, [productService, isFromCache, strategy]);

  const refreshData = useCallback(() => {
    cargarProductos(false);
  }, [cargarProductos]);

  const forceRefresh = useCallback(() => {
    cargarProductos(true);
  }, [cargarProductos]);

  const clearCache = useCallback(() => {
    productService.clearCache();
    setIsFromCache(false);
    setIsStale(false);
    setLastUpdated(undefined);
  }, [productService]);

  return {
    productos,
    loading,
    error,
    imageErrors,
    isFromCache,
    lastUpdated,
    isStale,
    cargarProductos,
    refreshData,
    forceRefresh,
    clearCache,
    setImageErrors
  };
}