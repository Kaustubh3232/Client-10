import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { UserButton, useUser, SignedIn, SignedOut } from '@clerk/clerk-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();

    return (
        <nav className="glass-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex-shrink-0 flex items-center gap-3"
                    >
                        <img className="h-12 w-auto" src="/Assests/bluebirdslogo (1).png" alt="Blue Bird International School Logo" />
                        <span className="text-xl font-bold tracking-tight text-[var(--color-brand-emerald)] hidden sm:block">
                            BLUE BIRD INTERNATIONAL SCHOOL
                        </span>
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'About', 'Admission', 'Gallery', 'Disclosure', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : item === 'Disclosure' ? '/public-disclosure' : `/${item.toLowerCase()}`}
                                className="text-sm font-medium text-gray-700 hover:text-[var(--color-brand-emerald)] transition-colors"
                            >
                                {item === 'Disclosure' ? 'Mandatory Disclosure' : item}
                            </Link>
                        ))}

                        <SignedIn>
                            <Link to="/admin/dashboard" className="text-[var(--color-brand-emerald)] hover:bg-emerald-50 p-2 rounded-xl transition-all flex items-center gap-2">
                                <LayoutDashboard size={18} />
                                <span className="font-bold">Dashboard</span>
                            </Link>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>

                        <SignedOut>
                            <Link to="/admin" className="emerald-btn">
                                Admin Login
                            </Link>
                        </SignedOut>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-[var(--color-brand-emerald)]"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-2"
                >
                    {['Home', 'About', 'Admission', 'Gallery', 'Disclosure', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : item === 'Disclosure' ? '/public-disclosure' : `/${item.toLowerCase()}`}
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            {item === 'Disclosure' ? 'Mandatory Disclosure' : item}
                        </Link>
                    ))}

                    <SignedIn>
                        <Link
                            to="/admin/dashboard"
                            className="block px-3 py-2 text-base font-bold text-[var(--color-brand-emerald)] hover:bg-emerald-50 rounded-lg"
                            onClick={() => setIsOpen(false)}
                        >
                            Dashboard
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <Link
                            to="/admin"
                            className="block w-full text-center emerald-btn mt-4"
                            onClick={() => setIsOpen(false)}
                        >
                            Admin Login
                        </Link>
                    </SignedOut>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
