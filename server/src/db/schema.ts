import { date, integer, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const eventsTable = pgTable("events", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    date: date().notNull(),
    location: varchar({ length: 255 }).notNull(),
    category: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
});
