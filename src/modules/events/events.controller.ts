import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Event, EventID, EventScheduleItem } from 'src/providers/EventDto';
import { EventsService } from 'src/providers/events.service';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get('/')
  @ApiOkResponse({
    type: Event,
    isArray: true,
    description: 'Get all events information',
  })
  getEvents() {
    return this.eventsService.getEventsData();
  }

  @Get('/schedule')
  @ApiOkResponse({
    type: EventScheduleItem,
    isArray: true,
    description: 'Get all events schedule',
  })
  getEventSchedule() {
    return this.eventsService.getEventSchedule();
  }

  @Get('/schedule/:id')
  @ApiOkResponse({
    type: EventScheduleItem,
    isArray: false,
    description: 'Get event schedule by event id',
  })
  getEventScheduleByEventId(@Param() { id }: EventID) {
    return this.eventsService.getEventScheduleByEventId(id);
  }
}
