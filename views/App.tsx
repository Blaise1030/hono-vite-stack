// views/index.tsx
import { useEffect, useState } from "react";
import { api } from "../utils/frontend";
import Todo from "../models/Todo";

export default function IndexPage() {
  const [todoList, setTodoList] = useState([] as Todo[]);

  useEffect(() => {
    (async () => {
      const res = await api.todo.list.$get();
      const result = await res.json();

      if (result.success) {
        setTodoList(result.data);
      } else {
        setTodoList([]);
      }
    })();
  }, []);

  return (
    <>
      {todoList.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
          <p>{todo.description}</p>
        </div>
      ))}
    </>
  );
}
