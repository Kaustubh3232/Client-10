import { SignIn, useUser, ClerkLoaded, ClerkLoading } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Admin = () => {
    const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            navigate('/admin/dashboard');
        }
    }, [isSignedIn, isLoaded, navigate]);

    return (
        <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-2xl max-h-2xl bg-[#064e3b]/5 rounded-full blur-[100px] -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] max-w-2xl max-h-2xl bg-[var(--color-brand-gold)]/10 rounded-full blur-[100px] -ml-32 -mb-32" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-10 relative z-10"
            >
                <img src="/Assests/bluebirdslogo (1).png" alt="Blue Bird International School" className="h-20 w-auto mx-auto mb-6 drop-shadow-sm" />
                <h2 className="text-4xl font-black text-[#064e3b] tracking-tight">Admin Portal</h2>
                <p className="text-gray-500 mt-3 max-w-sm mx-auto font-medium">
                    Welcome back. Please sign in to manage your school.
                </p>
            </motion.div>

            <div className="relative z-10 w-full max-w-[400px]">
                <ClerkLoading>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full bg-white rounded-[2.5rem] shadow-2xl p-10 flex flex-col items-center justify-center min-h-[400px] border border-gray-100"
                    >
                        <Loader2 className="w-12 h-12 text-[#064e3b] animate-spin mb-6" />
                        <div className="h-4 w-3/4 bg-gray-100 rounded-full animate-pulse mb-3" />
                        <div className="h-3 w-1/2 bg-gray-50 rounded-full animate-pulse" />

                        <div className="w-full space-y-4 mt-10">
                            <div className="h-12 w-full bg-gray-50 rounded-xl animate-pulse" />
                            <div className="h-12 w-full bg-gray-50 rounded-xl animate-pulse" />
                            <div className="h-12 w-full bg-[#064e3b]/10 rounded-xl animate-pulse mt-6" />
                        </div>
                    </motion.div>
                </ClerkLoading>

                <ClerkLoaded>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <SignIn
                            appearance={{
                                elements: {
                                    formButtonPrimary: 'w-full py-4 !bg-[#064e3b] hover:!bg-[#043326] !shadow-xl !shadow-emerald-900/20 !rounded-xl !text-sm !font-black !tracking-widest !uppercase transition-all',
                                    card: '!bg-white !shadow-2xl !shadow-black/5 !rounded-[2.5rem] !border !border-gray-100 !p-8',
                                    headerTitle: '!text-2xl !font-black !text-gray-900 !tracking-tight',
                                    headerSubtitle: '!text-gray-500 !text-sm',
                                    socialButtonsBlockButton: '!rounded-xl !border-gray-200 hover:!bg-gray-50',
                                    formFieldInput: '!rounded-xl !border-gray-200 !p-3 focus:!border-[#064e3b] focus:!ring-[#064e3b]/20',
                                    formFieldLabel: '!text-gray-600 !font-bold !text-xs',
                                    footerActionLink: '!text-[#064e3b] hover:!text-[#043326] !font-bold',
                                    identityPreviewEditButton: '!text-[#064e3b]'
                                }
                            }}
                            routing="path"
                            path="/admin"
                            signUpUrl="/admin/sign-up"
                            forceRedirectUrl="/admin/dashboard"
                        />
                    </motion.div>
                </ClerkLoaded>
            </div>
        </div>
    );
};

export default Admin;
