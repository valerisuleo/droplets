/* eslint-disable @typescript-eslint/no-empty-function */
import { Fragment, useEffect, useState } from 'react';
import { gameService } from '../services/games';
import { AppError } from '../../../errors/app-error';
import { ICard } from '../../../libs/cards/ intefaces';
import { IBtn } from '../../../libs/button/interfaces';
import Hero from '../../../libs/hero/hero';
import Card from '../../../libs/cards/card';
import Button from '../../../libs/button/button';
import { AxiosResponse } from 'axios';
import ListGroup from '../../../libs/list-group/list-group';

export interface IGame {
    id: number;
    name: string;
    background_image: string;
}

export interface IGenre {
    id: number;
    name: string;
    background_image: string;
    games: IGame[];
}

const GameIndex = () => {
    const [games, setGames] = useState([]);
    const [genres, setGegenres] = useState<IGenre[]>([]);

    useEffect(() => {
        getGames();
        getGenres();
    }, []);

    function getGames(): void {
        gameService
            .get('/games')
            .then((response: AxiosResponse) => {
                console.log(response.data.results);
                setGames(response.data.results);
            })
            .catch((error: AppError) => {});
    }

    function getGenres(): void {
        gameService
            .get('/genres')
            .then((response: AxiosResponse) => {
                setGegenres(response.data.results);
            })
            .catch((error: AppError) => {});
    }

    const handleFilterByGenre = (current: IGenre) => {
        gameService
            .get(`/games?genres=${current.id}`)
            .then((response: AxiosResponse) => {
                setGames(response.data.results);
            })
            .catch((error: AppError) => {});
    };

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

    const hadleClick = () => null;

    const btnProps: IBtn = {
        label: 'Shop now',
        onEmitEvent: hadleClick,
        type: 'button',
        classes: {
            contextual: 'primary',
            size: 'md',
        },
    };

    return (
        <Fragment>
            <section className="my-4">
                <Hero variant={'background'} backgroundColor="pink">
                    <h1 className="my-5">I need an hero!</h1>
                    <Button {...btnProps}></Button>
                </Hero>
            </section>

            <div className="row">
                <aside className="col-md-3">
                    <ListGroup
                        collection={genres}
                        propKey={'id'}
                        propText={'name'}
                        onEmitEvent={handleFilterByGenre}
                    ></ListGroup>
                </aside>
                <section className="col-md-9">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {games?.length &&
                            games.map((item: IGame) => {
                                const props = cardProps(item);
                                return (
                                    <div className="col" key={item.id}>
                                        <Card
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
