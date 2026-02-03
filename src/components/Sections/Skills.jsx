import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Server, Boxes, Anchor, Github, Coffee, Layers, Shield } from 'lucide-react';

const skills = [
    { name: 'React.js', icon: <Code2 size={24} /> },
    { name: 'Spring Boot', icon: <Server size={24} /> },
    { name: 'Java', icon: <Coffee size={24} /> },
    { name: 'MongoDB', icon: <Database size={24} /> },
    { name: 'PostgreSQL', icon: <Layers size={24} /> },
    { name: 'Docker', icon: <Boxes size={24} /> },
    { name: 'Tailwind CSS', icon: <Layout size={24} /> },
    { name: 'JavaScript', icon: <Code2 size={24} /> },
    { name: 'Git/GitHub', icon: <Github size={24} /> },
    { name: 'Framer Motion', icon: <Anchor size={24} /> },
];

const Skills = () => {
    const [activeSkill, setActiveSkill] = useState(null);

    return (
        <section id="skills" className="py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Tech Stack</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Full-stack technologies I use daily for portfolio projects and interview prep
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            onMouseEnter={() => setActiveSkill(index)}
                            onMouseLeave={() => setActiveSkill(null)}
                            className={`
                                p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center gap-4 group
                                ${activeSkill === index
                                    ? 'bg-primary/10 border-primary shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                                    : 'bg-white/5 border-white/10 hover:border-primary/50'
                                }
                            `}
                        >
                            <div className={`
                                w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300
                                ${activeSkill === index ? 'bg-primary text-black' : 'bg-white/10 text-primary'}
                            `}>
                                {skill.icon}
                            </div>
                            <span className={`font-medium transition-colors ${activeSkill === index ? 'text-white' : 'text-gray-400'}`}>
                                {skill.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
