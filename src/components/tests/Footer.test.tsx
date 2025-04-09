import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Footer from '../Footer';

describe('Footer component', () => {
    test('renders the footer text correctly', () => {
        render(<Footer />);
        const footerText = screen.getByText(
            /Built with ❤️ using Vite with React, React Router, Redux Query, TailwindCSS & shadcn\/ui/i,
        );
        expect(footerText).toBeInTheDocument();
    });

    test('renders the footer with correct structure', () => {
        render(<Footer />);
        const footerElement = screen.getByRole('contentinfo');
        expect(footerElement).toBeInTheDocument();
        expect(footerElement).toHaveClass('footer');
    });
});
