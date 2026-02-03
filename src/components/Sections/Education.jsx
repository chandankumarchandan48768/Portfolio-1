import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { getData } from '../../services/api';

const Education = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                try {
                    const data = await getData('/education');
                    setItems(data);
                } catch {
                    // Mockup
                    setItems([
                        { _id: '1', institution: 'Sri Siddhartha Institute Of Technology', degree: 'B.E. Computer Science and Engineering', duration: '2022-2026', description: 'Specialized in Artificial Intelligence and Software Engineering. Graduated with Honors.' },
                        { _id: '2', institution: 'Tap Academy', degree: 'Full Stack Web Development', duration: '6-months', description: 'Intensive bootcamp focused on Java development.' }
                    ]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems();
    }, []);

    return (
        <section id="education-section" className="py-24 bg-black relative">
            <div className="absolute left-0 bottom-0 w-[30%] h-[30%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                        <GraduationCap size={16} />
                        Academic Journey
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
                    <p className="text-gray-400">My educational background and qualifications</p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 relative group"
                        >
                            <div className="absolute left-0 top-0 h-full w-1 bg-primary/0 group-hover:bg-primary transition-all duration-300 rounded-l-2xl"></div>
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.degree}</h3>
                                    <h4 className="text-lg text-gray-300">{item.institution}</h4>
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm text-primary whitespace-nowrap self-start">
                                    <Calendar size={14} />
                                    {item.duration}
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
