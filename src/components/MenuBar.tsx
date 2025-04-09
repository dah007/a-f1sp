import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from './ui/navigation-menu';

import { navigationMenuTriggerStyle } from 'components/ui/navigation-menu';

import { MENU } from '../constants/constants';
/**
 * MenuBar component renders a navigation menu with a list of navigation items.
 * Each item is generated from the MENU array and is wrapped in a NavigationMenuItem component.
 * The CustomLink component is used to create links for each navigation item.
 *
 * @component
 * @example
 * <MenuBar />
 *
 * @returns {JSX.Element} The rendered navigation menu component.
 */
function MenuBar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {MENU.map((item, index) => (
                    <NavigationMenuItem className={navigationMenuTriggerStyle()} key={index}>
                        <Link to={item.path}>{item.label}</Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}

export default MenuBar;
