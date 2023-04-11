/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import InputGroup from '../input-group/input-group';
import Checks from '../checks/checks';
import Select from '../select/select';
import { customValidators } from '../validators';
import { IValidator } from './interfaces';

export function useReactiveForm(schema, doSubmit) {
    const [formGroup, setStateFormGroup] = useState(schema);
    const [errorValidation, seterrorValidation] = useState([]);

    // _____________________HANDLE EVENTS_____________________
    const handleChange = (e) => {
        const clone = { ...formGroup };
        const current = e.target;

        if (current.type === 'checkbox') {
            clone[current.name] = current.checked;
        } else if (current.type === 'select-one') {
            clone[current.name] = current.value;
        } else {
            clone[current.name] = current.value;
        }

        setStateFormGroup(clone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        doSubmit();
    };

    const handleBlur = (
        currentField: string,
        label: string,
        value: string,
        validators: IValidator[]
    ) => {
        const messages = validationErrors(
            validators,
            value,
            currentField,
            label
        );

        console.log('mess', messages);

        seterrorValidation((prevMessages) => {
            const filteredMessages = prevMessages.filter(
                (msg) => msg.name !== currentField
            );
            return [...filteredMessages, ...messages];
        });
    };

    function validationErrors(
        validators: IValidator[],
        value: string,
        currentField: string,
        label: string
    ) {
        const validatorFuncs = {
            minLengthValidator: (validator, value, label) => {
                const minLength = validator.options[0].value;
                return validator.method(value, label, minLength);
            },
            requiredValidator: (validator, value, label) => {
                return validator.method(value, label);
            },
            // Add more validators here
        };

        const result = validators
            .map(({ name, options }) => ({
                ...customValidators.find(
                    (validator) => validator.name === name
                ),
                options,
            }))
            .map((validator) => {
                const validatorFunc = validatorFuncs[validator.name];
                const msg = validatorFunc(validator, value, label);

                return {
                    msg,
                    name: currentField,
                };
            });

        return result;
    }

    // ___________________________MARKUP___________________________
    function renderInput(
        controller,
        handleChange,
        handleBlur,
        formGroup,
        errorValidation
    ) {
        const { label, name, validators, type } = controller;

        // console.log(controller);

        return (
            <InputGroup
                label={label}
                name={name}
                value={formGroup[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                type={type}
                validators={validators}
                errorValidation={errorValidation.filter(
                    (item) => item.name === name
                )}
            />
        );
    }
    function renderCheckbox(controller, handleChange, formGroup) {
        const { label, name, validators, type } = controller;
        return (
            <Checks
                label={label}
                value={formGroup[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                name={name}
                type={type}
            />
        );
    }

    function renderSelect(
        controller,
        handleChange,
        formGroup,
        valueProp,
        textProp
    ) {
        const { label, name, options, validators, type } = controller;

        return (
            <Select
                options={options}
                textProp={textProp}
                valueProp={valueProp}
                label={label}
                value={formGroup[name]}
                onChange={handleChange}
                name={name}
                type={type}
            />
        );
    }

    return [
        formGroup,
        errorValidation,
        handleChange,
        handleBlur,
        handleSubmit,
        renderInput,
        renderCheckbox,
        renderSelect,
    ];
}
