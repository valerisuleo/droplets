import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './card';

describe('Card', () => {
    const header = { children: 'Header Content' };
    const body = { children: 'Body Content', cardTitle: 'Card Title' };

    it('should render the header and body correctly', () => {
        render(<Card header={header} body={body} />);
        expect(screen.getByText(header.children)).toBeInTheDocument();
        expect(screen.getByText(body.cardTitle)).toBeInTheDocument();
        expect(screen.getByText(body.children)).toBeInTheDocument();
    });

    it('should render only the header correctly when there is no body', () => {
        render(
            <Card
                header={header}
                body={{
                    cardTitle: '',
                    children: '',
                }}
            />
        );
        expect(screen.getByText(header.children)).toBeInTheDocument();
        expect(screen.queryByText(body.cardTitle)).toBeNull();
        expect(screen.queryByText(body.children)).toBeNull();
    });

    it('should render only the body correctly when there is no header', () => {
        render(
            <Card
                body={body}
                header={{
                    children: '',
                }}
            />
        );
        expect(screen.getByText(body.cardTitle)).toBeInTheDocument();
        expect(screen.getByText(body.children)).toBeInTheDocument();
        expect(screen.queryByText(header.children)).toBeNull();
    });
});
