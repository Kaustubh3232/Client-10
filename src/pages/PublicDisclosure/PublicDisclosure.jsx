import { motion } from 'framer-motion';
import { Download, FileText, Users, Award, BookOpen } from 'lucide-react';

const PublicDisclosure = () => {
    const sections = [
        {
            id: 'general',
            title: 'A. General Information',
            icon: BookOpen,
            data: [
                { label: 'NAME OF SCHOOL', value: "Blue Bird's International school" },
                { label: 'AFFILIATION NUMBER', value: '2132663' },
                { label: 'SCHOOL CODE', value: '70460' },
                { label: 'COMPLETE ADDRESS WITH PIN CODE', value: 'Adarsh Bazar, Ghazipur Uttar Pradesh-233001' },
                { label: 'PRINCIPAL NAME', value: 'Mr. Ram Prakash Singh' },
                { label: 'SCHOOL EMAIL ID', value: '70460@cbseshiksha.in' },
                { label: 'CONTACT DETAILS (LANDLINE/MOBILE)', value: '9565035350, 8810808084' },
            ]
        },
        {
            id: 'docs',
            title: 'B. Documents and Information',
            icon: FileText,
            items: [
                { id: 1, label: 'Recognition BSA' },
                { id: 2, label: 'ADDITIONAL ROOMS' },
                { id: 3, label: 'RES NOC' },
                { id: 4, label: 'ADDITIONAL TEACHERS' },
                { id: 5, label: 'BUILDING SAFETY CERTIFICATE' },
                { id: 6, label: 'FIRE SERVICE _ UTTAR PRADESH' },
                { id: 7, label: 'Self-Certification' },
            ]
        },
        {
            id: 'results',
            title: 'C. Result and Academics',
            icon: Award,
            docs: [
                { id: 1, label: 'FEE STRUCTURE OF THE SCHOOL 2024-25' },
                { id: 2, label: 'RES ANNUAL CALENDAR 2023-24' },
                { id: 3, label: 'LIST OF SCHOOL MANAGEMENT COMMITTEE 2023-24' },
            ],
            tables: [
                {
                    grade: 'Class X',
                    data: [
                        { year: '2022', candidates: '93', passed: '87', percentage: '93.5', remark: '' }
                    ]
                },
                {
                    grade: 'Class XII',
                    data: [
                        { year: '2022', candidates: '21', passed: '19', percentage: '90.4', remark: '' }
                    ]
                }
            ]
        },
        {
            id: 'staff',
            title: 'D. Staff',
            icon: Users,
            data: [
                { label: 'NAME OF PRINCIPAL', value: 'Mr. Ram Prakash Singh Singh' },
                { label: 'TOTAL NO. OF TEACHERS', value: '33' },
                { label: 'TGT', value: '14' },
                { label: 'PGT', value: '11' },
                { label: 'PRT', value: '8' },
                { label: 'NTT', value: '1' },
                { label: 'TEACHERS SECTION RATIO', value: '1.5' },
                { label: 'DETAILS OF SPECIAL EDUCATOR', value: '-' },
                { label: 'DETAILS OF COUNSELLOR AND WELLNESS TEACHER', value: '-' },
            ]
        }
    ];

    return (
        <div className="pt-32 pb-40 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <div className="text-center mb-24">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[var(--color-brand-emerald)] font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                    >
                        Statutory Compliance
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-black text-gray-900 font-heading mb-6"
                    >
                        Mandatory <span className="text-[var(--color-brand-gold)]">Public Disclosure</span>
                    </motion.h1>
                    <p className="text-gray-500 max-w-2xl mx-auto font-body italic text-lg leading-relaxed">
                        In accordance with CBSE norms, we maintain transparency in our operations through regular public disclosures of our administrative and academic status.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-24">
                    {sections.map((section, sIdx) => (
                        <motion.section
                            key={section.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl shadow-gray-200 border border-gray-100 relative overflow-hidden"
                        >
                            <div className="flex items-center gap-6 mb-12">
                                <div className="w-16 h-16 bg-emerald-50 text-[var(--color-brand-emerald)] rounded-2xl flex items-center justify-center">
                                    <section.icon size={32} />
                                </div>
                                <h2 className="text-3xl font-black text-gray-900 font-heading uppercase tracking-tight">
                                    {section.title}
                                </h2>
                            </div>

                            {/* Info Table Style (General & Staff) */}
                            {section.data && (
                                <div className="grid grid-cols-1 gap-1">
                                    {section.data.map((item, idx) => (
                                        <div key={idx} className={`flex flex-col md:flex-row p-6 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border border-gray-100 rounded-2xl`}>
                                            <span className="md:w-1/3 font-black text-xs uppercase tracking-widest text-emerald-900 mb-2 md:mb-0">
                                                {item.label}
                                            </span>
                                            <span className="md:w-2/3 font-medium text-gray-700 italic">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Document List Style (B & C) */}
                            {(section.items || section.docs) && (
                                <div className="space-y-4">
                                    {(section.items || section.docs).map((doc, idx) => (
                                        <div key={doc.id} className="flex items-center justify-between p-6 bg-white border-2 border-dashed border-gray-100 rounded-3xl group hover:border-[var(--color-brand-gold)] transition-all">
                                            <div className="flex items-center gap-6">
                                                <span className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center font-black text-gray-400">
                                                    {doc.id}
                                                </span>
                                                <span className="font-bold text-gray-700 group-hover:text-[var(--color-brand-emerald)] transition-colors">
                                                    {doc.label}
                                                </span>
                                            </div>
                                            <button className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-[var(--color-brand-emerald)] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[var(--color-brand-gold)] hover:text-white transition-all">
                                                View / Download <Download size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Academic Results Table (C) */}
                            {section.tables && (
                                <div className="mt-16 space-y-12">
                                    {section.tables.map((table, tIdx) => (
                                        <div key={tIdx} className="overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-xl">
                                            <div className="bg-[var(--color-brand-emerald)] p-6 text-white font-black uppercase tracking-widest text-center">
                                                {table.grade}
                                            </div>
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-emerald-50/50">
                                                        <th className="p-6 font-black text-xs uppercase tracking-widest text-emerald-900 border-b border-gray-100">Year</th>
                                                        <th className="p-6 font-black text-xs uppercase tracking-widest text-emerald-900 border-b border-gray-100">No. of candidates</th>
                                                        <th className="p-6 font-black text-xs uppercase tracking-widest text-emerald-900 border-b border-gray-100">No. of students passed</th>
                                                        <th className="p-6 font-black text-xs uppercase tracking-widest text-emerald-900 border-b border-gray-100">Pass Percentage</th>
                                                        <th className="p-6 font-black text-xs uppercase tracking-widest text-emerald-900 border-b border-gray-100">Remark</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {table.data.map((row, rIdx) => (
                                                        <tr key={rIdx} className="hover:bg-gray-50 transition-colors">
                                                            <td className="p-6 font-bold text-gray-800">{row.year}</td>
                                                            <td className="p-6 text-gray-600">{row.candidates}</td>
                                                            <td className="p-6 text-gray-600">{row.passed}</td>
                                                            <td className="p-6 font-black text-[var(--color-brand-emerald)]">{row.percentage}%</td>
                                                            <td className="p-6 italic text-gray-400">{row.remark || 'N/A'}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublicDisclosure;
