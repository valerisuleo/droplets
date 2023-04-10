/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IListGroup {
    collection: any[];
    propKey: string;
    propText: string;
    onEmitEvent: (item: any) => void;
}


export interface IListItemStyle {
    classActive: boolean;
}