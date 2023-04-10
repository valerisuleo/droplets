import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Checks from './checks';

describe('Checks component', () => {
    const defaultProps = {
        label: 'Test Label',
        value: 'testValue',
        onChange: jest.fn(),
        name: 'testName',
        type: 'checkbox',
    };

    it('renders the label correctly', () => {
        const { getByText } = render(<Checks {...defaultProps} />);
        expect(getByText(defaultProps.label)).toBeInTheDocument();
    });

    it('renders the input with correct attributes', () => {
        const { getByTestId } = render(<Checks {...defaultProps} />);
        const input = getByTestId('form-check-input');

        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute('name', defaultProps.name);
        expect(input).toHaveAttribute('type', defaultProps.type);
        expect(input).toHaveAttribute('value', defaultProps.value);
    });

    it('triggers onChange when the input value changes', () => {
        const { getByTestId } = render(<Checks {...defaultProps} />);
        const input = getByTestId('form-check-input');

        fireEvent.click(input);
        expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });
});
