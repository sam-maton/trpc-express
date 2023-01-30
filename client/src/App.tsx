import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import './App.css';
import { User } from './components/User'

function App() {
  //trpc
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8000/trpc",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <User />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App
