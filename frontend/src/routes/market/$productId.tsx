import { createFileRoute, useParams } from "@tanstack/react-router";
import { useProductById } from "@/hooks/useProductId";
import { LoadingState } from "@/components/market/LoadingState";
import { ErrorState } from "@/components/market/ErrorState";
import Detail from '../../components/producto-details/Product'

export const Route = createFileRoute("/market/$productId")({
  path: '$productId',
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { productId } = useParams({ from: "/market/$productId" });

  const {
    data: producto,
    isLoading,
    isError,
    error,
    refetch,
  } = useProductById(productId);

  if (isLoading) return <LoadingState isFromCache={false} />;

  if (isError || !producto)
    return (
      <ErrorState
        error={error?.message || "Producto no encontrado"}
        onRetry={refetch}
      />
    );

  return (
    <Detail producto={producto}></Detail>
    );
}
