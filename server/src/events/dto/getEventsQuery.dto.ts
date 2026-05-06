import { createZodDto } from "nestjs-zod"
import { z } from "zod"

const getEventsQuerySchema = z.object({
    sortBy: z.enum(["title", "date"]).default("date"),
    order: z.enum(["asc", "desc"]).default("desc"),
    category: z.uuid().optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
})

export class GetEventsQueryDto extends createZodDto(getEventsQuerySchema) {}
