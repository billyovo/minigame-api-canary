import { Module } from '@nestjs/common';
import { RecordsService } from './services/records.service';
import { CountsService } from './services/counts.service';
import { EventsService } from './services/events.service';

@Module({
    providers: [RecordsService, CountsService, EventsService],
})
export class RecordModule {

}
