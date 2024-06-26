import { db } from "@/db";
import { accounts } from "@/db/schemas";
import { insertAccountSchema } from "@/db/schemas/accounts";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { StatusCodes } from "http-status-codes";

const app = new Hono()
	.get("/", clerkMiddleware(), async (c) => {
		const auth = getAuth(c);

		if (!auth?.userId) {
			return c.json({ error: "Unauthorised" }, StatusCodes.UNAUTHORIZED);
		}

		const data = await db
			.select({
				id: accounts.id,
				name: accounts.name,
			})
			.from(accounts)
			.where(eq(accounts.userId, auth.userId));

		return c.json({ data });
	})
	.post(
		"/",
		clerkMiddleware(),
		zValidator(
			"json",
			insertAccountSchema.pick({
				name: true,
			})
		),
		async (c) => {
			const auth = getAuth(c);
			const values = c.req.valid("json");

			if (!auth?.userId) {
				return c.json({ error: "Unauthorised" }, StatusCodes.UNAUTHORIZED);
			}

			const [data] = await db
				.insert(accounts)
				.values({
					id: createId(),
					userId: auth.userId,
					...values,
				})
				.returning();

			c.json({ data });
		}
	);

export default app;

