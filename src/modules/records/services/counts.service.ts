import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { WinnerRecord } from 'src/schemas/winner.schema';
import {
  CountFilterQueryDto,
  WinnerRecordFilterDto,
} from '../dtos/recordFilterDto';
import { CountDto } from '../dtos/countDto';
import { OptionAll } from 'src/shared/constant/urlOption';

@Injectable()
export class CountsService {
  constructor(
    @InjectModel('WinnerRecord') private winnerRecordModel: Model<WinnerRecord>,
  ) {}

  async count(
    countRecordDto: WinnerRecordFilterDto,
    countRecordQueryDto: CountFilterQueryDto,
  ): Promise<CountDto> {
    const { server, event, name } = countRecordDto;
    const { dateBefore, limit, page } = countRecordQueryDto;

    const filter = {};
    if (server && server !== OptionAll) filter['server'] = server;
    if (event && event !== OptionAll) filter['event'] = event;
    if (name) filter['name'] = name;
    if (dateBefore) filter['date'] = { $lt: dateBefore };

    const query: PipelineStage[] = [
      { $match: filter },
      { $group: { _id: { name: '$name', UUID: '$UUID' }, total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      {
        $facet: {
          total: [{ $count: 'count' }],
          rows: [
            { $skip: (page - 1) * limit },
            { $limit: limit },
            {
              $project: {
                _id: 0,
                name: '$_id.name',
                UUID: '$_id.UUID',
                total: '$total',
              },
            },
          ],
        },
      },
      { $addFields: { total: { $arrayElemAt: ['$total.count', 0] } } },
    ];
    const total = await this.winnerRecordModel.aggregate(query).exec();

    return { total: total[0].total ?? 0, rows: total[0].rows };
  }
}
