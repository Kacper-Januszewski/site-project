import React, {useEffect, useState} from 'react';
import {Button} from "react-bootstrap";

interface ButtonData {
    id: number;
    title: string;
    description: string;
    url: string;
}

interface ButtonProps {
    id: number;
}

const HeroButton: React.FC<ButtonProps> = ({id}) => {
    const [item, setItem] = useState<ButtonData | null>(null);
    useEffect(() => {

        const fetchItems = async () => {
            try {
                const response = await fetch(`/CodeItems.json`);
                const data = await response.json();
                const loadedItems: ButtonData[] = data.items.bootstrap;
                const foundItem = loadedItems.find((it) => it.id === id);
                setItem(foundItem || null);
            } catch (error) {
                console.error("Error fetching items: ",error);
            }
        };

        fetchItems();
    }, [id]);

    if(!item){
        return <p className="min-w-44 max-w-44 bg-white rounded m-0.5 px-12 py-1 md:m-1 md:mx-4 md:px-20 md:py-1 md:text-2xl md:min-w-46 md:max-w-46 md:whitespace-nowrap md:flex md:justify-center">Loading...</p>;
    }

    return (
        <>
            <a href={item.url}>
                <Button className="min-w-44 max-w-44 bg-white rounded m-0.5 px-12 py-1 md:m-1 md:mx-4 md:px-20 md:py-1 md:text-2xl md:min-w-46 md:max-w-46 md:whitespace-nowrap md:flex md:justify-center">{item.title}</Button>
            </a>
        </>
    );
};

export default HeroButton;