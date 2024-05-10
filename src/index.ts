import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { Application } from "./dependency-injection/dependency-injection";
const app = new Elysia();
const endpointUser = new Application().endpointUser;

app
  .use(swagger())
  .group("/api", (app) => app.use(endpointUser.registerRoute()))
  .listen(process.env.PORT || 3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
