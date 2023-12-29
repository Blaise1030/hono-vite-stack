import { handle } from "hono/aws-lambda";
import app from "./server";

const handler = handle(app);

export default handler;
