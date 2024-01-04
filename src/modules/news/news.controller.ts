import { BadRequestException, Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewsService } from './news.services';
import { NewsItemQueryDto, NewsListQueryDto } from './dto/newsDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('news')
@Controller('news')
export class NewsController {
    constructor(
        private readonly newsService: NewsService,
      ) {}

    @Get("/")
    @ApiOperation({ summary: 'Get news list' })
    @UsePipes(new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
    }))
    getCount(
        @Query() query: NewsListQueryDto
    ) {
        return this.newsService.getNewsList({ ...query });
    }

    @Get("/:id")
    @ApiOperation({ summary: 'Get news by id' })
    @UsePipes(new ValidationPipe({
        transform: true,
        exceptionFactory: (errors) => new BadRequestException(errors),
    }))
    getNewsById(
        @Param() { id } : NewsItemQueryDto
    ) {
        return this.newsService.getNewsById(id);
    }

}
