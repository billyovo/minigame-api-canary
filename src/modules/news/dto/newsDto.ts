import { Transform } from "class-transformer"
import { IsMongoId, IsNumber, IsOptional, Max, Min } from "class-validator"
import { ObjectId, Types } from "mongoose";

export class NewsItemBrief {
    readonly _id: string;
    readonly title: string;
    readonly publish_date: string;
}

export class NewsListDto {
    readonly total: number;
    readonly rows: NewsItemBrief[];
}

export class NewsListQueryDto {
    @Transform(({ value }) => Number(value))
    @Min(1)
    @Max(100)
    @IsOptional()
    @IsNumber()
    readonly limit?: number = 15;

    @IsOptional()
    @IsMongoId()
    readonly before?: string
}

export class NewsItemQueryDto {
    @IsMongoId()
    readonly id: string;
}