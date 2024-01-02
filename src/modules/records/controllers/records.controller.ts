import { BadRequestException, Controller, Get, Param, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { RecordsService } from '../services/records.service';
import { WinnerRecordFilterDto, RecordFilterQueryDto } from '../dtos/recordFilterDto';
import { EventsService } from '../../../providers/events.service';

@Controller('records')
export class RecordsController {
    constructor(
        private readonly recordsService: RecordsService,
        private readonly eventsService: EventsService,
      ) {}

    @Get("/:server/:event?/:name?")
    @UsePipes(new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
    }))
    getRecord(
        @Param() recordFilterDto : WinnerRecordFilterDto,
        @Query() query: RecordFilterQueryDto = {limit: 50}
    ) {
        const event = this.eventsService.getEventNameById(recordFilterDto.event);
        if(!event) throw new BadRequestException("Invalid event");
        return this.recordsService.find({ ...recordFilterDto, event }, { ...query });
    }
}

