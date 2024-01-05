export declare class RFCDate {
    private date;
    constructor(date: Date | {
        date: string;
    } | string | undefined);
    getDate(): Date;
    toJSON(): string;
    toString(): string;
}
