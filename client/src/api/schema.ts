import { z } from "zod";

export const eventSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters long"),
    date: z.string().min(1, "Date is required"),
    location: z.string().min(1, "Location is required").max(255, "Location must be at most 255 characters long"),
    description: z.string().max(2500, "Description must be at most 2500 characters long").optional().or(z.literal("")),
    categoryId: z.uuid("Please select a category"),
});

export type CreateEventType = z.infer<typeof eventSchema>;

export const createEventSchema = eventSchema.extend({
    date: z
        .string()
        .min(1, "Date is required")
        .refine((value) => new Date(value) > new Date(), "Date must be in the future"),
});

export const updateEventSchema = createEventSchema.partial();

export type UpdateEventType = z.infer<typeof updateEventSchema>;
