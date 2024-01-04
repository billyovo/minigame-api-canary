import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NewsDocument = HydratedDocument<NewsItem>;

@Schema({ collection: 'news'})
export class NewsItem {

    @Prop({required: true})
    title: string;

    @Prop({required: true})
    content: string;

    @Prop({required: true})
    publish_date: string;

    @Prop({required: true})
    image: string[];
}

export const NewsItemSchema = SchemaFactory.createForClass(NewsItem);