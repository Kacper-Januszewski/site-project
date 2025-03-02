"use client";
import React, {useEffect, useRef} from 'react';
import gsap from "gsap";

const Row = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!marqueeRef.current) return;

        const row = marqueeRef.current;
        let row_width = row.scrollWidth; // Full width of content
        let duration = 5; // Speed of animation

        gsap.set(row, { x: 0 });

        gsap.to(row, {
            x: -row_width / 2, // Move only half since we're doubling content
            ease: "none",
            duration: duration,
            repeat: -1
        });
    }, []);

    return (
        <section className="relative cb-tagreel block overflow-hidden">
            <div className="cb-tagreel-content py-[200px]">
                <div className="cb-tagreel-items flex whitespace-nowrap" role="marquee" ref={marqueeRef}>
                    {/* Items - Original */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="cb-tagreel-row flex">
                            {["Design", "Development", "Marketing", "Branding", "Consulting"].map((text, index) => (
                                <div
                                    key={index}
                                    className="cb-tagreel-item relative leading-normal text-[3.75vw] flex-none px-[58px] uppercase"
                                >
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

export default Row;