import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onClearCache: () => void;
  onForceRefresh?: () => void;
  isStale?:  boolean;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center bg-red-50 border border-amber-900 rounded-lg p-6 max-w-md">
        <div className="text-amber-900 mb-4">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-amber-900 mb-2">Error al cargar productos</h3>
        <p className="text-amber-900 mb-4">{error}</p>
        <div className="space-y-2">
          <Button onClick={onRetry} variant="outline" className="border-amber-900 text-amber-900 hover:bg-red-50 w-full">
            Reintentar
          </Button>
        </div>
      </div>
    </div>
  );
}