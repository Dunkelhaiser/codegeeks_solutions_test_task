import { timestamp, index, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 255 }).notNull(),
});

export const eventsTable = pgTable(
    "events",
    {
        id: uuid().primaryKey().defaultRandom(),
        title: varchar({ length: 255 }).notNull(),
        date: timestamp().notNull(),
        location: varchar({ length: 255 }).notNull(),
        description: text(),
        categoryId: uuid()
            .notNull()
            .references(() => categoriesTable.id),
    },
    (table) => [
        index("event_title_idx").on(table.title),
        index("event_category_idx").on(table.categoryId),
        index("event_location_idx").on(table.location),
    ]
);
