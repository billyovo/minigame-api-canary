import { WinnerRecord } from "src/schemas/winner.schema";

export class RecordDto {
    readonly total: number;
    readonly rows:  WinnerRecord[];
}