import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NewsService } from './news.services';
import { NewsItemQueryDto, NewsListDto, NewsListQueryDto } from './dto/newsDto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { NewsItem } from 'src/schemas/news.schema';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get news list' })
  @ApiOkResponse({ description: 'News list', type: NewsListDto, isArray: true })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  )
  getNewsList(@Query() query: NewsListQueryDto) {
    return this.newsService.getNewsList({ ...query });
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get news by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({ description: 'News list', type: NewsItem, isArray: true })
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  )
  getNewsById(@Param() { id }: NewsItemQueryDto) {
    return this.newsService.getNewsById(id);
  }
}
