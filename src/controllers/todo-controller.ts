import { Request, Response, NextFunction } from "express";
import * as todoService from "../services/services";

export const getTodos = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const getTodo = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const todo = await todoService.getTodoById(Number(req.params.id));
    if (!todo) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export const createTodo = async (
  req: Request<{}, {}, { title: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.body;

    if (typeof title !== "string" || title.trim().length < 3) {
      res.status(400).json({ error: "Invalid title" });
      return;
    }

    const newTodo = await todoService.createTodo({ title });
    res.status(201).json(newTodo);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (
  req: Request<{ id: string }, {}, { title: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title } = req.body;

    if (typeof title !== "string" || title.trim().length < 3) {
      res.status(400).json({ error: "Invalid title" });
      return;
    }

    const updated = await todoService.updateTodo(Number(req.params.id), {
      title,
    });
    if (!updated) {
      res.status(404).json({ error: "Not found" });
      return;
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deleted = await todoService.deleteTodo(Number(req.params.id));
    if (!deleted) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};
