import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="py-24 bg-[var(--color-brand-slate)] relative overflow-hidden">
            {/* Background pattern/element */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                <div className="w-full h-full bg-[var(--color-brand-emerald)] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] bg-white rounded-3xl p-8 shadow-2xl shadow-emerald-900/5 flex items-center justify-center">
                            <img
                                src="/Assests/bluebirdslogo (1).png"
                                alt="Blue Bird International School"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        <div className="mt-8 p-6 bg-[var(--color-brand-emerald)] rounded-2xl text-white">
                            <h3 className="text-2xl font-black mb-2">Blue Bird's International School</h3>
                            <p className="text-sm opacity-80 uppercase tracking-widest font-medium">Adarsh Bazar, Ghazipur, U.P 233001</p>
                            <div className="mt-4 flex flex-col gap-1 text-xs font-bold text-[var(--color-brand-gold)]">
                                <p>Affiliated to CBSE, New Delhi</p>
                                <p>Affiliation Number - 2132663, School Code - 70460</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 font-heading leading-tight">
                            About <span className="text-[var(--color-brand-emerald)]">Blue Bird International School</span>
                        </h1>

                        <div className="space-y-6 text-gray-600 font-body leading-loose text-lg font-light">
                            <p>
                                Blue Bird's International school was established in 2013, by two great visionaries and dedicated educationists Mr. Sushil kumar mishra and Mr. Sandeep mishra. The CBSE affiliated Co-educational Senior Secondary School run by the Blue bird's international school trust.
                            </p>
                            <p>
                                At BBIS, standards of pedology are high and learning is marked by a sense of adventure. Our curriculum facilitates the process of discovery through an inter-active teaching-learning process where the freedom to question becomes the nucleus of learning in a classroom.
                            </p>
                            <p>
                                A team of highly qualified, experienced and dedicated facilitators of learning make education a fun-filled process where students explore a plethora of exciting subjects through active participation in indoor and outdoor activities. The school assists learners in imbibing and preserving the rich age-old culture and heritage of India while striving to make them confident, competent and contributory global citizens.
                            </p>
                        </div>

                        <button className="mt-12 emerald-btn flex items-center gap-3 group">
                            Read More <span className="group-hover:translate-x-2 transition-transform">&raquo;</span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
