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
                <div className="container flex justify-center gap-x-16 h-10 mb-6">
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
                <div className='flex justify-center items-center p-8'>
                    <form className='flex flex-col w-fit'>
                        <input className='rounded p-2 mb-4 border border-white bg-black' id='email' type='email' aria-label='email address' placeholder='E-mail' />
                        <input className="h-20 rounded p-2 mb-4 border border-white bg-black" id="message" type="text" aria-label="message" placeholder="Message"></input>
                        <button className='bg-white hover:bg-gray-500 duration-300 text-black shadow p-2 rounded' type='submit'>
                            Send
                        </button>
                    </form>
                </div>
                <div className="h-[500px]"></div>
            </div>
        </>
    );
};

export default Form;