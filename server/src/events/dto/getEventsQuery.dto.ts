import { createZodDto } from "nestjs-zod"
import { z } from "zod"

const getEventsQuerySchema = z.object({
    sortBy: z.enum(["title", "date"]).default("date"),
    order: z.enum(["asc", "desc"]).default("desc"),
    category: z.uuid().optional(),
})

export class GetEventsQueryDto extends createZodDto(getEventsQuerySchema) {}
