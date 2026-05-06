import { createZodDto } from 'nestjs-zod';
import { eventSchema } from './createEvent.dto';

export class UpdateEventDto extends createZodDto(eventSchema.partial()) {}
