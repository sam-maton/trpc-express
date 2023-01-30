import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { trpc } from './utils/trpc';
import './App.css';
import axios from "axios";
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

  // const [name, setName] = useState('')

  // useEffect( () => {
  //   axios("http://localhost:8000/").then( response => {
  //     setName(response.data);
  //   });
  // }, []);

  //const user = trpc.userById.useQuery('1');

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <h1>hi</h1>
          <User />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App
