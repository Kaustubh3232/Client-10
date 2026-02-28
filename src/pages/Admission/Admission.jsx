import { motion } from 'framer-motion';
import { FileText, CheckCircle, GraduationCap, ArrowRight } from 'lucide-react';

const Admission = () => {
    const steps = [
        { title: "Enquiry", desc: "Fill out the online enquiry form or visit our campus for initial information.", icon: FileText },
        { title: "Interaction", desc: "A brief interaction session with the student and parents to understand the alignment.", icon: Users },
        { title: "Registration", desc: "Complete the formal registration process with required documentation.", icon: GraduationCap },
        { title: "Admission", desc: "Confirmation of admission and completion of fee formalities.", icon: CheckCircle },
    ];

    return (
        <div className="pt-20 pb-24 bg-[var(--color-brand-slate)]">
            {/* Header */}
            <section className="py-20 bg-[var(--color-brand-emerald)] text-white text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-black font-heading mb-6"
                >
                    Join Our <span className="text-[var(--color-brand-gold)]">Community</span>
                </motion.h1>
                <p className="text-emerald-100 max-w-2xl mx-auto font-body text-lg">
                    Embark on a journey of excellence and holistic growth. We welcome students from all backgrounds.
                </p>
            </section>

            {/* Process Section */}
            <section className="max-w-7xl mx-auto px-4 -mt-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 text-center flex flex-col items-center"
                        >
                            <div className="w-16 h-16 bg-emerald-50 text-[var(--color-brand-emerald)] rounded-2xl flex items-center justify-center mb-6">
                                <step.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-heading">{step.title}</h3>
                            <p className="text-gray-500 text-sm font-body">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Form Section */}
            <section className="max-w-5xl mx-auto px-4 mt-32">
                <div className="premium-glass p-12 rounded-[3rem] shadow-2xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black text-[var(--color-brand-emerald)] font-heading">Online Enquiry</h2>
                        <p className="text-gray-500 mt-2 font-body italic">Complete the form below and our team will get back to you shortly.</p>
                    </div>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-2">Student's Full Name</label>
                            <input type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none bg-white/50" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-2">Parent/Guardian Name</label>
                            <input type="text" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none bg-white/50" placeholder="Jane Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-2">Email Address</label>
                            <input type="email" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none bg-white/50" placeholder="email@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-2">Phone Number</label>
                            <input type="tel" className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none bg-white/50" placeholder="+91 00000 00000" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-gray-700 ml-2">Applying for Grade</label>
                            <select className="w-full px-6 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none bg-white/50">
                                <option>Nursery</option>
                                <option>KG - 1st</option>
                                <option>Grade 1 - 5</option>
                                <option>Grade 6 - 10</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 text-center mt-6">
                            <button className="emerald-btn px-12 py-4 text-lg font-black group">
                                Submit Enquiry <ArrowRight size={24} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

const Users = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

export default Admission;
