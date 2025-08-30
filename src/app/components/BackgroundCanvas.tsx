"use client";
import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // colors (adjust to taste)
        const colors = [
            "#0f0c29",
            "#302b63",
            "#24243e",
            "#42275a",
            "#734b6d",
            "#f12711",
        ];

        const gradients = colors.map((color, i) => ({
            y: (i / (colors.length - 1)) * height * 2, // spread vertically
            color,
        }));

        function draw() {
            ctx.clearRect(0, 0, width, height);
            const scrollY = window.scrollY;

            gradients.forEach((g) => {
                const posY = g.y - scrollY * 0.5; // move with scroll
                const gradient = ctx.createRadialGradient(
                    width / 2,
                    posY,
                    0,
                    width / 2,
                    posY,
                    width / 1.5
                );
                gradient.addColorStop(0, g.color);
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            });

            requestAnimationFrame(draw);
        }

        draw();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-50 w-full h-full"
        />
    );
}
