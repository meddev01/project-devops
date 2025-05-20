import pool from "../db";

// Type d'entrée pour les todos
export interface TodoInput {
  title: string;
}

// Récupérer tous les todos
export const getAllTodos = async () => {
  const result = await pool.query("SELECT * FROM todos ORDER BY id");
  return result.rows;
};

// Récupérer un todo par ID
export const getTodoById = async (id: number) => {
  const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
  return result.rows[0];
};

// Créer un nouveau todo
export const createTodo = async ({ title }: TodoInput) => {
  const result = await pool.query(
    "INSERT INTO todos(title) VALUES($1) RETURNING *",
    [title.trim()]
  );
  return result.rows[0];
};

// Mettre à jour un todo
export const updateTodo = async (id: number, { title }: TodoInput) => {
  const result = await pool.query(
    "UPDATE todos SET title = $1 WHERE id = $2 RETURNING *",
    [title.trim(), id]
  );
  return result.rows[0];
};

// Supprimer un todo
export const deleteTodo = async (id: number) => {
  const result = await pool.query(
    "DELETE FROM todos WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
