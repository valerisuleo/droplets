import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { IBtn } from './interfaces';
import Button from './button';

describe('Button', () => {
    const mockProps: IBtn = {
        label: 'Click me!',
        type: 'button',
        classes: {
            contextual: 'primary',
            size: 'lg',
        },
        onEmitEvent: jest.fn(),
    };

    it('should render button with correct label', () => {
        const { getByText } = render(<Button {...mockProps} />);
        expect(getByText(mockProps.label)).toBeDefined();
    });

    it('should call onEmitEvent when clicked', () => {
        const { getByText } = render(<Button {...mockProps} />);
        fireEvent.click(getByText(mockProps.label));
        expect(mockProps.onEmitEvent).toHaveBeenCalled();
    });
});
