import { Injectable, NotFoundException,  } from "@nestjs/common";
import { db } from "../db";
import { eventsTable } from "../db/schema";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { eq, asc, desc } from "drizzle-orm";
import { GetEventsQueryDto } from "./dto/getEventsQuery.dto";

@Injectable()
export class EventsService {
    async create(createEventDto: CreateEventDto) {
        const [event] = await db.insert(eventsTable).values(createEventDto).returning();
        return event;
    }

    async findAll(query: GetEventsQueryDto) {
        const order = query.order === 'desc' ? desc : asc;
        const events = await db.select().from(eventsTable).orderBy(order(eventsTable[query.sortBy]));
        
        return events;
    }

    async findOne(id: string) {
        const event = await db.select().from(eventsTable).where(eq(eventsTable.id, id));

        if(event.length === 0) {
            throw new NotFoundException(`Event with id ${id} not found`);
        }

        return event[0];
    }

    async update(id: string, updateEventDto: UpdateEventDto) {
        await this.findOne(id);
        
        const [updatedEvent] = await db.update(eventsTable).set(updateEventDto).where(eq(eventsTable.id, id)).returning();
        
        return updatedEvent;
    }

    async remove(id: string) {
        const [event] = await db.delete(eventsTable).where(eq(eventsTable.id, id)).returning();
        
        return event;
    }
}
