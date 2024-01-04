import { ApiProperty } from '@nestjs/swagger';
import * as events from '../shared/assets/events.json';

export class Event {
  @ApiProperty({
    example: '碰碰豬',
    description: 'Event Name',
    required: true,
    type: 'string',
  })
  readonly title: string;

  @ApiProperty({
    example: 'bumper',
    description: 'Event Id',
    required: true,
    type: 'string',
    enum: Object.keys(events),
  })
  readonly id: string;

  @ApiProperty({
    example:
      'FREQ=MONTHLY;BYDAY=2WE,4SA;TZID=Asia/Taipei;BYHOUR=21;BYMINUTE=0;BYSECOND=0',
    description: 'Event Recurrence Rule',
    required: true,
    type: 'string',
  })
  readonly rrule: string;

  @ApiProperty({
    example: '🐷',
    description: 'Event Emote',
    required: true,
    type: 'string',
  })
  readonly emote: string;
}

export class EventScheduleItem {
  @ApiProperty({
    example: '碰碰豬',
    description: 'Event Name',
    required: true,
    type: 'string',
  })
  readonly title: string;

  @ApiProperty({
    example: 'bumper',
    description: 'Event Id',
    required: true,
    type: 'string',
    enum: events.map((event) => event.id),
  })
  readonly id: string;

  @ApiProperty({
    example: '🐷',
    description: 'Event Emote',
    required: true,
    type: 'string',
  })
  readonly emote: string;

  @ApiProperty({
    example: '2021-08-14T13:00:00.000Z',
    description: 'Next Occurrence in ISO format',
    required: true,
    type: 'string',
    format: 'date-time',
  })
  readonly nextOccurrence: Date;
}

export class EventID {
  @ApiProperty({
    example: 'bumper',
    description: 'Event Id',
    required: true,
    type: 'string',
    enum: events.map((event) => event.id),
  })
  readonly id: string;
}
