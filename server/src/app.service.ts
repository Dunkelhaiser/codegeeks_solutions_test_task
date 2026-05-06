import { Injectable } from "@nestjs/common";
import { db } from "./db";
import { eventsTable } from "./db/schema";

@Injectable()
export class AppService {
    async getHello() {
        return await db.select().from(eventsTable);
    }
}
