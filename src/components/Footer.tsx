const Footer = () => {
    return (
        <footer
            role="contentinfo"
            className="h-12 border-t 
            dark:border-gray-500 
            light:border-gray-900 
            text-center 
            footer
            justify-center 
            items-center 
            pt-2 
            fixed 
            bottom-0 
            w-full 
            dark:bg-gray-800 
            bg-gray-400"
        >
            <div className="footer text-center items-center justify-center mx-auto px-4">
                Built with ❤️ using Vite with React, React Router, Redux Query, TailwindCSS & shadcn/ui
            </div>
        </footer>
    );
};

export default Footer;
