import { Injectable, NotFoundException,  } from "@nestjs/common";
import { db } from "../db";
import { categoriesTable, eventsTable } from "../db/schema";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { eq, asc, desc, count, like, or, ne, and } from "drizzle-orm";
import { GetEventsQueryDto } from "./dto/getEventsQuery.dto";
 
function extractCity(location: string) {
    const parts = location.split(",");
    return parts[parts.length - 1].trim();
}

@Injectable()
export class EventsService {
    async create(createEventDto: CreateEventDto) {
        const [event] = await db.insert(eventsTable).values(createEventDto).returning();
        return event;
    }

    async findAll(query: GetEventsQueryDto) {
        const order = query.order === 'desc' ? desc : asc;
        const offset = (query.page - 1) * query.limit;
        
        let q = db.select({
            id: eventsTable.id,
            title: eventsTable.title,
            date: eventsTable.date,
            location: eventsTable.location,
            description: eventsTable.description,
            category: categoriesTable.name,
        }).from(eventsTable).innerJoin(categoriesTable, eq(eventsTable.categoryId, categoriesTable.id)).$dynamic();
        
        let countQ = db.select({ value: count() }).from(eventsTable).$dynamic();

        if (query.category) {
            q = q.where(eq(eventsTable.categoryId, query.category));
            countQ = countQ.where(eq(eventsTable.categoryId, query.category));
        }
        
        const [events, totalResult] = await Promise.all([
            q.orderBy(order(eventsTable[query.sortBy])).limit(query.limit).offset(offset),
            countQ
        ]);
        
        return {
            events,
            total: totalResult[0].value,
        };
    }

    async findAllCategories() {
        const categories = await db.select({
            id: categoriesTable.id,
            name: categoriesTable.name,
        }).from(categoriesTable);
        
        return categories;
    }

    async findOne(id: string) {
        const eventRows = await db.select({
            id: eventsTable.id,
            title: eventsTable.title,
            date: eventsTable.date,
            location: eventsTable.location,
            description: eventsTable.description,
            categoryId: eventsTable.categoryId,
            category: categoriesTable.name,
        }).from(eventsTable).innerJoin(categoriesTable, eq(eventsTable.categoryId, categoriesTable.id)).where(eq(eventsTable.id, id));

        if(eventRows.length === 0) {
            throw new NotFoundException(`Event with id ${id} not found`);
        }

        const event = eventRows[0];
        const similarEvents = await this.findSimilarEvents(event);
 
        return { ...event, similarEvents };

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

    private async findSimilarEvents(event: {
        id: string;
        categoryId: string;
        location: string;
    }) {
        const SIMILAR_EVENTS_LIMIT = 5;
        const SCORE_SAME_CATEGORY = 2;
        const SCORE_SAME_CITY = 1;

        const city = extractCity(event.location);
 
        const candidates = await db
            .select({
                id: eventsTable.id,
                title: eventsTable.title,
                date: eventsTable.date,
                location: eventsTable.location,
                description: eventsTable.description,
                categoryId: eventsTable.categoryId,
                category: categoriesTable.name,
            })
            .from(eventsTable)
            .innerJoin(
                categoriesTable,
                eq(eventsTable.categoryId, categoriesTable.id)
            )
            .where(
                and(
                    ne(eventsTable.id, event.id),
                    or(
                        eq(eventsTable.categoryId, event.categoryId),
                        like(eventsTable.location, `%${city}%`)
                    )
                )
            );
 
        return candidates
            .map((candidate) => {
                const score =
                    (candidate.categoryId === event.categoryId
                        ? SCORE_SAME_CATEGORY
                        : 0) +
                    (extractCity(candidate.location) === city
                        ? SCORE_SAME_CITY
                        : 0);
 
                return { ...candidate, score };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, SIMILAR_EVENTS_LIMIT)
            .map(({ score: _score, categoryId: _catId, ...rest }) => rest);
    }

}
