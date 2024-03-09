
import { getProviders } from 'next-auth/react';
import React from 'react';
import LoginForms from '~/components/organisms/login-forms';


const LoginPage = async () => {

    const providers = await getProviders();

    return (
        <div className="flex h-screen">
            <div className="w-3/5 flex justify-center items-center bg-[#E6FEED]">
                <img src="/images/undraw_heartbroken_cble.svg" alt="Logo" className="max-w-[75%]  " />
            </div>
            <div className="w-2/5">
                <LoginForms providers={providers} />
            </div>
        </div>
    );
};

export default LoginPage;