import React from "react";
import Link from "next/link";


const Navbar = () => {
    return (
        <>
            <div className="w-full h-[50px] bg-black bg-opacity-25 backdrop-blur-[5px] sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-center items-center h-full">
                        <ul className="flex gap-x-6 md:gap-x-[250px] text-white">
                            <li>
                                <Link legacyBehavior={true} href="https://github.com/Kacper-Januszewski" passHref>
                                    <a>GitHub</a>
                                </Link>
                            </li>
                            <li>
                                <Link legacyBehavior={true} href="https://www.linkedin.com/in/kacper-januszewski/" passHref>
                                    <a>LinkedIn</a>
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