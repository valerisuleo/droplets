export interface IMovie {
    title: string;
    genre: IGenre;
    numberInStock: number;
    dailyRentalRate: number;
    liked: boolean;
    id: string;
}

interface IGenre {
    label: string;
    id: string;
    value: string;
}
