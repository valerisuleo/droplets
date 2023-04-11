import { Fragment } from 'react';
import { IFormInputField } from '../interfaces';

const InputGroup = ({
    label,
    value,
    onChange,
    onBlur,
    name,
    type,
    validators,
    errorValidation,
}: IFormInputField) => {
    return (
        <Fragment>
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <input
                className="form-control"
                name={name}
                type={type}
                onChange={onChange}
                onBlur={() => onBlur(name, label, value, validators)}
                value={value}
                id={name} // for testing purposes
            />
            {errorValidation && errorValidation.length ? (
                <Fragment>
                    {errorValidation.map((err: any, i) =>
                        err.msg ? (
                            <div key={i} className="alert alert-danger">
                                {err.msg}
                            </div>
                        ) : null
                    )}
                </Fragment>
            ) : null}
        </Fragment>
    );
};

export default InputGroup;
