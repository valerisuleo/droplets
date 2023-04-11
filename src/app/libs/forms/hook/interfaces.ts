export interface IFormCtrl {
    type: string;
    name: string;
    label: string;
    validators: IValidator[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: any[];
    id: string;
}

export interface IValidator {
    name: string;
    options: IValidatorOption[];
}

export interface IValidatorOption {
    key: string;
    value: string;
}
