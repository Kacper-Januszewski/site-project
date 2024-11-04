import React from "react";
import Link from "next/link";


const Navbar = () => {
    return (
        <>
            <div className="w-full h-[50px] bg-black bg-opacity-25 backdrop-blur-[5px] sticky top-0 z-50">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-center items-center h-full font-sans">
                        <ul className="flex gap-x-[100px] md:gap-x-[200px] text-white text-xs">
                            <li>
                                <Link legacyBehavior={true} href="#home" passHref>
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior={true} href="#work" passHref>
                                    <a>Work</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior={true} href="#contact" passHref>
                                    <a>Contact</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;