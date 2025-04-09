interface StatCardProps {
    topSize?: string;
    topText: string;
    stat: number | string | undefined;
    bottomSize?: string;
    bottomText: string;
    description?: string;
}

const StatCard = ({ topText, stat, description }: StatCardProps): JSX.Element => {
    return (
        <div className="w-12 h-6">
            {topText} |{description} |{stat}
        </div>
    );
    // return (
    //     <CardBox bodyClasses={'w-12 h-6'} content={`${stat} -- hello`} description={description} title={topText} />
    // );
};

export default StatCard;
