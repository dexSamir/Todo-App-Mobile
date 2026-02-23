import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("desc").collect();
    return todos;
  },
});

export const addTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });

    return todoId;
  },
});

export const ToggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new ConvexError("Todo is not found!");

    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

export const DeleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const UpdateTodo = mutation({
  args: {
    id: v.id("todos"),
    newText: v.string(),
  },
  handler: async (ctx, args) => {
    ctx.db.patch(args.id, {
      text: args.newText,
    });
  },
});

export const ClearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();
    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deleteCount: todos.length };
  },
});
