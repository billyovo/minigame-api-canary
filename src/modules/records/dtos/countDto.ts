export class CountRecord {
    readonly _id: string;
    readonly UUID: string;
    readonly total: number;
}

export class CountDto {
    readonly total: number;
    readonly rows: CountRecord[];
}