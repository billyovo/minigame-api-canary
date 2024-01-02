import { BadRequestException, Controller, Get, Param, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { CountsService } from "../services/counts.service";
import { CountFilterQueryDto, WinnerRecordFilterDto } from "../dtos/recordFilterDto";
import { EventsService } from '../../../providers/events.service';

@Controller('count')
export class CountController {
    constructor(
        private readonly countsService: CountsService,
        private readonly eventsService: EventsService,
      ) {}

    @Get("/:server/:event?/:name?")
    @UsePipes(new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
    }))
    getCount(
        @Param() recordFilterDto : WinnerRecordFilterDto,
        @Query() query: CountFilterQueryDto
    ) {
        const event = this.eventsService.getEventNameById(recordFilterDto.event);
        if(!event) throw new BadRequestException("Invalid event");
        return this.countsService.count({ ...recordFilterDto, event }, { ...query });
    }
}