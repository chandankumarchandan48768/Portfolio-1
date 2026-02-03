import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, Code, GraduationCap } from 'lucide-react';

const Experience = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                try {
                    const data = await getData('/experience');
                    setItems(data);
                } catch {
                    // Mockup based on your profile: Education + Training + Projects
                    setItems([
                        { 
                            _id: '1', 
                            role: 'B.Tech Computer Science', 
                            company: 'Sri Siddhartha Institute of Technology', 
                            duration: '2022-2026', 
                            location: 'Tumakuru, Karnataka', 
                            description: 'Pursuing B.Tech in Computer Science with CGPA 7.83. Focused on full-stack development, data structures, algorithms, and interview preparation for software engineering roles.' 
                        },
                        { 
                            _id: '2', 
                            role: 'Backend Developer Trainee', 
                            company: 'Tap Academy', 
                            duration: '2024 - 2025', 
                            location: 'Bengaluru, IN', 
                            description: 'Hands-on training in Spring Boot backend development, REST APIs, MongoDB/PostgreSQL databases, and building scalable portfolio projects.' 
                        },
                        { 
                            _id: '3', 
                            role: 'Full-Stack Developer', 
                            company: 'Rasti Technology', 
                            duration: '03/02/2025 - 25/04/2025', 
                            location: 'Remote', 
                            description: 'Built a online Job portal system and the tech stack used in this project is Codigniter, PHP, postgerSQL, HTML, CSS, JS' 
                        }
                    ]);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchItems();
    }, []);

    return (
        <section id="experience-section" className="py-24 bg-black relative">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                        <Briefcase size={16} />
                        Journey So Far
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience & Education</h2>
                    <p className="text-gray-400">My academic journey, training, and projects</p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Timeline Line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-white/10 md:left-1/2 md:-ml-px"></div>

                    {items.map((item, index) => (
                        <motion.div
                            key={item._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative mb-12 md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Dot */}
                            <div className="absolute left-0 w-10 h-10 bg-black border-4 border-primary rounded-full z-10 md:left-1/2 md:-ml-5 flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                            </div>

                            {/* Content */}
                            <div className="ml-16 md:ml-0 md:w-[45%] bg-white/5 border border-white/10 p-6 rounded-2xl hover:border-primary/50 transition-all duration-300">
                                <div className="mb-4">
                                    <div className="bg-primary/10 text-primary w-fit px-3 py-1 rounded-full text-xs font-semibold mb-2">
                                        {item.duration}
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                                    <h4 className="text-gray-300 font-medium flex items-center gap-2 mt-1">
                                        {item.company}
                                        {item.location && (
                                            <span className="text-gray-500 text-sm flex items-center gap-1">
                                                <MapPin size={12} /> {item.location}
                                            </span>
                                        )}
                                    </h4>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
