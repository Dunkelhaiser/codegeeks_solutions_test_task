import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

    @Get()
    findAll() {
        return this.eventsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(Number(id));
    }

    @Put(":id")
    update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
        return this.eventsService.update(Number(id), updateEventDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.eventsService.remove(Number(id));
    }
}
