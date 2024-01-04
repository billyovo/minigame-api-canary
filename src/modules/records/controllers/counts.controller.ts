import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CountsService } from '../services/counts.service';
import {
  CountFilterQueryDto,
  WinnerRecordFilterDto,
} from '../dtos/recordFilterDto';
import { EventsService } from '../../../providers/events.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CountDto } from '../dtos/countDto';

@ApiTags('count')
@Controller('count')
export class CountController {
  constructor(
    private readonly countsService: CountsService,
    private readonly eventsService: EventsService,
  ) {}

  @Get('/:server/:event?/:name?')
  @ApiOperation({ summary: 'Get win count' })
  @ApiOkResponse({ description: 'Win count', type: CountDto })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  )
  getCount(
    @Param() recordFilterDto: WinnerRecordFilterDto,
    @Query() query: CountFilterQueryDto,
  ) {
    const event = this.eventsService.getEventNameById(recordFilterDto.event);
    return this.countsService.count(
      { ...recordFilterDto, event },
      { ...query },
    );
  }
}
