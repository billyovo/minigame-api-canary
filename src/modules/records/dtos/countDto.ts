import { ApiProperty } from '@nestjs/swagger';

export class CountRecord {
  @ApiProperty({
    example: 'billyovo',
    description: 'Player name',
    required: true,
    type: 'string',
  })
  readonly name: string;

  @ApiProperty({
    example: '13ef7548270b4a67a58bfe880701b11e',
    description: 'Player UUID',
    required: true,
    type: 'string',
  })
  readonly UUID: string;

  @ApiProperty({
    example: '1',
    description: 'Player total number of win according to filter',
    required: true,
    type: 'string',
  })
  readonly total: number;
}

export class CountDto {
  @ApiProperty({
    example: 3,
    description: 'Number of records returned',
    required: true,
    type: 'number',
  })
  readonly total: number;

  @ApiProperty({
    example: [
      { name: 'billyovo', UUID: '13ef7548270b4a67a58bfe880701b11e', total: 1 },
      { name: 'MHF_Alex', UUID: '6ab4317889fd490597f60f67d9d76fd9', total: 18 },
      { name: 'MHF_Steve', UUID: 'c06f89064c8a49119c29ea1dbd1aab82', total: 5 },
    ],
    description: 'Records list',
    required: true,
    type: CountRecord,
    isArray: true,
  })
  readonly rows: CountRecord[];
}
