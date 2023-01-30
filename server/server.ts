import express from 'express';
import cors from 'cors';
import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod'

const t = initTRPC.create();

interface User {
  id: string;
  name: string;
}
 
const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
  },
];

const appRouter = t.router({
  // Create procedure at path 'hello'
  hello: t.procedure
    // using zod schema to validate and infer input values
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
})

export type AppRouter = typeof appRouter;

const app = express();
app.use(cors())

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter
  })
)

app.listen(8000, () => {
  console.log(`[server]: Server is running at http://localhost: 8000`);
});