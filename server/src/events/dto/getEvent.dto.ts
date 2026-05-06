import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const getEventSchema = z.object({
    id: z.uuid("Invalid event ID format"),
})

export class GetEventDto extends createZodDto(getEventSchema) {}
