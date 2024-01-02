import { BadRequestException, Controller, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { NewsService } from './news.services';
import { NewsItemQueryDto, NewsListQueryDto } from './dto/newsDto';

@Controller('news')
export class NewsController {
    constructor(
        private readonly newsService: NewsService,
      ) {}

    @Get("/")
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
