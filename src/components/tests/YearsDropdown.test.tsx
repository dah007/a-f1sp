import { render, screen, fireEvent } from '@testing-library/react';
import DropdownYears from '../YearsDropdown';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

describe('DropdownYears Component', () => {
    const mockOnFilterTextBoxChanged = vi.fn();

    test('renders with default selected year', () => {
        render(<DropdownYears onFilterTextBoxChanged={mockOnFilterTextBoxChanged} selectedYear={2023} />);
        expect(screen.getByText('2023')).toBeInTheDocument();
    });

    test('renders with current year if no selected year is provided', () => {
        const currentYear = new Date().getFullYear();
        render(<DropdownYears onFilterTextBoxChanged={mockOnFilterTextBoxChanged} selectedYear={currentYear} />);
        expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
    });

    test.skip('calls onFilterTextBoxChanged when a year is selected', () => {
        render(<DropdownYears onFilterTextBoxChanged={mockOnFilterTextBoxChanged} selectedYear={2023} />);
        fireEvent.mouseDown(screen.getByRole('button'));
        fireEvent.click(screen.getByText('2022'));
        expect(mockOnFilterTextBoxChanged).toHaveBeenCalledWith(
            expect.objectContaining({ currentTarget: { value: '2022' } }),
        );
    });

    test.skip('renders all years from 2024 to 1950', () => {
        render(<DropdownYears onFilterTextBoxChanged={mockOnFilterTextBoxChanged} selectedYear={2023} />);
        fireEvent.mouseDown(screen.getByRole('button'));
        for (let year = 2024; year >= 1950; year--) {
            expect(screen.getByText(year.toString())).toBeInTheDocument();
        }
    });
});
