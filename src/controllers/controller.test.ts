import { Request, Response, NextFunction } from "express";
import * as controller from "./todo-controller";
import * as service from "../services/services";

jest.mock("../services/services");

describe("Todo Controller", () => {
  let next: NextFunction;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe("createTodo", () => {
    it("should create a todo and return 201", async () => {
      const mockRequest = {
        body: { title: "New todo" },
      } as unknown as Request<{}, {}, { title: string }>;

      const mockTodo = { id: 1, title: "New todo" };
      (service.createTodo as jest.Mock).mockResolvedValue(mockTodo);

      await controller.createTodo(mockRequest, mockResponse as Response, next);

      expect(service.createTodo).toHaveBeenCalledWith({ title: "New todo" });
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockTodo);
    });

    it("should return 400 for invalid title", async () => {
      const mockRequest = {
        body: { title: "no" },
      } as unknown as Request<{}, {}, { title: string }>;

      await controller.createTodo(mockRequest, mockResponse as Response, next);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid title",
      });
    });
  });

  describe("updateTodo", () => {
    it("should update a todo and return it", async () => {
      const mockRequest = {
        params: { id: "1" },
        body: { title: "Updated title" },
      } as unknown as Request<{ id: string }, {}, { title: string }>;

      const updatedTodo = { id: 1, title: "Updated title" };
      (service.updateTodo as jest.Mock).mockResolvedValue(updatedTodo);

      await controller.updateTodo(mockRequest, mockResponse as Response, next);

      expect(service.updateTodo).toHaveBeenCalledWith(1, {
        title: "Updated title",
      });
      expect(mockResponse.json).toHaveBeenCalledWith(updatedTodo);
    });

    it("should return 404 if todo not found", async () => {
      const mockRequest = {
        params: { id: "999" },
        body: { title: "Missing" },
      } as unknown as Request<{ id: string }, {}, { title: string }>;

      (service.updateTodo as jest.Mock).mockResolvedValue(null);

      await controller.updateTodo(mockRequest, mockResponse as Response, next);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: "Not found" });
    });

    it("should return 400 for invalid title", async () => {
      const mockRequest = {
        params: { id: "1" },
        body: { title: "hi" },
      } as unknown as Request<{ id: string }, {}, { title: string }>;

      await controller.updateTodo(mockRequest, mockResponse as Response, next);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Invalid title",
      });
    });
  });
});
