import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Smartphone, Database, Cloud } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="py-24 bg-black/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="inline-block px-4 py-1.5 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6 bg-primary/5">
                        About Me
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Full-Stack Developer <br />
                        <span className="text-gray-400">from Bengaluru</span>
                    </h2>
                    <p className="text-xl text-gray-400 leading-relaxed">
                        B.Tech Computer Science student at Sri Siddhartha Institute Of Technology (CGPA 7.83), passionate about building full-stack applications with React, Spring Boot, MongoDB, and Docker. Actively preparing for technical interviews while creating scalable web solutions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Code className="w-8 h-8 text-primary" />,
                            title: "Full-Stack",
                            description: "Building end-to-end applications with React frontend, Spring Boot backend, MongoDB, and REST APIs."
                        },
                        {
                            icon: <Zap className="w-8 h-8 text-primary" />,
                            title: "Modern Tech",
                            description: "Expertise in Docker containerization, JavaScript/TypeScript, Tailwind CSS, and animated UIs with Framer Motion."
                        },
                        {
                            icon: <Database className="w-8 h-8 text-primary" />,
                            title: "Project-Driven",
                            description: "Hands-on portfolio projects including backend portfolios, 3D campus maps, and interview prep tools."
                        }
                    ].map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group"
                        >
                            <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {card.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
