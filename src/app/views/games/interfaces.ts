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


export interface IGameQuery {
    games: IGame[];
    genres: IGenre[];
}