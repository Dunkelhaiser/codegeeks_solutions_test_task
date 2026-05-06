import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

export const eventSchema = z.object({
    title: z.string().min(1, "Title is required").max(255, "Title must be at most 255 characters long"),
    date: z.string().transform((value) => new Date(value)).refine((value) => value > new Date(), "Date must be in the future"),
    location: z.string().min(1, "Location is required").max(255, "Location must be at most 255 characters long"),
    description: z.string().max(2500, "Description must be at most 2500 characters long").optional(),
    categoryId: z.uuid("Select category"),
})

export class CreateEventDto extends createZodDto(eventSchema) {}
