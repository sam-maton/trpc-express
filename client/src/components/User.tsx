import React, {useState, useEffect} from 'react'
import { trpc } from '../utils/trpc';

const UsersList = ({data, isLoading}) => {

  if(isLoading){
    return <span>Loading....</span>
  }
  return (
    <ul className="list-disc">
      {data?.users.map((u) => {
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
        {/* <ul className="list-disc">
          {getUsersQuery.data?.users.map((u) => {
            return <li key={u.id}>{u.name}</li>;
          })}
        </ul> */}
        <UsersList {...getUsersQuery}/>
      </section>
    </main>
  );
}
