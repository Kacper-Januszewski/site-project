'use client';
import React, { useEffect, useState} from "react";

interface CarouselItem {
    id: number;
    title: string;
    body: string;
    imageUrl: string;
}

interface DynamicJSONInput {
    filename: string;
}

const Carousel: React.FC<DynamicJSONInput> = ({filename}) => {
    const [items, setItems] = useState<CarouselItem[]>([]);
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(`/${filename}`);
            const data = await response.json();
            setItems(data.items.bootstrap);

        };

        fetchItems();
    }, [filename]);

    return (
        <div className="relative w-full max-w-md min-w-[200px] md:min-w-[384px] h-fit">
            <div className="overflow-hidden rounded-lg">
                <img src={items[index]?.imageUrl} alt="slides" className="w-full h-64 object-cover" />
                <div className="p-4 bg-gray-900 shadow-lg">
                    <h3 className="text-xl font-semibold">{items[index]?.title}</h3>
                    <p className="text-gray-600">{items[index]?.body}</p>
                </div>
            </div>

            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black rounded-full p-2 hover:bg-gray-700"
                >
                &#10094;
            </button>
            <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black rounded-full p-2 hover:bg-gray-700">

                &#10095;
            </button>
        </div>
    );
}

export default Carousel;
//test