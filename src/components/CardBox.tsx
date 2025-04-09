import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { cn } from '@/lib/utils';

interface CardProps {
    actions?: ReactNode;
    bodyClasses?: string;
    classes?: Array<string> | string;
    content: ReactNode;
    contentHeight?: string;
    description?: string;
    footer?: ReactNode;
    title?: string;
    useScroll?: boolean;
}

const CardBox: React.FC<CardProps> = ({
    actions,
    bodyClasses,
    classes,
    content,
    contentHeight,
    description,
    footer,
    title,
    useScroll = true,
}: CardProps) => {
    const RenderContent = () => {
        if (useScroll) {
            return (
                <ScrollArea className={`w-full ${contentHeight ? contentHeight : 'h-full'}`}>
                    {actions}
                    {content}
                    <ScrollBar />
                </ScrollArea>
            );
        }
        return (
            <>
                {actions}
                {content}
            </>
        );
    };

    return (
        <Card className={cn(classes, 'block', 'p-0')} data-testid={`card-${title}`}>
            <CardHeader className="p-1 pb-0 pl-2 m-0 ml-2">
                {title && <CardTitle className="text-xl font-bold">{title}</CardTitle>}
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className={cn(bodyClasses, 'm-0 p-0 h-full')}>
                {/* <ScrollArea className={`w-full ${contentHeight ? contentHeight : 'h-full'}`}>
                    {actions}
                    {content}
                    <ScrollBar />
                </ScrollArea> */}
                <RenderContent />
            </CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
        </Card>
    );
};

export default CardBox;
