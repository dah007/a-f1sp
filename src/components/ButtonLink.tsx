import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { cn } from './lib/utils';

interface ButtonLinkProps {
    className?: string[];
    label: string;
    to: string;
}

/**
 * A React functional component that renders a button styled as a link.
 * When clicked, it navigates to the specified route.
 *
 * @component
 * @param {ButtonLinkProps} props - The properties for the ButtonLink component.
 * @param {string[]} props.className - The classes to apply to the button.
 * @param {string} props.label - The label for the button, also used for the aria-label attribute.
 * @param {string} props.to - The route to navigate to when the button is clicked.
 *
 * @example
 * <ButtonLink className={['btn', 'btn-primary']} label="Go to Home" to="/home" />
 */
const ButtonLink: React.FC<ButtonLinkProps> = ({ className = [], label, to }: ButtonLinkProps) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(to);
    };

    return (
        <Button className={cn(className)} onClick={handleNavigation} aria-label={label} variant="link">
            {label}
        </Button>
    );
};

export default ButtonLink;
