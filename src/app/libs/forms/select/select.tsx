import { IFormSelectField } from '../interfaces';

const Select = ({
    options,
    textProp,
    valueProp,
    onChange,
    label,
    name,
    type,
    value,
}: IFormSelectField) => {
    return (
        <div className="my-3">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <select
                id={name}
                onChange={onChange}
                defaultValue={value[valueProp]} // Update defaultValue
                className="form-control"
                name={name}
                data-type={type}
            >
                {options.map((item) => (
                    <option key={item[valueProp]} value={item[valueProp]}>
                        {item[textProp]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
