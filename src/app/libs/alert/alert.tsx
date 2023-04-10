import { IAlert } from './interfaces';

const Alert = ({ children, classes, dismissing }: IAlert) => {
    const setContextualClass = () => {
        let contextualClass = `alert alert-${classes} `;
        contextualClass += dismissing?.isDismissible
            ? `${dismissing.classes}`
            : contextualClass;

        return contextualClass;
    };

    return (
        <div className={setContextualClass()} role="alert">
            {children}
            {dismissing?.isDismissible ? (
                <button
                    type="button"
                    className="btn btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => dismissing.onEmitEvent()}
                ></button>
            ) : null}
        </div>
    );
};

export default Alert;
