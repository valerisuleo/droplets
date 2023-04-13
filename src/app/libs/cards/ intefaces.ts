import { ReactNode } from 'react';

export interface ICard {
    header: {
        children: ReactNode;
    };
    body: {
        cardTitle?: string;
        children: ReactNode;
    };
}
