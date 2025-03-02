import React from 'react';

type MarqueeProps = {
    text: string;
};

const HeroMarquee: React.FC<MarqueeProps> = ({text}) => {
    return (
        <>
            <span>{text}</span>
            <span>{text}</span>
            <span>{text}</span>
        </>
    );
};

export default HeroMarquee;