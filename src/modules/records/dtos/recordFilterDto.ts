import { ServerOption } from "src/shared/enums/ServerOption";
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString, Matches, Max, Min, isNumber, } from "class-validator";
import { Transform } from "class-transformer";
export class WinnerRecordFilterDto {
  @Transform(({ value }) => ServerOption[value.toUpperCase()])
  @IsEnum(ServerOption)
  readonly server: ServerOption;

  @IsOptional()
  @IsString()
  readonly event?: string;

  @IsOptional()
  @IsString()
  readonly name?: string;
}


class BaseQueryDto {
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  readonly dateBefore?: string;

  @Transform(({ value }) => Number(value))
  @Min(1)
  @Max(100)
  @IsOptional()
  @IsNumber()
  readonly limit?: number = 50;
}

export class RecordFilterQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsMongoId()
  readonly before?: string;
}

export class CountFilterQueryDto extends BaseQueryDto {

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  @IsNumber()
  readonly page?: number = 1;
}