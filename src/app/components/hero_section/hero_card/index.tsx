'use client'
import React from 'react';
import HeroButton from '../hero_button';

interface HeroCardProps{
    buttons: {id: number}[];
}
const HeroCard: React.FC<HeroCardProps> = ({buttons}) => {
    return (
        <>
            <div className="relative bg-card-blue px-16 py-24 rounded-3xl flex justify-evenly items-center md:rounded-2xl md:px-16 md:py-32 overflow-hidden">
                <div className="absolute inset-[-1] top-[-100px] text-black text-7xl font-thin italic  leading-[0.75] whitespace-nowrap">
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                    works works works works works works works works works <br/>
                </div>

                <div className="relative flex flex-col gap-y-8 md:gap-y-10">
                {buttons.map((button) => (
                    <HeroButton key={button.id} id={button.id} />
                ))}
                </div>





                {/*So I need to add ripple effect from material tailwind. I've downloaded the library but I cannot instert the script loading it and idk how to do that here are some links:
                https://youtrack.jetbrains.com/issue/WEB-60873/External-CSS-stylesheet-for-Bootstrap-is-downloaded-as-a-javascipt-file.
                https://www.material-tailwind.com/docs/html/guide/next
                https://www.creative-tim.com/twcomponents/component/tailwind-css-button-ripple-effect-by-material-tailwind
                */}
                    {/*<HeroButton id={1}/>*/}
                    {/*<HeroButton id={2}/>*/}
                    {/*<HeroButton id={3}/>*/}
            </div>
        </>
    );
};

export default HeroCard;