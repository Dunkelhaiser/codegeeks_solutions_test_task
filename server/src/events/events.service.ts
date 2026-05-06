import { Injectable,  } from "@nestjs/common";
import { db } from "../db";
import { eventsTable } from "../db/schema";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { eq } from "drizzle-orm";

@Injectable()
export class EventsService {
    async create(createEventDto: CreateEventDto) {
        const [event] = await db.insert(eventsTable).values(createEventDto).returning();
        return event;
    }

    findAll() {
        return "This action returns all events";
    }

    async findOne(id: string) {
        const event = await db.select().from(eventsTable).where(eq(eventsTable.id, id));

        return event.length > 0 ? event[0] : null;
    }

    update(id: string, updateEventDto: UpdateEventDto) {
        return `This action updates a #${id} event`;
    }

    remove(id: string) {
        return `This action removes a #${id} event`;
    }
}
