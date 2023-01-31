import React, {useState} from 'react'
import { trpc } from '../utils/trpc';

export const User = () => {
  const [name, setName] = useState('')

  const users = trpc.getUsers.useQuery(); 

  return (
    <main className='flex flex-col w-full h-full items-center justify-center gap-5'>
      <input 
        type="text"
        placeholder="Enter new user name"
        onChange={e => setName(e.target.value)}
        className="border-2 border-blue-600 rounded-md p-1"
      />
      <ul
        className='list-disc'
      >
        {users.data?.users.map((u) => {
          return(
            <li key={u.id}>{u.name}</li>
          )
        })}
      </ul>
    </main>
  )
}
