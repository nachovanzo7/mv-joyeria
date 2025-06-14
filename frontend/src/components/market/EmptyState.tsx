import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onRefresh: () => void;
  onClearCache: () => void;
  onForceRefresh?: () => void;
}

export function EmptyState({ onRefresh }: EmptyStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">  
      <div className="text-center">
        <p className="text-gray-600 text-lg mb-4">No hay productos disponibles</p>
        <div className="space-y-2">
          <Button onClick={onRefresh} variant="outline">
            Actualizar
          </Button>
        </div>
      </div>
    </div>
  );
}