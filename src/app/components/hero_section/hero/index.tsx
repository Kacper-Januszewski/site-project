import React from 'react';
import HeroCard from '../hero_card'

const Hero = () => {
    return (
        <>
            <div className="flex flex-row m-10 p-10 gap-10 justify-evenly items-center text-center">
            <HeroCard />
            <HeroCard />
            </div>
        </>
    );
};

export default Hero;

//top div with flex wrap here?