import React from "react";
import Image from "next/image";
import Link from "next/link";


const Form = () => {
    return (
        <>
            <div>
                <p className="pb-6">
                    You scrolled this far? Contact me!
                </p>
                <div className="container flex justify-center gap-x-16 h-10">
                    <Link href="https://github.com/Kacper-Januszewski">
                    <Image
                        src="/github-mark-white.svg"
                        alt="Github Logo"
                        width={40}
                        height={40}
                        priority
                        className="object-contain"
                    />
                    </Link>
                    <Link href="https://www.linkedin.com/in/kacper-januszewski/">
                    <Image
                        src="/LI-In-Bug.png"
                        alt="LinkedIn Logo"
                        width={50}
                        height={40}
                        priority
                        className="object-contain"
                    />
                    </Link>
                </div>
                <div className="h-[500px]"></div>
            </div>
        </>
    );
};

export default Form;