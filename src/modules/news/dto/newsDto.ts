import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsMongoId, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class NewsItemBrief {
  @ApiProperty({
    example: '641e95a953143be5baf39888',
    description: 'ObjectId of the record',
    required: true,
    type: 'string',
  })
  readonly _id: string;

  @ApiProperty({
    example: '小遊戲網站正式啟用了！',
    description: 'Title of the news',
    required: true,
    type: 'string',
  })
  readonly title: string;

  @ApiProperty({
    example: '2023-03-25',
    description: 'Publish date of the news',
    required: true,
    type: 'string',
    format: 'date-time',
  })
  readonly publish_date: string;
}

export class NewsListDto {
  @ApiProperty({
    example: 3,
    description: 'Number of records returned',
    required: true,
    type: 'number',
  })
  readonly total: number;

  @ApiProperty({
    example: [
      {
        _id: '641e95a953143be5baf39888',
        title: '小遊戲網站正式啟用了！',
        publish_date: '2023-03-25',
      },
    ],
    description: 'News list',
    required: true,
    type: NewsItemBrief,
    isArray: true,
  })
  readonly rows: NewsItemBrief[];
}

export class NewsListQueryDto {
  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(100)
  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 15,
    default: 15,
    description: 'Number of records to return',
    required: false,
    type: 'number',
  })
  readonly limit?: number = 15;

  @IsOptional()
  @ApiProperty({
    example: '3',
    description: 'page number',
    required: false,
    type: 'number',
  })
  readonly page?: number = 1;
}

export class NewsItemQueryDto {
  @IsMongoId()
  @ApiProperty({
    example: '641e95a953143be5baf39888',
    description: 'ObjectId of the record to return',
    required: true,
    type: 'string',
  })
  readonly id: string;
}
