export interface Note {
    id: number;
    title: string;
    desc: string;
    timeStamp: Date;
    checked?: boolean;
}