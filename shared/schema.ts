import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define schema for Dify API request
export const difyRequestSchema = z.object({
  input: z.string().min(1, "Input text cannot be empty").max(2000, "Input text cannot exceed 2000 characters"),
});

export type DifyRequest = z.infer<typeof difyRequestSchema>;

// Define schema for Dify API response
export const difyResponseSchema = z.object({
  output: z.string(),
});

export type DifyResponse = z.infer<typeof difyResponseSchema>;
