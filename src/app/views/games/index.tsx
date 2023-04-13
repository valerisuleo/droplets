import { Fragment, useEffect, useState } from 'react';
import { gameService } from './service';
import { AppError } from '../../errors/app-error';
import Card from '../../libs/cards/card';
import { ICard } from '../../libs/cards/ intefaces';

export interface IGame {
    id: number;
    name: string;
    background_image: string;
}

const GameIndex = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        getGames();
    }, []);

    function getGames(): void {
        gameService
            .getAll()
            .then(({ data }) => {
                const list = data;
                console.log('list', list);
                setGames(data.results);
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch((error: AppError) => {});
    }

    const cardProps = (item: IGame) => {
        return {
            header: {
                children: (
                    <img
                        src={item.background_image}
                        className="card-img-top"
                        alt="..."
                    />
                ),
            },
            body: {
                cardTitle: `${item.name}`,
                children: null,
            },
        };
    };

    return (
        <div>
            {games?.length &&
                games.map((item: IGame) => (
                    <Card
                        key={item.id}
                        header={cardProps(item).header}
                        body={cardProps(item).body}
                    />
                ))}
        </div>
    );
};

export default GameIndex;
