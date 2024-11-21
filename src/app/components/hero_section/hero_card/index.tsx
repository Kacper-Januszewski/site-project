'use client'
import React from 'react';
import HeroButton from '../hero_button';
const HeroCard = () => {
    return (
        <>
            <div className="bg-card-gray px-16 py-24 rounded-3xl flex flex-col justify-evenly items-center gap-y-8 md:rounded-2xl md:px-16 md:py-36 h-full md:gap-y-10">
                    <HeroButton  title={"Github"} id={1} />
                    <HeroButton title={"Live sites"} id={2}/>
                    <HeroButton title={"Aesthetic"} id={3}/>
            </div>
        </>
    );
};

export default HeroCard;