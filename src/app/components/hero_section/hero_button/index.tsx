import React from 'react';
import {Button} from "react-bootstrap";

interface ButtonData {
    id: number;
    title: string;
    description: string;
    url: string;
}

const HeroButton: React.FC<DynamicJSONInput> = () => {
    return (
        <>
                <Button className="bg-button-gray rounded m-0.5 px-12 py-1 md:m-1 md:px-20 md:py-1 md:text-2xl">Button</Button>
        </>
    );
};

export default HeroButton;