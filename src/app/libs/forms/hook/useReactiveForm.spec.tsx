import { renderHook, act } from '@testing-library/react-hooks';
import { useReactiveForm } from './useReactiveForm';

describe('useReactiveForm', () => {
    const schema = {
        firstName: '',
        lastName: '',
    };

    const doSubmit = jest.fn();

    it('should return correct initial values', () => {
        const { result } = renderHook(() =>
            useReactiveForm(schema, doSubmit)
        );

        const [formGroup, errorValidation] = result.current;

        expect(formGroup).toEqual(schema);
        expect(errorValidation).toEqual([]);
    });

    it('should handle form changes correctly', () => {
        const { result } = renderHook(() =>
            useReactiveForm(schema, doSubmit)
        );
        const [, , handleChange] = result.current;

        act(() => {
            handleChange({ target: { name: 'firstName', value: 'John' } });
        });

        expect(result.current[0]).toEqual({ ...schema, firstName: 'John' });
    });

    // Add more tests for handleBlur, handleSubmit, and validationErrors functions
});
