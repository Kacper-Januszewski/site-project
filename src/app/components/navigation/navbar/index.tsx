import React from "react";
import Link from "next/link";


const Navbar = () => {
    return (
        <>
            <div className="w-full h-20 bg-black bg-opacity-25 backdrop-blur-[5px] sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <ul className="hidden md:flex gap-x-6 text-white">
                            <li>
                                <Link href="https://github.com/Kacper-Januszewski" passHref>
                                    <a>GitHub</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.linkedin.com/in/kacper-januszewski/" passHref>
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