import { IBtn } from './interfaces';

const Button = ({ label, type, classes, onEmitEvent }: IBtn) => {
    return (
        <button
            onClick={() => onEmitEvent()}
            type={type}
            className={`btn btn-${classes.contextual} btn-${classes.size}`}
        >
            {label}
        </button>
    );
};

export default Button;
