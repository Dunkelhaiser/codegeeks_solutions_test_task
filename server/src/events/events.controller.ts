import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { CreateEventDto } from "./dto/createEvent.dto";
import { UpdateEventDto } from "./dto/updateEvent.dto";
import { GetEventDto } from "./dto/getEvent.dto";
import { GetEventsQueryDto } from "./dto/getEventsQuery.dto";
import { EventsService } from "./events.service";

@Controller("events")
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

    @Get()
    findAll(@Query() query: GetEventsQueryDto) {
        return this.eventsService.findAll(query);
    }

    @Get(':id')
    findOne(@Param() { id }: GetEventDto) {
        return this.eventsService.findOne(id);
    }

    @Put(":id")
    update(@Param() { id }: GetEventDto, @Body() updateEventDto: UpdateEventDto) {
        return this.eventsService.update(id, updateEventDto);
    }

    @Delete(':id')
    remove(@Param() { id }: GetEventDto) {
        return this.eventsService.remove(id);
    }
}
