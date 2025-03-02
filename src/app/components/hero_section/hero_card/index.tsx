'use client'
import React from 'react';
import gsap from 'gsap';
import { useEffect, useRef } from "react";
import HeroButton from '../hero_button';
import HeroMarquee from "@/app/components/hero_section/hero_marquee";

interface HeroCardProps{
    buttons: {id: number}[];
    text_pass: string;
}

const HeroCard: React.FC<HeroCardProps> = ({buttons, text_pass}) => {
    const textContainer = useRef<HTMLDivElement | null>(null);

    useEffect( () => {
        if (!textContainer.current) return;

        gsap.to(textContainer.current, {
            x: '-100%',
            duration: 10,
            repeat: -1,
            ease: 'linear',
        });

        return () => {
            gsap.killTweensOf(textContainer.current);
        }
        }, [])

    return (
        <>
            <div className="relative bg-card-blue px-16 py-24 rounded-3xl flex justify-evenly items-center md:rounded-2xl md:px-16 md:py-32 overflow-hidden">
                <div className="absolute inset-[0] top-[-50px] text-black text-7xl font-thin italic  leading-[0.75] whitespace-nowrap">
                    <div className="translate-x-[0px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-45px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-85px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-20px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-70px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-135px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-105px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-35px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-95px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-60px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
                    <div className="translate-x-[-15px]">
                        <HeroMarquee text={text_pass}/>
                    </div>
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