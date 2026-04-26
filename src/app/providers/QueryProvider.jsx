import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

/**
 * QueryClient Configuration
 * ────────────────────────────────────────────────────
 * Optimized for performance and reduced network requests
 * 
 * Key optimizations:
 * - staleTime: 5 minutes - prevents refetching fresh data
 * - gcTime: 10 minutes - keeps data in cache for longer
 * - refetchOnWindowFocus: false - prevents refetch when returning to tab
 * - refetchOnReconnect: false - use local data on reconnect
 * - retry: 1 - only retry once for failed requests
 * - refetchIntervalInBackground: false - don't refetch while not focused
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes - data is fresh for 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes - keep data in cache for 10 minutes
      refetchOnWindowFocus: false, // Don't refetch when user returns to tab
      refetchOnReconnect: false, // Don't refetch on network reconnect
      refetchIntervalInBackground: false, // Don't refetch when app is not focused
      retry: 1, // Retry failed requests once
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    },
    mutations: {
      retry: 0, // Don't retry mutations
    },
  },
});

export function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}





