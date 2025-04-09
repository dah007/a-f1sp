import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'components/ui/dropdown-menu';
import { Menu } from 'lucide-react';

import { MENU } from 'constants/constants';
import { Link } from 'react-router-dom';

const HamburgerMenu = ({ className }: { className?: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger onClick={() => setIsOpen(!isOpen)}>
                <Menu className={`w-8 h-8 p-2 m-2 mt-0  border-2 border-transparent rounded-md ${className}`} />
            </DropdownMenuTrigger>
            {isOpen && (
                <DropdownMenuContent align="start">
                    {MENU.map((item, index) => (
                        <DropdownMenuItem key={index} onClick={() => setIsOpen(false)}>
                            <Link to={item.path}>{item.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );
};

export default HamburgerMenu;
