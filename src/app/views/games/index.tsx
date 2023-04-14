import { Fragment, useEffect, useState } from 'react';
import { gameService } from './service';
import { AppError } from '../../errors/app-error';
import Card from '../../libs/cards/card';
import { ICard } from '../../libs/cards/ intefaces';
import Hero from '../../libs/hero/hero';
import { IBtn } from '../../libs/button/interfaces';
import Button from '../../libs/button/button';

export interface IGame {
    id: number;
    name: string;
    background_image: string;
}

const GameIndex = () => {
    const [games, setGames] = useState([]);
    const [genres, setGegenres] = useState([]);

    useEffect(() => {
        // getGames();
        // getGenres();
    }, []);

    function getGames(): void {
        gameService
            .getAll('/games')
            .then(({ data }) => {
                const list = data;
                console.log('list', list);
                setGames(data.results);
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch((error: AppError) => {});
    }

    function getGenres(): void {
        gameService
            .getAll('/genres')
            .then(({ data }) => {
                const list = data;
                console.log('list', list);
                setGegenres(data.results);
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

    const btnProps = {
        label: 'Shop now',
        onEmitEvent: null,
        type: 'button',
        classes: {
            contextual: 'primary',
            size: 'md',
        },
    } as IBtn;

    return (
        <Fragment>
            <Hero variant={'background'} backgroundColor="pink">
                <h1 className='my-5'>I need an hero!</h1>
                <Button {...btnProps}></Button>
            </Hero>

            <div className="row">
                <aside className="col-md-3"></aside>
                <section className="col-md-9">
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
                </section>
            </div>
        </Fragment>
    );
};

export default GameIndex;
