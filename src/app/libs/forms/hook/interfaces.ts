export interface IFormCtrl {
    type: string;
    name: string;
    label: string;
    validators: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any[];
    id: string;
}
