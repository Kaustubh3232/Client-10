import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Maximize2, X } from 'lucide-react';
import { getGalleryImages } from '../../services/supabaseService';

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await getGalleryImages();

                // Fallback static data if DB is empty
                const finalImages = data?.length > 0 ? data : [
                    { title: "Smart Classroom", category: "Classroom", url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&fit=crop" },
                    { title: "Science Lab", category: "Campus", url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&fit=crop" },
                    { title: "Annual Sports 2023", category: "Sports", url: "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=800&fit=crop" },
                    { title: "Computer Lab", category: "Classroom", url: "https://images.unsplash.com/photo-1501503069356-3c6b82a17d89?w=800&fit=crop" },
                    { title: "Main Campus Building", category: "Campus", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&fit=crop" },
                    { title: "Student Graduation", category: "Events", url: "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=800&fit=crop" }
                ];

                setImages(finalImages);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    const categories = ["All", "Campus", "Classroom", "Sports", "Events"];
    const [activeCat, setActiveCat] = useState("All");

    const filteredImages = activeCat === "All"
        ? images
        : images.filter(img => img.category === activeCat);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    return (
        <div className="pt-32 pb-40 bg-[var(--color-brand-slate)]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-black text-[var(--color-brand-emerald)] font-heading mb-6"
                    >
                        Visual <span className="text-[var(--color-brand-gold)]">Chronicles</span>
                    </motion.h1>
                    <p className="text-gray-500 max-w-xl mx-auto font-body">
                        A window into the vibrant life, achievements, and beautiful moments captured at Blue Bird International School.
                    </p>
                </div>

                {/* Filter */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCat(cat)}
                            className={`px-8 py-3 rounded-2xl font-bold transition-all duration-500 ease-out ${activeCat === cat
                                ? 'bg-[var(--color-brand-emerald)] text-white shadow-xl shadow-emerald-600/30 -translate-y-1'
                                : 'bg-white text-gray-500 hover:bg-emerald-50 hover:text-emerald-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
                >
                    {filteredImages.map((img, idx) => (
                        <motion.div
                            key={img.id || idx}
                            variants={itemVariants}
                            layout
                            className="relative group cursor-pointer break-inside-avoid rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-4 border-white"
                            onClick={() => setSelectedImg(img)}
                        >
                            <div className="aspect-auto overflow-hidden">
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-auto object-cover transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-emerald)] via-[var(--color-brand-emerald)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10 transform translate-y-4 group-hover:translate-y-0 text-left">
                                <span className="text-[var(--color-brand-gold)] text-xs font-black uppercase tracking-widest mb-2 drop-shadow-md">{img.category}</span>
                                <h3 className="text-white text-2xl font-black font-heading mb-4 leading-tight drop-shadow-lg">{img.title}</h3>
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/30 shadow-2xl">
                                    <Maximize2 size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            {selectedImg && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImg(null)}
                >
                    <button className="absolute top-10 right-10 text-white hover:text-[var(--color-brand-gold)] transition-colors">
                        <X size={40} />
                    </button>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="max-w-5xl w-full h-[80vh] flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img src={selectedImg.url} alt={selectedImg.title} className="max-h-full max-w-full object-contain rounded-3xl" />
                        <h2 className="text-white mt-8 text-2xl font-bold font-heading">{selectedImg.title}</h2>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Gallery;
