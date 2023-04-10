export interface IBtn {
    label: string;
    classes: IClasses;
    type: 'button' | 'submit' | 'reset';
    onEmitEvent: () => void;
}

interface IClasses {
    custom?: string;
    size: 'lg' | 'sm' | 'md';
    contextual:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'danger'
        | 'close';
}
