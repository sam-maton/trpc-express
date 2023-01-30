import React from 'react'
import { trpc } from '../utils/trpc';

export const User = () => {
  const hello = trpc.hello.useQuery({ text: 'Sam' });

  if (!hello.data) return <div>Loading...</div>;
  return (
    <div>{hello.data.greeting}</div>
  )
}
