import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { endpointsUser } from "./dependency-injection/dependency-injection";
const app = new Elysia();

app
  .use(swagger())
  .get("/sign/:name", async ({ jwt, cookie: { auth }, params }) => {
    auth.set({
      value: await jwt.sign(params),
      httpOnly: true,
      maxAge: 7 * 86400,
      path: "/profile",
    });

    return `Sign in as ${auth.value}`;
  })
  .group("/api", (app) => app.use(endpointsUser))
  .listen(process.env.PORT ?? 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
