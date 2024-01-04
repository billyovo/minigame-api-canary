import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type NewsDocument = HydratedDocument<NewsItem>;

@Schema({ collection: 'news' })
export class NewsItem {
  @Prop({ required: true })
  @ApiProperty({
    example: '小遊戲網站正式啟用了！',
    description: 'Title of the news',
    required: true,
    type: 'string',
  })
  title: string;

  @Prop({ required: true })
  @ApiProperty({
    example:
      '<p>經過長時間的開發和砍掉重練，小遊戲網站終於完成了</p><p>大家可以在這裡找到各個小遊戲的介紹\n也可以查看小遊戲時間表和優勝紀錄</p><p>日後小遊戲的公告和部分通知亦會在網站更新</p>',
    description: 'Content of the news',
    required: true,
    type: 'string',
  })
  content: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '2023-03-25',
    description: 'Publish date of the news',
    required: true,
    type: 'string',
    format: 'date-time',
  })
  publish_date: string;

  @Prop({ required: true })
  @ApiProperty({
    example: ['https://i.imgur.com/1.jpg', 'https://i.imgur.com/2.jpg'],
    description: 'Image of the news',
    required: true,
    type: 'string',
    isArray: true,
  })
  image: string[];
}

export const NewsItemSchema = SchemaFactory.createForClass(NewsItem);
