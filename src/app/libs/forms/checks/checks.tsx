import { IFormInputField } from '../interfaces';

const Checks = ({ label, value, onChange, name, type }: IFormInputField) => {
    return (
        <div className="form-check">
            <input
                className="form-check-input"
                name={name}
                type={type}
                onChange={onChange}
                value={value}
                id={name} // for testing purposes
                data-testid="form-check-input" // for testing purposes
            />
            <label htmlFor={name} className="form-label">
                {label}
            </label>
        </div>
    );
};

export default Checks;
