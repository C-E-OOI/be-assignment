import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { endpointsUser } from "./dependency-injection/dependency-injection";
const app = new Elysia();

app
  .use(swagger())
  .group("/api", (app) => app.use(endpointsUser))
  .listen(process.env.PORT ?? 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
