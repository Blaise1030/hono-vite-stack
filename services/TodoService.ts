import Todo from "../models/Todo";

export default class TodoService {
  private idCounter = 0;
  private store: (Todo | null)[] = [];

  async list() {
    const list = this.store.filter((item) => item !== null) as Todo[];
    return await Promise.resolve(list); // simulate async, service method should always be async
  }

  async add(item: Omit<Todo, "id">) {
    const id = ++this.idCounter;
    const todo = { id, ...item };
    this.store.push(todo);
    return await Promise.resolve(todo);
  }

  async delete(query: Pick<Todo, "id">) {
    const index = this.store.findIndex((item) => item?.id === query.id);

    if (index === -1) {
      return false;
    } else {
      this.store[index] = null;
      return true;
    }
  }

  async update(query: Pick<Todo, "id">, data: Omit<Todo, "id">) {
    const todo = this.store.find((item) => item?.id === query.id);

    if (todo) {
      return Object.assign(todo, data);
    } else {
      throw new Error("todo not found");
    }
  }
}
