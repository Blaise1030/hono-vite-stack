// api/index.ts
import { Hono } from "hono";
import todo from "./todo";

// Always register routes in an index.ts file.
// Must use chaining syntax, otherwise `hc` will lose types.
const api = new Hono().route("/todo", todo);

export default api;
