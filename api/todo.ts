// api/todo.ts
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { useService } from "../utils/backend";
import TodoService from "../services/TodoService";
import Todo from "../models/Todo";

const todoService = useService(TodoService);

// Must use chaining syntax, otherwise `hc` will lose types.
const todo = new Hono()
  .get("/list", async (c) => {
    const list = await todoService.list();
    return c.json({
      success: true,
      data: list,
    });
  })

  .post("/", zValidator("json", Todo.omit({ id: true })), async (c) => {
    const data = c.req.valid("json");
    const todo = await todoService.add(data);
    return c.json({
      success: true,
      data: todo,
    });
  })

  .patch("/:id", zValidator("json", Todo.omit({ id: true })), async (c) => {
    const id = Number(c.req.param("id"));
    const data = c.req.valid("json");
    const todo = await todoService.update({ id }, data);
    return c.json({
      success: true,
      data: todo,
    });
  })

  .delete("/:id", async (c) => {
    const id = Number(c.req.param("id"));
    const ok = await todoService.delete({ id });
    return c.json({
      success: ok,
      data: null,
    });
  });

export default todo;
