import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Header from '../Header';

describe('Header component', () => {
    test.skip('renders the ModeToggle component', () => {
        render(
            <Router>
                <Header />
            </Router>,
        );
        const modeToggleElement = screen.getByTestId('mode-toggle');
        expect(modeToggleElement).toBeInTheDocument();
    });

    test('has correct class names', () => {
        render(
            <Router>
                <Header />
            </Router>,
        );
        const headerElement = screen.getByTestId('title');
        expect(headerElement).toHaveClass('text-3xl');
        expect(headerElement).toHaveClass('font-bold');
    });

    test('renders header with correct aria attributes', () => {
        render(
            <Router>
                <Header />
            </Router>,
        );
        const headerElement = screen.getByTestId('title');
        const ariaLabel = headerElement.getAttribute('aria-label');
        console.log(ariaLabel);
        expect(ariaLabel).toBe('Main Header');
    });
});
