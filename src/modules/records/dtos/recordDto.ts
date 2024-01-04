import { ApiProperty } from '@nestjs/swagger';
import { WinnerRecord } from 'src/schemas/winner.schema';

export class RecordDto {
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
        UUID: '13ef7548270b4a67a58bfe880701b11e',
        name: 'billyovo',
        server: '空島',
        event: '碰碰豬',
        date: '2023-02-25',
      },
      {
        UUID: '6ab4317889fd490597f60f67d9d76fd9',
        name: 'MHF_Alex',
        server: '生存',
        event: '忘掉那 無形鎖',
        date: '2022-08-25',
      },
      {
        UUID: 'c06f89064c8a49119c29ea1dbd1aab82',
        name: 'MHF_Steve',
        server: '空島',
        event: '繽紛飛天蛇',
        date: '2022-03-14',
      },
    ],
    description: 'Records list',
    required: true,
    type: WinnerRecord,
    isArray: true,
  })
  readonly rows: WinnerRecord[];
}
