import { SignedIn, SignedOut, RedirectToSignIn, useUser, useClerk } from "@clerk/clerk-react";
import { ShieldAlert, LogOut } from "lucide-react";

const AUTHORIZED_ADMIN = "chulbulschool@gmail.com"; // User can change this later

const ProtectedRoute = ({ children }) => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();

    if (!isLoaded) return null;

    return (
        <>
            <SignedIn>
                {user?.primaryEmailAddress?.emailAddress === AUTHORIZED_ADMIN ? (
                    children
                ) : (
                    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f3f4f6] p-4">
                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-lg w-full text-center border border-gray-100">
                            <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-rose-100">
                                <ShieldAlert size={48} />
                            </div>
                            <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Access Restricted</h2>
                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                You are signed in as <span className="font-bold text-gray-900">{user?.primaryEmailAddress?.emailAddress}</span>, but this portal is locked to the designated school administrator.
                            </p>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-8 text-left">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Authorized Admin Email:</p>
                                <p className="text-sm font-bold text-emerald-600 truncate">{AUTHORIZED_ADMIN}</p>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="w-full py-4 bg-[#064e3b] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-xl shadow-emerald-900/20"
                                >
                                    Return to Home
                                </button>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full py-4 bg-transparent text-gray-400 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                                >
                                    <LogOut size={16} />
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
};

export default ProtectedRoute;
