"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
<<<<<<< HEAD
            staleTime: 60 * 1000, 
=======
            staleTime: 60 * 1000, // 1 minute
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
