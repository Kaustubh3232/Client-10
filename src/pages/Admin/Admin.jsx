import { SignIn, useUser } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigate('/admin/dashboard');
        }
    }, [isSignedIn, isLoaded, navigate]);
    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-center mb-10"
            >
                <img src="/Assests/bluebirdslogo (1).png" alt="Blue Bird International School" className="h-20 w-auto mx-auto mb-6" />
                <h2 className="text-4xl font-black text-[var(--color-brand-emerald)] font-heading">Admin Portal</h2>
                <p className="text-gray-500 mt-2 font-body max-w-sm mx-auto">
                    Welcome back. Please sign in to manage your school.
                </p>
            </motion.div>

            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: 'emerald-btn w-full !bg-[var(--color-brand-emerald)] hover:!bg-[#153d24]',
                        card: 'premium-glass !shadow-2xl !rounded-[2.5rem] !border-none',
                        headerTitle: 'font-heading !text-2xl !text-[var(--color-brand-emerald)]',
                        headerSubtitle: 'font-body !text-gray-500',
                        socialButtonsBlockButton: '!rounded-xl',
                        formFieldInput: '!rounded-xl border-gray-100',
                        footerActionLink: '!text-[var(--color-brand-emerald)] hover:!text-[#153d24]'
                    }
                }}
                routing="path"
                path="/admin"
                signUpUrl="/admin/sign-up"
                forceRedirectUrl="/admin/dashboard"
            />
        </div>
    );
};

export default Admin;
