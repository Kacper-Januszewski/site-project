import React from 'react';
import HeroCard from '../hero_card'

const Hero = () => {
    return (
        <>
            <div className="flex flex-col m-5 p-5 gap-14 items-center text-center md:flex md:flex-row md:m-10 md:p-10 md:gap-10 md:justify-evenly md:items-center md:text-center">
            <HeroCard />
            <HeroCard />
            </div>
        </>
    );
};

export default Hero;

//top div with flex wrap here?