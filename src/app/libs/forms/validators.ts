/* eslint-disable @typescript-eslint/no-unused-vars */

const requiredValidator = (
    value: string | undefined,
    fieldName: string
): string | undefined => {
    if (!value || value.trim() === '') {
        return `The ${fieldName} field is required`;
    }
};

// Min length validator
const minLengthValidator = (
    value: string | undefined,
    fieldName: string,
    minLength: number
): string | undefined => {
    if (value && value.trim().length < minLength) {
        return `The ${fieldName} must be at least ${minLength} characters long`;
    }
};

// Type text validator
const numberValidator = (
    value: string | undefined,
    fieldName: string
): string | undefined => {
    if (value && !/^\d+$/.test(value)) {
        return `The ${fieldName} must contain only numbers`;
    }
};

export const customValidators = [
    { name: 'requiredValidator', method: requiredValidator },
    { name: 'minLengthValidator', method: minLengthValidator },
    { name: 'numberValidator', method: numberValidator },
];
