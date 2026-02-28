import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Image as ImageIcon, Newspaper, ArrowRight, Sparkles, MonitorPlay } from 'lucide-react';
import { getToppers, getNotices, getMediaCoverage } from '../../services/supabaseService';
import StatsCounter from '../../components/common/StatsCounter';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const sectionsRef = useRef([]);
    const [toppers, setToppers] = useState([]);
    const [notices, setNotices] = useState([]);
    const [mediaCoverage, setMediaCoverage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let finalToppers = [
                { name: "Siddharth Singh", score: "98.4%", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop" },
                { name: "Ananya Mishra", score: "97.6%", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop" },
                { name: "Aryan Kumar", score: "96.8%", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" }
            ];

            let finalNotices = [
                { title: "Admission Open for Session 2024-25", description: "Online enquiries are now open for all grades. Visit the admission page to apply.", date: new Date().toISOString() },
                { title: "CBSE Mandatory Disclosure Updated", description: "Our public disclosure documents have been updated for the current academic year.", date: new Date().toISOString() },
                { title: "Annual Examination Schedule", description: "The final exams will commence from March 20th. Detailed schedule on dashboard.", date: new Date().toISOString() }
            ];

            try {
                const [toppersData, noticesData, mediaData] = await Promise.all([
                    getToppers().catch(() => null),
                    getNotices().catch(() => null),
                    getMediaCoverage().catch(() => [])
                ]);

                if (toppersData && toppersData.length > 0) finalToppers = toppersData;
                if (noticesData && noticesData.length > 0) finalNotices = noticesData;
                if (mediaData) setMediaCoverage(mediaData);
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                setToppers(finalToppers);
                setNotices(finalNotices);
                setLoading(false);
            }
        };

        fetchData();

        // Hero Text Animation
        gsap.from(".hero-title", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.2
        });

        // Section Animations
        sectionsRef.current.forEach((section, i) => {
            if (section) {
                gsap.set(section, { opacity: 0, y: 50 }); // Set initial state
                gsap.to(section, {
                    scrollTrigger: {
                        trigger: section,
                        start: "top 90%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out"
                });
            }
        });
    }, []);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <motion.img
                        style={{ y }}
                        src="/Assests/slider1 (1).jpg"
                        alt="School Exterior"
                        className="w-full h-full object-cover scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
                </div>

                <div className="text-center z-10 px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-[var(--color-brand-gold)] bg-white/10 backdrop-blur-md border border-white/20 rounded-full uppercase">
                            Welcome to Excellence
                        </span>
                    </motion.div>
                    <h1 className="hero-title text-6xl md:text-8xl font-black text-white mb-8 font-heading leading-tight drop-shadow-2xl">
                        Blue Bird <br />
                        <span className="text-[var(--color-brand-gold)]">International School</span>
                    </h1>
                    <p className="hero-title text-xl text-white/90 max-w-2xl mx-auto mb-12 font-body font-medium drop-shadow-lg">
                        An institution dedicated to academic brilliance, holistic growth, and character building in a premium learning environment.
                    </p>
                    <div className="hero-title flex flex-col sm:flex-row justify-center gap-6 mt-8">
                        <button className="bg-[var(--color-brand-gold)] hover:bg-amber-500 text-[#064e3b] px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-2xl shadow-black/40 flex items-center justify-center gap-3">
                            Apply Now <ArrowRight size={24} />
                        </button>
                        <button className="px-12 py-5 rounded-2xl border-4 border-white text-white font-black text-xl hover:bg-white hover:text-[#064e3b] backdrop-blur-md transition-all flex items-center justify-center shadow-2xl shadow-black/40">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Premium Toppers & Notices Section */}
            <section
                ref={(el) => (sectionsRef.current[0] = el)}
                className="py-32 bg-[#fdfaf5] relative overflow-hidden"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pollen.png")' }}
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-brand-emerald)] opacity-[0.02] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Toppers Column */}
                        <div className="lg:col-span-7 space-y-12">
                            <div className="text-left">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="text-[var(--color-brand-gold)] font-black uppercase tracking-[0.3em] text-xs mb-4 block"
                                >
                                    Academic Excellence
                                </motion.span>
                                <h2 className="text-5xl font-black text-[#1a3a2a] leading-tight font-heading">
                                    Our Distinguished <br />
                                    <span className="text-[var(--color-brand-emerald)]">Hall of Fame</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                {toppers.length > 0 ? toppers.slice(0, 3).map((topper, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -15 }}
                                        className="relative group h-[350px] rounded-[2.5rem] overflow-hidden shadow-2xl"
                                    >
                                        <img src={topper.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={topper.name} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a2a] via-transparent to-transparent opacity-90" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <p className="text-[var(--color-brand-gold)] font-black text-2xl mb-1">{topper.score}</p>
                                            <h3 className="text-white font-bold text-sm uppercase tracking-wider">{topper.name}</h3>
                                        </div>
                                    </motion.div>
                                )) : [...Array(3)].map((_, i) => (
                                    <div key={i} className="h-[350px] rounded-[2.5rem] bg-emerald-900/5 animate-pulse" />
                                ))}
                            </div>
                        </div>

                        {/* Notice Column */}
                        <div className="lg:col-span-12 xl:col-span-5">
                            <div className="bg-white rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-emerald-50 overflow-hidden h-full flex flex-col">
                                <div className="bg-[#1a3a2a] p-10 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                                    <div className="flex justify-between items-center relative z-10">
                                        <h3 className="text-2xl font-black uppercase tracking-tighter">Announcements</h3>
                                        <Newspaper className="text-[var(--color-brand-gold)]" size={28} />
                                    </div>
                                </div>
                                <div className="flex-grow p-4 lg:p-8 space-y-4 overflow-y-auto max-h-[600px] custom-scrollbar">
                                    {notices.length > 0 ? notices.map((notice, i) => (
                                        <motion.button
                                            key={i}
                                            whileHover={{ x: 10, backgroundColor: '#f0fdf4' }}
                                            onClick={() => setSelectedNotice(notice)}
                                            className="w-full text-left p-6 rounded-3xl border border-transparent hover:border-emerald-100 transition-all group flex items-start gap-5"
                                        >
                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex flex-col items-center justify-center shrink-0 border border-emerald-100 group-hover:bg-[#1a3a2a] group-hover:text-white transition-colors capitalize">
                                                <span className="text-lg font-black">{new Date(notice.date).getDate()}</span>
                                                <span className="text-[8px] font-bold uppercase">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</span>
                                            </div>
                                            <div className="flex-grow overflow-hidden">
                                                <h4 className="font-black text-[#1a3a2a] text-sm group-hover:text-[var(--color-brand-emerald)] transition-colors truncate">{notice.title}</h4>
                                                <p className="text-gray-400 text-[10px] mt-1 font-bold uppercase tracking-widest">Click to Read More</p>
                                            </div>
                                        </motion.button>
                                    )) : (
                                        <div className="text-center py-20">
                                            <p className="text-gray-300 font-black uppercase tracking-widest text-xs">No active notices</p>
                                        </div>
                                    )}
                                </div>
                                <div className="p-8 bg-emerald-50/30 text-center">
                                    <button className="text-[var(--color-brand-emerald)] font-black text-xs uppercase tracking-widest hover:tracking-[0.2em] transition-all">
                                        View All Archives
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notice Detail Modal */}
                <AnimatePresence>
                    {selectedNotice && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedNotice(null)}
                                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-white rounded-[3rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl"
                            >
                                <div className="p-10 lg:p-14">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex flex-col items-center justify-center border border-emerald-100 text-[#1a3a2a]">
                                                <span className="text-2xl font-black">{new Date(selectedNotice.date).getDate()}</span>
                                                <span className="text-[10px] font-black uppercase tracking-tighter">
                                                    {new Date(selectedNotice.date).toLocaleString('default', { month: 'long' })}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-[var(--color-brand-gold)] font-black text-[10px] uppercase tracking-[0.2em]">Official Announcement</span>
                                                <h3 className="text-2xl font-black text-[#1a3a2a] leading-tight">{selectedNotice.title}</h3>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedNotice(null)}
                                            className="w-12 h-12 rounded-full hover:bg-emerald-50 flex items-center justify-center transition-colors -mt-4 -mr-4"
                                        >
                                            <Sparkles className="text-[#15803d]" size={24} />
                                        </button>
                                    </div>
                                    <div className="prose prose-emerald max-w-none">
                                        <p className="text-gray-600 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                                            {selectedNotice.description}
                                        </p>
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-emerald-50 flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#1a3a2a] flex items-center justify-center">
                                                <Newspaper size={14} className="text-white" />
                                            </div>
                                            <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Official Communication</span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedNotice(null)}
                                            className="bg-[#1a3a2a] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-900/20"
                                        >
                                            Close Notice
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </section>

            <StatsCounter />

            {/* Media Coverage Section */}
            <section
                ref={(el) => (sectionsRef.current[1] = el)}
                className="py-16 bg-white relative overflow-hidden"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pollen.png")' }}
            >
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black font-heading text-[#1a3a2a] mb-8 uppercase">
                        Media <span className="text-[var(--color-brand-emerald)]">Coverage</span>
                    </h2>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {mediaCoverage.length > 0 ? mediaCoverage.map((item, i) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-2 border border-gray-100 shadow-lg rounded-lg"
                            >
                                <img src={item.url} alt={item.title} className="w-full h-auto object-contain rounded" />
                                <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">{item.title}</p>
                            </motion.div>
                        )) : (
                            [1, 2, 3, 4].map((_, i) => (
                                <div key={i} className="aspect-video bg-gray-50 rounded-lg animate-pulse" />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
