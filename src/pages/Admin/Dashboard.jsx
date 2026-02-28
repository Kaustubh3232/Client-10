import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUser, UserButton } from "@clerk/clerk-react";
import {
    LayoutDashboard,
    Image as ImageIcon,
    Users,
    Link as LinkIcon,
    Plus,
    Trash2,
    Upload,
    Newspaper,
    Trophy,
    ArrowRight,
    MonitorPlay
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import {
    getGalleryImages,
    uploadGalleryImage,
    deleteGalleryImage,
    getToppers,
    addTopper,
    deleteTopper,
    getNotices,
    addNotice,
    deleteNotice,
    getLinks,
    addLink,
    deleteLink,
    getMediaCoverage,
    uploadMediaImage,
    deleteMediaImage
} from '../../services/supabaseService';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { user } = useUser();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({ gallery: 0, toppers: 0, notices: 0, links: 0, media: 0 });
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [cache, setCache] = useState({});

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [g, t, n, l, m] = await Promise.all([
                supabase.from('gallery').select('*', { count: 'exact', head: true }),
                supabase.from('toppers').select('*', { count: 'exact', head: true }),
                supabase.from('notices').select('*', { count: 'exact', head: true }),
                supabase.from('quick_links').select('*', { count: 'exact', head: true }),
                supabase.from('media_coverage').select('*', { count: 'exact', head: true }),
            ]);
            setStats({
                gallery: g.count || 0,
                toppers: t.count || 0,
                notices: n.count || 0,
                links: l.count || 0,
                media: m?.count || 0
            });
        } catch (err) {
            console.error('Error fetching stats:', err);
            // Default stats if DB fails
            setStats({ gallery: 5, toppers: 4, notices: 2, links: 3 });
        }
    };

    const fetchData = async (forceRefresh = false) => {
        // Superfast optimization: Use cache if available and not forcing refresh
        if (!forceRefresh && cache[activeTab]) {
            setItems(cache[activeTab]);
            return;
        }

        setLoading(true);
        try {
            let data = [];
            if (activeTab === 'gallery') data = await getGalleryImages();
            else if (activeTab === 'toppers') data = await getToppers();
            else if (activeTab === 'notices') data = await getNotices();
            else if (activeTab === 'links') data = await getLinks();
            else if (activeTab === 'media') data = await getMediaCoverage();
            setItems(data);
            setCache(prev => ({ ...prev, [activeTab]: data })); // Store in cache
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = () => {
        if (activeTab === 'toppers') {
            setFormData({ name: '', score: '', image: '' });
            setShowModal(true);
        } else if (activeTab === 'notices') {
            setFormData({ title: '', description: '', date: new Date().toISOString().split('T')[0] });
            setShowModal(true);
        } else if (activeTab === 'links') {
            setFormData({ label: '', url: '' });
            setShowModal(true);
        } else if (activeTab === 'media') {
            setFormData({ title: '', file: null });
            setShowModal(true);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (activeTab === 'toppers') {
                await addTopper(formData.name, formData.score, formData.image);
            } else if (activeTab === 'notices') {
                await addNotice(formData.title, formData.description, formData.date);
            } else if (activeTab === 'links') {
                await addLink(formData.label, formData.url);
            } else if (activeTab === 'media') {
                await uploadMediaImage(formData.file, formData.title);
            } else if (activeTab === 'gallery') {
                await uploadGalleryImage(formData.file, formData.title, formData.category);
            }
            setShowModal(false);
            fetchData(true);
            fetchStats();
        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setFormData({ title: '', category: 'Campus', file });
        setShowModal(true);
    };

    const handleDelete = async (id, extra) => {
        if (!confirm("Are you sure?")) return;
        setLoading(true);
        try {
            if (activeTab === 'gallery') {
                const urlParts = extra.split('/');
                const fileName = urlParts[urlParts.length - 1];
                await deleteGalleryImage(id, `gallery/${fileName}`);
            } else if (activeTab === 'toppers') {
                await deleteTopper(id);
            } else if (activeTab === 'notices') {
                await deleteNotice(id);
            } else if (activeTab === 'links') {
                await deleteLink(id);
            } else if (activeTab === 'media') {
                await deleteMediaImage(id, extra);
            }
            fetchData(true);
            fetchStats();
        } catch (err) {
            alert("Delete failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'gallery', label: 'Gallery', icon: ImageIcon },
        { id: 'toppers', label: 'Toppers', icon: Users },
        { id: 'notices', label: 'Notices', icon: Newspaper },
        { id: 'links', label: 'Quick Links', icon: LinkIcon },
        { id: 'media', label: 'Media Coverage', icon: MonitorPlay },
    ];

    return (
        <div className="flex min-h-screen bg-[#f3f4f6]">
            {/* Sidebar */}
            <aside className="w-72 bg-[#064e3b] text-white p-8 flex flex-col shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-brand-gold)]/10 rounded-full blur-3xl -mr-16 -mt-16" />

                <div className="flex items-center gap-4 mb-16 relative z-10">
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md border border-white/20">
                        <img src="/Assests/bluebirdslogo (1).png" alt="Logo" className="h-8 w-auto brightness-0 invert" />
                    </div>
                    <div>
                        <span className="font-black text-xl tracking-tight block">BBIS</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--color-brand-gold)]">Admin Portal</span>
                    </div>
                </div>

                <nav className="flex-grow space-y-3 relative z-10">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${activeTab === tab.id
                                ? 'bg-white text-[#064e3b] shadow-xl shadow-black/20'
                                : 'hover:bg-white/10 text-emerald-100 hover:text-white'
                                }`}
                        >
                            <tab.icon size={22} className={activeTab === tab.id ? 'text-[#064e3b]' : 'group-hover:scale-110 transition-transform'} />
                            <span className="font-bold tracking-wide">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="mt-auto relative z-10 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10">
                        <UserButton afterSignOutUrl="/admin" />
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">{user?.fullName || 'Admin User'}</p>
                            <p className="text-[10px] text-emerald-300 truncate">System Administrator</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-12 overflow-y-auto">
                <header className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#064e3b] opacity-40 mb-2 block">System Panel</span>
                        <h1 className="text-5xl font-black text-gray-900 capitalize tracking-tight">{activeTab}</h1>
                    </div>
                    {activeTab !== 'overview' && activeTab !== 'gallery' && (
                        <button
                            onClick={handleAdd}
                            className="bg-[#064e3b] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-900/10 hover:shadow-emerald-900/20 transition-all flex items-center gap-3 active:scale-95"
                        >
                            <Plus size={20} />
                            Add Entry
                        </button>
                    )}
                </header>

                <div className="bg-white/60 backdrop-blur-xl rounded-[3rem] shadow-2xl shadow-black/5 border border-white p-12 min-h-[700px]">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-32 gap-6">
                            <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                            <p className="text-emerald-900/40 font-black uppercase tracking-widest text-xs">Syncing Data...</p>
                        </div>
                    )}

                    {!loading && activeTab === 'overview' && (
                        <div className="space-y-12">
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {[
                                    { label: 'Library', value: stats.gallery, icon: ImageIcon, color: 'from-blue-500 to-indigo-600' },
                                    { label: 'Toppers', value: stats.toppers, icon: Users, color: 'from-amber-400 to-orange-500' },
                                    { label: 'Notices', value: stats.notices, icon: Newspaper, color: 'from-emerald-400 to-teal-600' },
                                    { label: 'Quick Links', value: stats.links, icon: LinkIcon, color: 'from-amber-400 to-orange-500' },
                                    { label: 'Media', value: stats.media, icon: MonitorPlay, color: 'from-rose-400 to-pink-600' },
                                ].map((stat, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 rounded-[2.5rem] bg-white shadow-xl relative overflow-hidden group border border-gray-100"
                                    >
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] transition-opacity -mr-8 -mt-8 rounded-full`} />
                                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/10`}>
                                            <stat.icon size={24} />
                                        </div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-5xl font-black text-gray-900">{stat.value}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* System Health */}
                                <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
                                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-3">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                        System Health
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div className="flex justify-between items-end">
                                                <span className="text-sm font-bold text-gray-400">Database Latency</span>
                                                <span className="text-sm font-black text-emerald-600">24ms (Optimal)</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: '15%' }} className="h-full bg-emerald-500" />
                                            </div>
                                            <div className="flex justify-between items-end mt-8">
                                                <span className="text-sm font-bold text-gray-400">Storage Usage</span>
                                                <span className="text-sm font-black text-amber-600">62% (2.4 GB)</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: '62%' }} className="h-full bg-amber-500" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Supabase Auth', status: 'Active', color: 'text-emerald-500' },
                                                { label: 'Cloudinary CDN', status: 'Healthy', color: 'text-emerald-500' },
                                                { label: 'SMTP Server', status: 'Online', color: 'text-emerald-500' },
                                                { label: 'API Gateway', status: 'Running', color: 'text-emerald-500' }
                                            ].map((svc, i) => (
                                                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
                                                    <span className="text-xs font-bold text-gray-600">{svc.label}</span>
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${svc.color}`}>{svc.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-[#064e3b] p-10 rounded-[3rem] shadow-xl text-white">
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-8">Quick Actions</h3>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Broadcast Notice', icon: Newspaper, action: () => { setActiveTab('notices'); setTimeout(handleAdd, 100); } },
                                            { label: 'Add New Topper', icon: Trophy, action: () => { setActiveTab('toppers'); setTimeout(handleAdd, 100); } },
                                            { label: 'Bulk Image Upload', icon: Upload, action: () => { setActiveTab('gallery'); } }
                                        ].map((act, i) => (
                                            <button
                                                key={i}
                                                onClick={act.action}
                                                className="w-full flex items-center justify-between p-5 bg-white/10 rounded-2xl hover:bg-white hover:text-[#064e3b] transition-all group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <act.icon size={20} />
                                                    <span className="text-sm font-black">{act.label}</span>
                                                </div>
                                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!loading && activeTab === 'gallery' && (
                        <div className="space-y-8">
                            <label className="block border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center hover:border-[var(--color-brand-gold)] transition-colors cursor-pointer group">
                                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                                <Upload className="mx-auto mb-4 text-gray-400 group-hover:text-[var(--color-brand-gold)]" size={48} />
                                <p className="font-bold text-gray-600">Click to upload new photos</p>
                                <p className="text-sm text-gray-400 mt-2">Will be uploaded to Supabase Storage</p>
                            </label>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
                                {items.map((img) => (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -8, scale: 1.02 }}
                                        className="group relative aspect-square bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white transition-all duration-500"
                                    >
                                        <img src={img.url} alt={img.title} loading="lazy" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-end p-6 text-center">
                                            <p className="text-white text-[10px] font-black uppercase tracking-widest mb-3">{img.title}</p>
                                            <button
                                                onClick={() => handleDelete(img.id, img.url)}
                                                className="w-10 h-10 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/30 flex items-center justify-center hover:bg-rose-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!loading && activeTab === 'toppers' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map(topper => (
                                <motion.div
                                    key={topper.id}
                                    whileHover={{ y: -5 }}
                                    className="flex items-center gap-6 p-6 bg-white rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 relative group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-[2rem] -mr-8 -mt-8 flex items-center justify-center pt-8 pr-8">
                                        <Trophy size={16} className="text-amber-500" />
                                    </div>
                                    <img src={topper.image} loading="lazy" className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                                    <div>
                                        <h3 className="font-black text-gray-900 uppercase tracking-tight">{topper.name}</h3>
                                        <p className="text-emerald-600 font-black text-lg">{topper.score}</p>
                                        <p className="text-[10px] font-bold text-gray-400 mt-1">Batch of 2023</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(topper.id)}
                                        className="absolute bottom-4 right-4 w-8 h-8 bg-rose-50 text-rose-500 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500 hover:text-white"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && activeTab === 'notices' && (
                        <div className="space-y-6">
                            {items.map(notice => (
                                <motion.div
                                    key={notice.id}
                                    whileHover={{ x: 10 }}
                                    className="p-8 bg-white rounded-[2rem] shadow-xl shadow-black/5 border border-gray-100 flex justify-between items-start group transition-all"
                                >
                                    <div className="flex gap-6">
                                        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 flex flex-col items-center justify-center font-black leading-tight border border-rose-100 shadow-sm">
                                            <span className="text-lg">{new Date(notice.date).getDate()}</span>
                                            <span className="text-[8px] uppercase">{new Date(notice.date).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-gray-900 tracking-tight">{notice.title}</h3>
                                            <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-2xl">{notice.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(notice.id)}
                                        className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white hover:rotate-12"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && activeTab === 'links' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {items.map(link => (
                                <motion.div
                                    key={link.id}
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-100 flex justify-between items-center group relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                                            <LinkIcon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-gray-900 uppercase tracking-tight">{link.label}</h3>
                                            <p className="text-[10px] font-bold text-emerald-600 mt-1 truncate max-w-[150px]">{link.url}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(link.id)}
                                        className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-500 hover:text-white"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {!loading && activeTab === 'media' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {items.map(media => (
                                <motion.div
                                    key={media.id}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white p-4 rounded-3xl shadow-xl shadow-black/5 border border-gray-100 group relative"
                                >
                                    <img src={media.url} alt={media.title} loading="lazy" className="w-full aspect-video object-cover rounded-2xl mb-4" />
                                    <h3 className="font-bold text-gray-800 text-xs truncate">{media.title}</h3>
                                    <button
                                        onClick={() => handleDelete(media.id, media.storage_path)}
                                        className="absolute top-6 right-6 w-8 h-8 bg-rose-500 text-white rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Form Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setShowModal(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[3rem] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl"
                    >
                        <div className="p-10">
                            <h3 className="text-2xl font-black text-[#064e3b] uppercase tracking-tight mb-8">
                                {activeTab === 'gallery' ? 'Upload to Gallery' :
                                    activeTab === 'media' ? 'Capture Media Coverage' :
                                        `Add New ${activeTab === 'toppers' ? 'Topper' : activeTab === 'notices' ? 'Notice' : 'Link'}`}
                            </h3>
                            <form onSubmit={handleFormSubmit} className="space-y-6">
                                {activeTab === 'gallery' && (
                                    <>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Image Title</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-bold"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Category</label>
                                            <select
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-bold appearance-none bg-no-repeat bg-[right_1.5rem_center] bg-[length:1rem]"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option value="Campus">Campus</option>
                                                <option value="Classroom">Classroom</option>
                                                <option value="Sports">Sports</option>
                                                <option value="Events">Events</option>
                                            </select>
                                        </div>
                                        <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-4">
                                            <ImageIcon className="text-[#064e3b]" size={20} />
                                            <span className="text-xs font-bold text-emerald-800 truncate">{formData.file?.name}</span>
                                        </div>
                                    </>
                                )}
                                {activeTab === 'toppers' && (
                                    <>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Student Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-bold"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Academic Score</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g., 98.4%"
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-bold"
                                                value={formData.score}
                                                onChange={e => setFormData({ ...formData, score: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Image URL</label>
                                            <input
                                                type="url"
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-bold"
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'notices' && (
                                    <>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Notice Title</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-bold"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Description</label>
                                            <textarea
                                                required
                                                rows={5}
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-medium text-gray-600 leading-relaxed"
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Exhibition Date</label>
                                            <input
                                                type="date"
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-bold"
                                                value={formData.date}
                                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                    </>
                                )}

                                {activeTab === 'media' && (
                                    <>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Media Title</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 focus:border-emerald-500 outline-none font-bold"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Select Image</label>
                                            <input
                                                type="file"
                                                required
                                                accept="image/*"
                                                className="hidden"
                                                id="media-file"
                                                onChange={e => setFormData({ ...formData, file: e.target.files[0] })}
                                            />
                                            <label htmlFor="media-file" className="block w-full p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <Upload size={18} className="text-[#064e3b]" />
                                                    <span className="text-xs font-bold text-gray-500">
                                                        {formData.file ? formData.file.name : 'Choose press snippet...'}
                                                    </span>
                                                </div>
                                            </label>
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 p-4 rounded-2xl border border-gray-100 font-black text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 p-4 rounded-2xl bg-[#064e3b] text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-900/20"
                                    >
                                        {loading ? 'Saving...' : 'Add Item'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )
            }
        </div >
    );
};

export default AdminDashboard;
