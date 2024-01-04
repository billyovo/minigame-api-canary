import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type WinnerRecordDocument = HydratedDocument<WinnerRecord>;

@Schema({ collection: 'winner' })
export class WinnerRecord {
  @Prop({ required: true })
  @ApiProperty({
    example: '13ef7548270b4a67a58bfe880701b11e',
    description: 'Player UUID',
    required: true,
    type: 'string',
  })
  UUID: string;

  @Prop({ required: true })
  @ApiProperty({
    example: 'billyovo',
    description: 'Player name',
    required: true,
    type: 'string',
  })
  name: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '空島',
    description: 'Server name',
    required: true,
    type: 'string',
  })
  server: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '碰碰豬',
    description: 'Event name',
    required: true,
    type: 'string',
  })
  event: string;

  @Prop({ required: true })
  @ApiProperty({
    example: '2023-02-25',
    description: 'Date of the win',
    required: true,
    type: 'string',
    format: 'date-time',
  })
  date: string;
}

export const WinnerRecordSchema = SchemaFactory.createForClass(WinnerRecord);
