import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Briefcase, Layout, Database } from 'lucide-react';

const categories = ['All', 'Web Apps', 'UI Components', 'Full Stack'];

const projects = [
    {
        title: "E-Commerce Platform",
        category: "Full Stack",
        description: "Full-stack online shopping application with real-time inventory and payments.",
        image: "/project1.jpg", // Placeholder
        color: "from-purple-500 to-indigo-500"
    },
    {
        title: "Task Management Dashboard",
        category: "Web Apps",
        description: "Collaborative project management tool with drag-and-drop features.",
        image: "/project2.jpg", // Placeholder
        color: "from-emerald-500 to-teal-500"
    },
    {
        title: "Component Library",
        category: "UI Components",
        description: "Comprehensive React component library with 50+ reusable elements.",
        image: "/project3.jpg", // Placeholder
        color: "from-orange-500 to-red-500"
    }
];

const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProjects = projects.filter(
        project => activeCategory === 'All' || project.category === activeCategory
    );

    return (
        <section id="projects" className="py-24 bg-black relative">
            {/* Background Glow */}
            <div className="absolute right-0 top-[20%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                        <Briefcase size={16} />
                        My Work
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
                    <p className="text-gray-400">Showcasing my best work and achievements</p>
                </motion.div>

                {/* Filter Tabs */}
                <div className="flex justify-center flex-wrap gap-4 mb-16">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category
                                    ? 'bg-primary text-black scale-105 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                                }
              `}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={index}
                                className="group rounded-3xl overflow-hidden bg-white/5 border border-white/10 relative hover:border-primary/50 transition-all duration-500"
                            >
                                {/* Image Area Placeholder */}
                                <div className={`h-64 w-full bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity duration-500 relative`}>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-sm gap-4">
                                        <button className="p-3 bg-white text-black rounded-full hover:bg-primary transition-colors">
                                            <ExternalLink size={20} />
                                        </button>
                                        <button className="p-3 bg-white text-black rounded-full hover:bg-primary transition-colors">
                                            <Github size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-3 py-1 text-xs font-medium bg-white/10 rounded-full text-white">{project.category}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
