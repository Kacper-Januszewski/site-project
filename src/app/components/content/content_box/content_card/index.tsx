"use client";
import React from 'react';
import Image from "next/image";

interface DynamicComponentProps {
    imageSrc: string;
}

const Content_card: React.FC<DynamicComponentProps> = ({imageSrc}) => {
    return (
        <>
            <div>
                <Image src={imageSrc} alt={"imageDescription"} width={40} height={40}/>
            </div>
        </>
    )
}

const createContent_card = (component: React.ComponentType<any>, props: any) => {
    return React.createElement(component, props);
}

export default Content_card;