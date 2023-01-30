import React, {useState} from 'react'
import { trpc } from '../utils/trpc';

export const User = () => {
  const [name, setName] = useState('')

  const hello = trpc.hello.useQuery({ text: name });

  return (
    <div>
      <input type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)}/>
      <h1>{hello.data?.greeting}</h1>
    </div>
  )
}
