import { Fragment, useEffect, useState } from 'react';
import { gameService } from './service';
import { AppError } from '../../errors/app-error';
import Card from '../../libs/cards/card';
import { ICard } from '../../libs/cards/ intefaces';

const GameIndex = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        // getGames();
    }, []);

    function getGames(): void {
        gameService
            .getAll()
            .then(({ data }) => {
                console.log('data', data);
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch((error: AppError) => {});
    }

    const cardProps: ICard = {
        header: {
            children: (
                <img
                    src="https://via.placeholder.com/350x150"
                    className="card-img-top"
                    alt="..."
                />
            ),
        },
        body: {
            cardTitle: 'Card title',
            children: (
                <Fragment>
                    <p>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <button className="btn btn-primary">Go somewhere</button>
                </Fragment>
            ),
        },
    };

    return <Card {...cardProps}></Card>;
};

export default GameIndex;
