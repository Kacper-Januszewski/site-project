import React from 'react';
import Image from "next/image";

const Footer = () => {
    return (
        <>
            <div className="h-[0.5px] w-full md:h-[1px] md:w-full bg-button-gray" />
            <div className="flex flex-col items-center md:flex md:flex-row md:justify-between md:items-center md:mt-8">
                    <p className="p-1 m-1 text-[0.5rem] order-2 text-copyright-gray md:order-1 md:text-xs md:mr-[40px]">© 2024 Kacper Januszewski</p>
                <div className="order-1 md:order-2 md:flex md:flex-row md:gap-x-10">
                    <div className="p-2 m-2 flex flex-col items-center md:flex md:flex-col md:gap-y-3 md:items-center">
                        <div>
                            My work
                        </div>
                        <div className="p-1 m-1 flex flex-row gap-x-10 md:gap-x-7">
                            <a href="https://github.com/Kacper-Januszewski">
                                <Image src='/icons/github-mark.svg' alt="github icon" width="20" height="20"/>
                            </a>
                            <a href="https://www.behance.net/kacperjanusze3/projects">
                                <Image src="icons/behance.svg" alt="behance icon" width="20" height="10"/>
                            </a>
                            </div>
                    </div>
                    <div className="p-2 m-2 flex flex-col items-center md:flex-col md:gap-y-3 md:items-center">
                        <div>
                            Get in touch!
                        </div>
                        <div className="p-1 m-1 flex flex-row gap-x-10 md:gap-x-7">
                            <a href="mailto:januszewskidev@gmail.com">
                                <Image src='/icons/unnamed.png' alt="gmail icon" width="20" height="20"/>
                            </a>
                            <a href="https://www.linkedin.com/in/kacper-januszewski/">
                                <Image src="/icons/LI-In-Bug.png" alt="LinkedIn icon" width="25" height="20"/>
                            </a>
                            </div>
                    </div>
                </div>
                {/*definitely fix that to be relative later*/}
                <div className="order-3 md:order-3 md:w-[204px]"></div>
            </div>
        </>
    );
};

export default Footer;