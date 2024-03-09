"use client"
import React, { useState } from 'react'
import { api } from "~/trpc/react";
import { type ClientSafeProvider, type LiteralUnion, signIn } from "next-auth/react"
import Image from 'next/image';
import { type BuiltInProviderType } from 'next-auth/providers/index';

type Props = {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const LoginForms: React.FC<Props> = (props) => {

    const [signInActive, setSignInActive] = useState(false);
    const [signupForm, setSignupForm] = useState({ name: "", familyName: "", username: "", email: "", password: "" });
    const [signinForm, setSigninForm] = useState({ email: "", password: "" });

    const userSignup = api.user.register.useMutation({
        onSuccess: () => {
            console.log("User registration successful");
        }
    });

    const userSignin = api.user.login.useMutation({
        onSuccess: () => {
            console.log("User login successful");
        }
    });


    return (
        <div className="min-h-screen bg-[#FAFFFB] w-full h-full flex flex-col justify-center items-center">

            {signInActive && <div className="px-10 py-8  flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="mb-4 w-full">
                    <label htmlFor='email' className='text-muted cursor-pointer mb-2  text-sm inline-block'>
                        Email
                    </label>
                    <input
                        id='email'
                        type="text"
                        placeholder="JohnSmith007"
                        className="w-full bg-[#FAFFFB]  border border-[#D9DBDA] shadow-sm outline-none shadow-[#D9DBDA] py-2 px-4 text-typo text-sm placeholder:text-gray-300  placeholder:tracking-wider rounded-[.25rem]"
                        value={signinForm.email}
                        onChange={e => setSigninForm({ ...signinForm, email: e.target.value })}
                    />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor='password' className='text-muted cursor-pointer mb-2  text-sm inline-block'>
                        Password
                    </label>
                    <input
                        id='password'
                        type="password"
                        placeholder="123456"
                        className="w-full bg-[#FAFFFB]  border border-[#D9DBDA] shadow-sm outline-none shadow-[#D9DBDA] py-2 px-4 text-typo text-sm placeholder:text-gray-300  placeholder:tracking-wider rounded-[.25rem]"
                        value={signinForm.password}
                        onChange={e => setSigninForm({ ...signinForm, password: e.target.value })}
                    />
                </div>

                <div className="mt-6 w-full">

                    <button className="w-full bg-[#263238] text-white py-2 px-4 rounded-[.25rem] text-sm mb-4"
                        onClick={() => userSignin.mutate(signinForm)}>
                        Sign in
                    </button>
                </div>

                <div className="flex items-center my-4 w-full">
                    <div className="bg-gray-300 basis-[40%] h-[1px]" ></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="bg-gray-300 basis-[40%] h-[1px]" ></div>
                </div>

                <Providers providers={props.providers} />

                <div className="text-center text-muted text-sm flex justify-center" onClick={() => setSignInActive(false)}>
                    Are You new? <a href="#" className='underline mx-1'>Create one</a>
                </div>
            </div>}

            {!signInActive && <div className="px-10 py-8  flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Sign up</h2>
                <div className="mb-4 w-full flex">
                    <div className="mr-1">
                        <label htmlFor='name' className='text-muted cursor-pointer mb-2  text-sm inline-block'>
                            Name
                        </label>
                        <input
                            id='name'
                            type="text"
                            placeholder="John"
                            className="w-full bg-[#FAFFFB]  border border-[#D9DBDA] shadow-sm outline-none shadow-[#D9DBDA] py-2 px-4 text-typo text-sm placeholder:text-gray-300  placeholder:tracking-wider rounded-[.25rem]"
                            value={signupForm.name}
                            onChange={e => setSignupForm({ ...signupForm, name: e.target.value })}
                        />
                    </div>
                    <div className="ml-1">
                        <label htmlFor='family' className='text-muted cursor-pointer mb-2  text-sm inline-block'>
                            Family
                        </label>
                        <input
                            id='family'
                            type="text"
                            placeholder="Smith"
                            className="w-full bg-[#FAFFFB]  border border-[#D9DBDA] shadow-sm outline-none shadow-[#D9DBDA] py-2 px-4 text-typo text-sm placeholder:text-gray-300  placeholder:tracking-wider rounded-[.25rem]"
                            value={signupForm.familyName}
                            onChange={e => setSignupForm({ ...signupForm, familyName: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor='username' className='text-muted cursor-pointer mb-2  text-sm inline-block'>
                        Username
                    </label>
                    <input
                        id='username'
                        type="text"
                        placeholder="JohnSmith007"
                        className="w-full bg-[#FAFFFB]  border border-[#D9DBDA] shadow-sm outline-none shadow-[#D9DBDA] py-2 px-4 text-typo text-sm placeholder:text-gray-300  placeholder:tracking-wider rounded-[.25rem]"
                        value={signupForm.username}
                        onChange={e => setSignupForm({ ...signupForm, username: e.target.value })}
                    />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor='email' className='text-muted cursor-pointer mb-2  text-sm inline-block'>
                        Email
                    </label>
                    <input
                        id='email'
                        type="text"
                        placeholder="example@example.com"
                        className="w-full bg-[#FAFFFB]  border border-[#D9DBDA] shadow-sm outline-none shadow-[#D9DBDA] py-2 px-4 text-typo text-sm placeholder:text-gray-300  placeholder:tracking-wider rounded-[.25rem]"
                        value={signupForm.email}
                        onChange={e => setSignupForm({ ...signupForm, email: e.target.value })}
                    />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor='password' className='text-muted cursor-pointer mb-2  text-sm inline-block'>
                        Password
                    </label>
                    <input
                        id='password'
                        type="password"
                        placeholder="123456"
                        className="w-full bg-[#FAFFFB]  border border-[#D9DBDA] shadow-sm outline-none shadow-[#D9DBDA] py-2 px-4 text-typo text-sm placeholder:text-gray-300  placeholder:tracking-wider rounded-[.25rem]"
                        value={signupForm.password}
                        onChange={e => setSignupForm({ ...signupForm, password: e.target.value })}
                    />
                </div>

                <div className="mt-6 w-full">

                    <button className="w-full bg-[#263238] text-white py-2 px-4 rounded-[.25rem] text-sm mb-4"
                        onClick={() => {
                            userSignup.mutate(signupForm)
                            console.log(signupForm);
                        }}>
                        Sign up
                    </button>
                </div>

                <div className="flex items-center my-4 w-full">
                    <div className="bg-gray-300 basis-[40%] h-[1px]" ></div>
                    <span className="mx-4 text-gray-500">or</span>
                    <div className="bg-gray-300 basis-[40%] h-[1px]" ></div>
                </div>

                <Providers providers={props.providers} />


                <div className="text-center text-muted text-sm flex justify-center" onClick={() => setSignInActive(true)}>
                    You have an account? <a href="#" className='underline mx-1'>sign in</a>
                </div>
            </div>}
        </div>
    )
}

export default LoginForms;

interface ProvidersProps {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const Providers: React.FC<ProvidersProps> = ({ providers }) => {
    return (
        <div className="mb-4">
            {providers && Object.values(providers).map((provider, index) => (
                <div
                    key={index}
                    className="w-full py-2 px-4 rounded-md mb-1 text-sm flex items-center cursor-pointer justify-center text-muted"
                    onClick={() => signIn(provider.id, { callbackUrl: window.location.origin })}
                >
                    <div className="mr-2 w-6 h-6 relative">
                        <Image
                            src={`/images/icons/${provider.id}.png`}
                            alt={provider.name}
                            fill
                        />
                    </div>
                    Login with {provider.name}
                </div>
            ))}
        </div>
    );
};