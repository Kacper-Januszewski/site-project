"use client";

import Content_card from "@/app/components/content/content_box/content_card";
import Content_desc from "@/app/components/content/content_box/content_desc";

const Content_box = () => {
    return (
        <div className="flex justify-center gap-x-[200px]">
            <Content_card  imageSrc={"/content_boxes/code_part/code_img_test.png"}/>
            <Content_desc  descriptionSrc={"this is the description"}/>
        </div>
    );
};

export default Content_box;