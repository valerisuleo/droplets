import { ICard } from './ intefaces';

const Card = ({ header, body }: ICard) => {
    return (
        <div className="card">
            {header.children && (
                <div className="card-header">{header.children}</div>
            )}

            {(body.children || body.cardTitle) && (
                <div className="card-body">
                    <h5 className="card-title">{body.cardTitle}</h5>
                    <section className="card-text">{body.children}</section>
                </div>
            )}
        </div>
    );
};

export default Card;
