import { SignedIn, SignedOut, RedirectToSignIn, useUser, useClerk } from "@clerk/clerk-react";
import { ShieldAlert, LogOut } from "lucide-react";

const ProtectedRoute = ({ children }) => {
    const { isLoaded } = useUser();

    if (!isLoaded) return null;

    return (
        <>
            <SignedIn>
                {children}
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    );
};

export default ProtectedRoute;
