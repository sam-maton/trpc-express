import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod'
import { randomUUID } from "crypto";
const t = initTRPC.create();

interface User {
  id: string;
  name: string;
}
 
const userList: User[] = [

];

const appRouter = t.router({

  hello: t.procedure
    .input(
      z
        .object({
          text: z.string().nullish(),
        })
        .nullish(),
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    }),
    //Get all Users
    getUsers: t.procedure.query(() => {
      return {
        users: userList
      }
    }),
    //Add new User
    addUser: t.procedure.input(
      z.object({
        name: z.string()
      })
    ).mutation(req => {
      const { name } = req.input
      const newUser : User = {
        id: randomUUID(),
        name
      }
      userList.push(newUser);
    })
})

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors())

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => {
      return {}
    }
  })
)

app.listen(8000, () => {
  console.log(`[server]: Server is running at http://localhost: 8000`);
});