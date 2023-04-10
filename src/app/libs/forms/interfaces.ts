/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IFormInputField {
    label: string;
    value: string;
    onChange: () => void;
    onBlur: (name, label, value, validators) => void;
    name: string;
    type: string;
    errorValidation?: any[];
    validators?: any;
}

export interface IFormSelectField {
    options: Array<{ [key: string]: any }>;
    textProp: string;
    valueProp: string;
    onChange: () => void;
    label: string;
    name: string;
    type: string;
    value: any;
}
