import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative bg-[#064e3b] pt-32 pb-12 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.02] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[var(--color-brand-gold)] opacity-[0.02] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black font-heading text-white leading-tight">
                                BLUE BIRD <br />
                                <span className="text-[var(--color-brand-gold)]">INTERNATIONAL SCHOOL</span>
                            </h2>
                            <p className="text-emerald-100/60 max-w-sm text-sm font-medium leading-relaxed">
                                Empowering minds and nurturing spirits in a premium learning environment dedicated to excellence and holistic growth since 1998.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.1)' }}
                                    className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-white transition-all"
                                >
                                    <Icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-white font-black uppercase tracking-widest text-xs">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { label: 'About Us', path: '/about' },
                                { label: 'Admissions', path: '/admission' },
                                { label: 'Visual Gallery', path: '/gallery' },
                                { label: 'Public Disclosure', path: '/public-disclosure' },
                                { label: 'Contact Us', path: '/contact' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link to={link.path} className="text-emerald-100/50 hover:text-[var(--color-brand-gold)] text-sm font-bold transition-all flex items-center gap-2 group">
                                        <ArrowRight size={12} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-2 space-y-8">
                        <h4 className="text-white font-black uppercase tracking-widest text-xs">Reach Us</h4>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-[var(--color-brand-gold)] shrink-0 mt-1" />
                                <span className="text-emerald-100/50 text-sm font-medium">123 Education Lane, Knowledge City, GZP 233001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-[var(--color-brand-gold)] shrink-0" />
                                <span className="text-emerald-100/50 text-sm font-medium">+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-[var(--color-brand-gold)] shrink-0" />
                                <span className="text-emerald-100/50 text-sm font-medium">info@bluebirds.edu.in</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-3 space-y-8">
                        <h4 className="text-white font-black uppercase tracking-widest text-xs">Newsletter</h4>
                        <div className="space-y-4">
                            <p className="text-emerald-100/40 text-xs font-bold leading-relaxed">Subscribe to get the latest updates and announcements.</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white text-sm focus:outline-none focus:border-[var(--color-brand-gold)] transition-all"
                                />
                                <button className="absolute right-2 top-2 bottom-2 bg-[var(--color-brand-gold)] text-[#064e3b] px-4 rounded-xl font-black text-xs uppercase tracking-tighter hover:bg-white transition-all">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-emerald-100/20 text-xs font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} Blue Bird International School. Developed for Excellence.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-emerald-100/20">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
