import { ServerOption } from 'src/shared/enums/ServerOption';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import * as events from '../../../shared/assets/events.json';

export class WinnerRecordFilterDto {
  @Transform(({ value }) => ServerOption[value.toUpperCase()])
  @IsEnum(ServerOption)
  @IsString()
  @ApiProperty({
    example: 'ALL',
    description: 'Server name',
    required: true,
    type: 'string',
    enum: Object.keys(ServerOption),
  })
  readonly server: ServerOption;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'bumper',
    description: 'Event ID',
    required: false,
    type: 'string',
    enum: [...events.map((event) => event.id), 'all'],
  })
  @IsEnum([...events.map((event) => event.id), 'all'])
  readonly event?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'billyovo',
    description: 'Player Full Name',
    required: false,
    type: 'string',
  })
  readonly name?: string;
}

class BaseQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @ApiProperty({
    example: '2023-12-31',
    description: 'Date in YYYY-MM-DD format',
    required: false,
    type: 'string',
    format: 'date',
  })
  readonly dateBefore?: string;

  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(100)
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 50,
    description: 'Number of records to return',
    required: false,
    type: 'number',
  })
  readonly limit?: number = 50;
}

export class RecordFilterQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    example: '63fa06c748fe037985ba5fc4',
    description:
      'ObjectId of the record to return items before this record. Used in pagination',
    required: false,
    type: 'string',
  })
  readonly before?: string;
}

export class CountFilterQueryDto extends BaseQueryDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
    type: 'number',
  })
  readonly page?: number = 1;
}
