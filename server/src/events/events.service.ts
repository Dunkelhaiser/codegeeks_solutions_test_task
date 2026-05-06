import { Injectable } from "@nestjs/common";
import { db } from "../db";
import { eventsTable } from "../db/schema";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";

@Injectable()
export class EventsService {
    async create(createEventDto: CreateEventDto) {
        const [event] = await db.insert(eventsTable).values(createEventDto).returning();
        return event;
    }

    findAll() {
        return "This action returns all events";
    }

    findOne(id: number) {
        return `This action returns a #${id} event`;
    }

    update(id: number, updateEventDto: UpdateEventDto) {
        return `This action updates a #${id} event`;
    }

    remove(id: number) {
        return `This action removes a #${id} event`;
    }
}
