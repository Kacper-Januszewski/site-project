"use client";
import React, {useEffect, useRef} from 'react';
import gsap from "gsap";

type MarqueeProps = {
    text: string;
};

const HeroMarquee: React.FC<MarqueeProps> = ({text}) => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!marqueeRef.current) return;

        const row = marqueeRef.current.firstElementChild
        if(!row) return;

        const rowWidth = row.getBoundingClientRect().width;
        marqueeRef.current.style.width = `${rowWidth * 2}px`

        const baseSpeed = 5;
        const duration = rowWidth / baseSpeed;

        gsap.set(marqueeRef.current, { x: 0 });

        gsap.to(marqueeRef.current, {
            x: -rowWidth,
            ease: "none",
            duration: duration,
            repeat: -1
        })
    }, []);

    return (
        <section className="relative cb-tagreel block select-none">
            <div className="cb-tagreel-content">
                <div className="cb-tagreel-items flex whitespace-nowrap w-max" role="marquee" ref={marqueeRef}>
                    {/* Items - Original */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="cb-tagreel-row flex w-max">
                            {[...Array(5)].map((_, index) => (
                                <div
                                    key={index}
                                    className="cb-tagreel-item relative leading-[0.75] text-[3.75vw] px-[7px] flex-none uppercase"
                                > {/* px 58px */}
                                    <span className="relative inline-block">{text}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HeroMarquee;