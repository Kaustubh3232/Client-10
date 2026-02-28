import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-20 pb-24 bg-white">
            {/* Hero Header */}
            <section className="relative py-24 bg-[var(--color-brand-emerald)] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="md:w-1/2">
                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl md:text-7xl font-black text-white font-heading leading-tight"
                        >
                            Let's Start a <br />
                            <span className="text-[var(--color-brand-gold)]">Conversation</span>
                        </motion.h1>
                        <p className="mt-6 text-emerald-100 text-lg font-body max-w-lg">
                            Have questions or want to visit our campus? Our dedicated team is here to assist you with everything you need.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:w-1/2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10" />
                        ))}
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 -skew-x-12 transform translate-x-24" />
            </section>

            {/* Info Cards */}
            <section className="max-w-7xl mx-auto px-4 -mt-12 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: MapPin, title: "Our Location", detail: "123 Education Lane, Knowledge City, GZP", sub: "Uttar Pradesh, India" },
                        { icon: Phone, title: "Call Us", detail: "+91 98765 43210", sub: "Mon-Sat: 9am to 6pm" },
                        { icon: Mail, title: "Email Us", detail: "info@bluebirds.com", sub: "admissions@bluebirds.com" },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-gray-200 border border-gray-100"
                        >
                            <div className="w-14 h-14 bg-emerald-50 text-[var(--color-brand-emerald)] rounded-2xl flex items-center justify-center mb-6">
                                <item.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{item.title}</h3>
                            <p className="text-gray-800 font-bold font-body">{item.detail}</p>
                            <p className="text-gray-500 text-sm mt-1">{item.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Map & Form */}
            <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-12">
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 font-heading mb-6 tracking-tight">Visit Our Campus</h2>
                        <p className="text-gray-600 font-body leading-relaxed max-w-xl">
                            Experience the premium learning atmosphere firsthand. We organize campus tours every Wednesday and Friday. Please schedule your visit in advance.
                        </p>
                    </div>

                    <div className="aspect-video bg-gray-100 rounded-[3rem] overflow-hidden relative shadow-2xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115161.4285810051!2d83.50428453670119!3d25.5784384918512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39903939eb9f8715%3A0xc3f58849b2c3664d!2sGhazipur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Blue Bird International School Location"
                        ></iframe>
                    </div>

                    <div className="flex items-center gap-6 p-8 bg-[var(--color-brand-slate)] rounded-3xl">
                        <Clock className="text-[var(--color-brand-emerald)]" size={40} />
                        <div>
                            <h4 className="font-bold text-gray-900">Visiting Hours</h4>
                            <p className="text-gray-600 text-sm">Everyday: 08:30 AM - 04:30 PM (Sun: Closed)</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-50 relative">
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-[var(--color-brand-gold)] rotate-12 rounded-3xl -z-10 opacity-20" />
                    <h2 className="text-3xl font-bold text-[var(--color-brand-emerald)] font-heading mb-10">Send a Message</h2>
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <input type="text" placeholder="First Name" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none" />
                            <input type="text" placeholder="Last Name" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none" />
                        </div>
                        <input type="email" placeholder="Email Address" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none" />
                        <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none">
                            <option>General Inquiry</option>
                            <option>Admissions</option>
                            <option>Careers</option>
                        </select>
                        <textarea rows="5" placeholder="Your Message" className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[var(--color-brand-emerald)] outline-none resize-none"></textarea>
                        <button className="gold-btn w-full py-5 text-lg font-black flex items-center justify-center gap-3">
                            Send Message <Send size={20} />
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Contact;
