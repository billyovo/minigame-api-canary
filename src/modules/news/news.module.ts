import { Module } from '@nestjs/common';
import { NewsService } from './news.services';

@Module({
    providers: [NewsService],
})
export class NewsModule {

}
