/* eslint-disable @typescript-eslint/no-empty-function */
import { render, fireEvent } from '@testing-library/react';
import ListGroup from './list-group';

// THIS TESTS ARE ONLY FOR THE STYLED COMPONENT
describe('ListGroup component', () => {
    const items = [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
    ];

    it('renders a list of items', () => {
        const { getByText } = render(
            <ListGroup
                collection={items}
                propKey="id"
                propText="text"
                onEmitEvent={() => {}}
            />
        );
        expect(getByText('Item 1')).toBeDefined();
        expect(getByText('Item 2')).toBeDefined();
        expect(getByText('Item 3')).toBeDefined();
    });

    it('calls onEmitEvent when an item is clicked', () => {
        const mockFn = jest.fn();
        const { getByText } = render(
            <ListGroup
                collection={items}
                propKey="id"
                propText="text"
                onEmitEvent={mockFn}
            />
        );
        fireEvent.click(getByText('Item 2'));
        expect(mockFn).toHaveBeenCalledWith(items[1]);
    });

    it('adds an "sc-gueYoa biyJCt list-group-item" class to the clicked item', () => {
        const classActive = 'sc-gueYoa kybiQF list-group-item active';
        const { getByText } = render(
            <ListGroup
                collection={items}
                propKey="id"
                propText="text"
                onEmitEvent={() => {}}
            />
        );
        fireEvent.click(getByText('Item 2'));
        expect(getByText('Item 2').className).toContain(classActive);
    });
});
