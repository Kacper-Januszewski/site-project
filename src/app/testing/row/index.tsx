"use client";
import React, {useEffect, useRef} from 'react';
import gsap from "gsap";

const Row = () => {
    const marqueeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!marqueeRef.current) return;

        const row = marqueeRef.current.firstElementChild; // Select one `.cb-tagreel-row`
        if (!row) return;

        const rowWidth = row.getBoundingClientRect().width; // Use this to avoid padding issues
        marqueeRef.current.style.width = `${rowWidth * 2}px`; // Set container width to double

        gsap.set(marqueeRef.current, { x: 0 });

        gsap.to(marqueeRef.current, {
            x: -rowWidth, // Move exactly one full row width
            ease: "none",
            duration: 20,
            repeat: -1
        });
    }, []);

    return (
        <section className="relative cb-tagreel block overflow-hidden">
            <div className="cb-tagreel-content">
                <div className="cb-tagreel-items flex whitespace-nowrap w-max" role="marquee" ref={marqueeRef}>
                    {/* Items - Original */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="cb-tagreel-row flex w-max">
                            {["Works", "Works", "Works", "Works", "Works", "Works", "Works", "Works", "Works", "Works"].map((text, index) => (
                                <div
                                    key={index}
                                    className="cb-tagreel-item relative leading-[0.75] text-[3.75vw] flex-none uppercase"
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

export default Row;