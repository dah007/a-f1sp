import { BiSolidErrorAlt } from 'react-icons/bi';

import type { IErrorProps } from 'types/toasts';

/**
 * ErrorToast component displays an error message when `isError` is true.
 *
 * @param {string} [addClass=''] - Optional additional classes to apply to the error toast.
 * @param {boolean} [card=false] - Determines if the error toast should be displayed in a card.
 * @param {boolean} isError - Determines whether the error toast should be displayed.
 * @param {string} [text] - Optional text to display in the error toast. Defaults to 'Something went wrong...'.
 *
 * @returns {JSX.Element | null} - Returns the error toast element if `isError` is true, otherwise returns null.
 */
const ErrorToast: React.FC<IErrorProps> = ({
    // addClass = '',
    // card = false,
    // header = false,
    isError = false,
    text = 'Something went wrong...',
}: IErrorProps): JSX.Element | null => {
    if (!isError) {
        return null;
    }

    // const fullLayout = (
    //     <div className={`grid grid-cols-3 mb-3 ${addClass}`}>
    //         <div>&nbsp;</div>
    //         <div className="alert alert-error min-w-[75%]" role="alert">
    //             <BiSolidMessageError size={32} role="img" />
    //             {text}
    //         </div>
    //         <div>&nbsp;</div>
    //     </div>
    // );

    // const headerLayout = (
    //     <div className="flex w-full p-4 pb-0 m-0">
    //         <div className="z-20 flex w-full alert alert-error" role="alert">
    //             <BiSolidMessageError size={32} role="img" />
    //             {text}
    //         </div>
    //     </div>
    // );

    const cardLayout = (
        <div className="alert alert-error min-w-[25vw]  max-w-[50vh] text-sm z-20" role="alert">
            <BiSolidErrorAlt size={16} role="img" />
            {text}
        </div>
    );

    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center h-screen">
            {cardLayout}
            {/* {header ? headerLayout : card ? cardLayout : fullLayout} */}
        </div>
    );
};

export default ErrorToast;
