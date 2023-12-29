// utils/frontend.ts
import { hc } from "hono/client";
import type { AppType } from "../server";

const { api } = hc<AppType>("/", {
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
