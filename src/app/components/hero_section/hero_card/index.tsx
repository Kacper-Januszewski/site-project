import React from 'react';
import HeroButton from '../hero_button';

const HeroCard = () => {
    return (
        <>
            <div className="bg-card-gray rounded-2xl px-16 py-36 flex flex-col justify-evenly items-center h-full gap-y-10">
                    <HeroButton />
                    <HeroButton />
                    <HeroButton />
            </div>
        </>
    );
};

export default HeroCard;