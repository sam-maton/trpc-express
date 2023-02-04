import React, {useState} from 'react'
import { trpc } from '../utils/trpc';

interface User {
  id: string;
  name: string;
}

const UsersList = ({users, isLoading}: {isLoading: boolean, users: User[] | undefined}) => {
  if(isLoading){
    return <span>Loading....</span>
  }
  return (
    <ul className="list-disc">
      {users?.map((u) => {
        return <li key={u.id}>{u.name}</li>;
      })}
    </ul>
  );
};

export const User = () => {

  const getUsersQuery = trpc.getUsers.useQuery();

  const addUserMutation = trpc.addUser.useMutation({
    onSuccess: () => {
      getUsersQuery.refetch();
    }
  });
  
  const [name, setName] = useState('')

  const addUser = () => {
    addUserMutation.mutate({name})
  }

  
  return (
    <main className="flex flex-col w-full h-screen items-center justify-center gap-5">
      <section className="flex flex-col gap-5">
        <div>
          <input
            type="text"
            placeholder="Enter new user name"
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-blue-600 rounded-md p-2 mr-5"
          />
          <button
            className="bg-blue-600 text-zinc-100 p-2.5 rounded-md hover:bg-blue-700 active:bg-blue-500"
            onClick={addUser}
          >
            Add User
          </button>
        </div>
        <UsersList isLoading={getUsersQuery.isLoading} users={getUsersQuery.data?.users}/>
      </section>
    </main>
  );
}
