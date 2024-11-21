'use client'
import React from 'react';
import HeroButton from '../hero_button';

interface HeroCardProps{
    buttons: {id: number}[];
}
const HeroCard: React.FC<HeroCardProps> = ({buttons}) => {
    return (
        <>
            <div className="bg-card-gray px-16 py-24 rounded-3xl flex flex-col justify-evenly items-center gap-y-8 md:rounded-2xl md:px-16 md:py-36 h-full md:gap-y-10">
                {buttons.map((button) => (
                    <HeroButton key={button.id} id={button.id} />
                ))}
                    {/*<HeroButton id={1}/>*/}
                    {/*<HeroButton id={2}/>*/}
                    {/*<HeroButton id={3}/>*/}
            </div>
        </>
    );
};

export default HeroCard;