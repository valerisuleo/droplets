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

    const cardProps = (item: IGame): ICard => {
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
            classes: {
                equalHeight: true,
            },
        };
    };

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {games?.length &&
                games.map((item: IGame) => {
                    const props = cardProps(item);
                    return (
                        <div className="col">
                            <Card
                                key={item.id}
                                header={props.header}
                                body={props.body}
                                classes={props.classes}
                            />
                        </div>
                    );
                })}
        </div>
    );
};

export default GameIndex;
