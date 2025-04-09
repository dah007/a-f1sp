import { JSX } from 'react';
// ? too many issues with toggling dark mode
// import ModeToggle from './ModeToggle';

import { MENU, SITE_NAME } from 'constants/constants';
import ButtonLink from './ButtonLink';
import { Link } from 'react-router';

import SiteLogo from 'assets/logos/f1_car_transparent.png';
import HamburgerMenu from './HamburgerMenu';

/**
 * Header component that displays a header section with a title and a mode toggle button.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const Header = (): JSX.Element => {
    return (
        <header className="fixed z-40 flex w-full lg:h-24 h-12 gap-4 p-2 pt-2 m-0 border-b border-gray-500 bg-zinc-700">
            <img src={SiteLogo} alt="F1 Predict" className="lg:h-22 h-10" />

            <div className="flex flex-col w-full">
                <div className="flex gap-2 w-full">
                    <h2
                        aria-label="Main Header"
                        data-testid="title"
                        className="text-3xl font-bold racingFont text-nowrap"
                    >
                        <Link to="/" data-testid="header-link italic focus:outline-none focus:onFocus:ring-2">
                            {SITE_NAME}
                        </Link>
                    </h2>
                    <div className="lg:hidden flex-1" />

                    {/* MAIN MENU - MOBILE */}
                    <HamburgerMenu className="lg:hidden flex-1" />
                </div>

                {/* MAIN MENU - DESKTOP */}
                <div className="hidden lg:flex lg:flex-row lg:gap-4">
                    {MENU.map((route) => {
                        if (route.hidden) return null;

                        return (
                            <ButtonLink
                                key={route.path}
                                to={route.path}
                                label={route.label}
                                className={['m-0', 'p-2']}
                            />
                        );
                    })}
                </div>
            </div>

            {/* ? too many issues with toggling dark mode */}
            {/* <div className="flex-1 text-right">
                <ModeToggle />
            </div> */}
        </header>
    );
};

export default Header;
