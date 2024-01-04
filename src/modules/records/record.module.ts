import { Module } from '@nestjs/common';
import { RecordsService } from './services/records.service';
import { CountsService } from './services/counts.service';
import { EventsService } from '../../providers/events.service';

@Module({
    providers: [RecordsService, CountsService, EventsService],
})
export class RecordModule {

}
