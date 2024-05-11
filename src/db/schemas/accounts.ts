import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

const accounts = pgTable("accounts", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	userId: text("user_id").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAccountSchema = createInsertSchema(accounts);

export default accounts;

