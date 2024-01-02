import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecordsController } from './modules/records/controllers/records.controller';
import { ConfigModule } from '@nestjs/config';
import { RecordsService } from './modules/records/services/records.service';
import { CountsService } from './modules/records/services/counts.service';
import { WinnerRecord, WinnerRecordSchema } from './schemas/winner.schema';
import { CountController } from './modules/records/controllers/counts.controller';
import { NewsItem, NewsItemSchema } from './schemas/news.schema';
import { NewsController } from './modules/news/news.controller';
import { NewsService } from './modules/news/news.services';
import { EventsService } from './modules/records/services/events.service';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    MongooseModule.forFeature([{ name: WinnerRecord.name, schema: WinnerRecordSchema }, { name: NewsItem.name, schema: NewsItemSchema}])
  ],
  controllers: [RecordsController, CountController, NewsController],
  providers: [RecordsService, CountsService, NewsService, EventsService],
})
export class AppModule {}
