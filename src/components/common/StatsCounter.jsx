import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const StatItem = ({ value, label, suffix = "", prefix = "" }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = parseInt(value);
            if (start === end) return;

            let totalMiliseconds = 2000;
            let incrementTime = (totalMiliseconds / end);

            let timer = setInterval(() => {
                start += 1;
                setDisplayValue(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="text-center p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
            <h3 className="text-5xl md:text-7xl font-black text-[var(--color-brand-gold)] mb-4 font-heading">
                {prefix}{displayValue}{suffix}
            </h3>
            <p className="text-white/60 text-lg font-black uppercase tracking-widest">{label}</p>
        </div>
    );
};

const StatsCounter = () => {
    return (
        <section className="py-32 bg-[#064e3b] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-brand-gold)] rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatItem value="14" label="Years of Excellence" suffix="+" />
                    <StatItem value="600" label="Brilliant Alumni" suffix="+" />
                    <StatItem value="19" label="Expert Teachers" suffix="+" />
                    <StatItem value="100" label="Board Results" suffix="%" />
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
