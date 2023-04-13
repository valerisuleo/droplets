import { ICard } from './ intefaces';

const Card = ({ header, body }: ICard) => {
    return (
        <div className="card">
            {header.children && (
                <div className="card-header">{header.children}</div>
            )}

            {body.children && (
                <div className="card-body">
                    <h5 className="card-title">{body.cardTitle}</h5>
                    <p className="card-text">{body.children}</p>
                </div>
            )}
        </div>
    );
};

export default Card;
