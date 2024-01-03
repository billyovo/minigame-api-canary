import { BadRequestException, Controller, Get, Param, Query, UsePipes, ValidationPipe} from '@nestjs/common';
import { RecordsService } from '../services/records.service';
import { WinnerRecordFilterDto, RecordFilterQueryDto } from '../dtos/recordFilterDto';
import { EventsService } from '../../../providers/events.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('record')
@Controller('record')
export class RecordsController {
    constructor(
        private readonly recordsService: RecordsService,
        private readonly eventsService: EventsService,
      ) {}

    @Get("/:server/:event?/:name?")
    @ApiOperation({ summary: 'Get win record' })
    @ApiQuery({type: RecordFilterQueryDto})
    @UsePipes(new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
    }))
    getRecord(
        @Param() recordFilterDto : WinnerRecordFilterDto,
        @Query() query: RecordFilterQueryDto = {limit: 50}
    ) {
        const event = this.eventsService.getEventNameById(recordFilterDto.event);
        if(recordFilterDto.event && !event) throw new BadRequestException("Invalid event");
        return this.recordsService.find({ ...recordFilterDto, event }, { ...query });
    }
}

