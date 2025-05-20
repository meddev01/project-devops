import * as service from "./services";

describe("Todo Service", () => {
  let createdTodoId: number;

  it("should create a new todo", async () => {
    const result = await service.createTodo({ title: "Test todo" });
    expect(result).toHaveProperty("id");
    expect(result.title).toBe("Test todo");
    createdTodoId = result.id;
  });

  it("should get all todos", async () => {
    const todos = await service.getAllTodos();
    expect(Array.isArray(todos)).toBe(true);
    expect(todos.find((todo) => todo.id === createdTodoId)).toBeDefined();
  });

  it("should get todo by id", async () => {
    const todo = await service.getTodoById(createdTodoId);
    expect(todo).toHaveProperty("id");
    expect(todo.id).toBe(createdTodoId);
  });

  it("should update the todo", async () => {
    const updated = await service.updateTodo(createdTodoId, {
      title: "Updated title",
    });
    expect(updated).toHaveProperty("id");
    expect(updated.title).toBe("Updated title");
  });

  it("should delete the todo", async () => {
    const deleted = await service.deleteTodo(createdTodoId);
    expect(deleted).toHaveProperty("id");
    expect(deleted.id).toBe(createdTodoId);
  });
});
