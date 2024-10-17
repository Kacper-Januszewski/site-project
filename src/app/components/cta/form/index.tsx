'use client';

import { FC } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/utils/email-send";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export type FormData = {
    name: string;
    email: string;
    message: string;
};

const Form: FC = () => {
    const {register, handleSubmit } = useForm<FormData>();

    function onSubmit(data: FormData) {
        sendEmail(data)
    }

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
                    <img
                        src="/LI-In-Bug.png"
                        alt="LinkedIn Logo"
                        width={50}
                        height={40}
                        className="object-contain"
                    />
                    </Link>
                </div>
                <div className='flex justify-center items-center p-8'>
                    <form
                        className='flex flex-col w-fit'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            className='rounded p-2 mb-4 border border-white bg-black'
                            id='email'
                            type='email'
                            aria-label='email address'
                            placeholder='E-mail'
                            {...register('email', { required: true})}
                        />

                        <textarea
                            rows={4}
                            className="h-20 rounded p-2 mb-4 border border-white bg-black"
                            id="message"
                            type="text"
                            aria-label="message"
                            placeholder="Message"
                            {...register('message', {required: true})}
                        ></textarea>

                        <button
                            className='bg-white hover:bg-gray-500 duration-300 text-black shadow p-2 rounded'
                            type='submit'>
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