import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WinnerRecordDocument = HydratedDocument<WinnerRecord>;

@Schema({ collection: 'winner'})
export class WinnerRecord {

    @Prop({required: true})
    UUID: string;

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    server: string;

    @Prop({required: true})
    event: string;

    @Prop({required: true})
    date: string;
}

export const WinnerRecordSchema = SchemaFactory.createForClass(WinnerRecord);