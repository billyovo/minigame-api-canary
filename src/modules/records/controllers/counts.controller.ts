import { BadRequestException, Controller, Get, Param, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CountsService } from "../services/counts.service";
import { CountFilterQueryDto, WinnerRecordFilterDto } from "../dtos/recordFilterDto";
import { EventsService } from '../../../providers/events.service';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('count')
@Controller('count')
export class CountController {
    constructor(
        private readonly countsService: CountsService,
        private readonly eventsService: EventsService,
      ) {}

    @Get("/:server/:event?/:name?")
    @ApiOperation({ summary: 'Get win count' })
    @UsePipes(new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
    }))
    getCount(
        @Param() recordFilterDto : WinnerRecordFilterDto,
        @Query() query: CountFilterQueryDto
    ) {
        const event = this.eventsService.getEventNameById(recordFilterDto.event);
        if(recordFilterDto.event && !event) throw new BadRequestException("Invalid event");
        return this.countsService.count({ ...recordFilterDto, event }, { ...query });
    }
}