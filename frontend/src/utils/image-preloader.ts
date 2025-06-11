// utils/image-preloader.ts
import { Producto } from "@/types/product.types";

export class ImagePreloader {
  static preloadCriticalImages(productos: Producto[], count: number = 4): void {
    const criticalProducts = productos.slice(0, count);
    criticalProducts.forEach(producto => {
      const img = new Image();
      img.src = producto.imagen;
    });
  }
}