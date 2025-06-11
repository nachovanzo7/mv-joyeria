interface LoadingStateProps {
    isFromCache: boolean;
  }
  
  export function LoadingState({ }: LoadingStateProps) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
        </div>
      </div>
    );
  }