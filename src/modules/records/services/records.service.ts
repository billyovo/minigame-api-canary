import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WinnerRecordFilterDto, RecordFilterQueryDto } from '../dtos/recordFilterDto';
import { RecordDto } from '../dtos/recordDto';
import { OptionAll } from 'src/shared/constant/urlOption';
import { WinnerRecord } from 'src/schemas/winner.schema';

@Injectable()
export class RecordsService {
    constructor(@InjectModel('WinnerRecord') private winnerRecordModel: Model<WinnerRecord>) {}

    async find(findRecordDto: WinnerRecordFilterDto, findRecordQueryDto: RecordFilterQueryDto) : Promise<RecordDto>{
        const { server, event, name } = findRecordDto;
        const { before, dateBefore, limit } = findRecordQueryDto;

        let query = {};
        if(server && server !== OptionAll) query['server'] = server;
        if(event && event !== OptionAll) query['event'] = event;
        if(name) query['name'] = name;
        if(before) query['_id'] = { $lt: before };
        if(dateBefore) query['date'] = { $lt: dateBefore };

        const records = await this.winnerRecordModel.find(query).sort({date: -1}).limit(limit);
        const total = await this.winnerRecordModel.countDocuments(query);

        return { total, rows: records };
    }
}
