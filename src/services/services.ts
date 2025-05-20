import pool from "../db";

export const getAllTodos = async () => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id");
  return result.rows;
};

export const getTodoById = async (id: number) => {
  const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
  return result.rows[0];
};

export const createTodo = async (title: string) => {
  const result = await pool.query(
    "INSERT INTO todos(title) VALUES($1) RETURNING *",
    [title.trim()]
  );
  return result.rows[0];
};

export const updateTodo = async (id: number, title: string) => {
  const result = await pool.query(
    "UPDATE todos SET title = $1 WHERE id = $2 RETURNING *",
    [title.trim(), id]
  );
  return result.rows[0];
};

export const deleteTodo = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
