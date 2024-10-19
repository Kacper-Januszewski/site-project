"use client";
import React from 'react';

interface DynamicComponentProps {
    descriptionSrc: string;
}

//for now I'm gonna leave it to manually input the description, but it should ideally load the desc from somewhere (perhaps a txt file?)
const Content_desc: React.FC<DynamicComponentProps> = ({descriptionSrc}) => {
    return (
        <>
            <p>{descriptionSrc}</p>
        </>
    )
}

export default Content_desc;