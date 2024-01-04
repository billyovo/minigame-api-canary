import { Module } from '@nestjs/common';
import { EventsService } from 'src/providers/events.service';

@Module({
  providers: [EventsService],
})
export class EventsModule {}
