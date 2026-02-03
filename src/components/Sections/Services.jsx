import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Smartphone, Zap, Code2, Wrench, Search } from 'lucide-react';

const services = [
    {
        icon: <Layout className="w-8 h-8" />,
        title: "Frontend Development",
        description: "Building responsive and performant web applications using React, Next.js, and modern JavaScript frameworks with pixel-perfect designs."
    },
    {
        icon: <Smartphone className="w-8 h-8" />,
        title: "Responsive Design",
        description: "Creating mobile-first, responsive interfaces that work seamlessly across all devices and screen sizes with exceptional user experience."
    },
    {
        icon: <Code2 className="w-8 h-8" />,
        title: "UI/UX Design",
        description: "Designing intuitive and visually appealing user interfaces with a focus on usability, accessibility, and modern aesthetics."
    },
    {
        icon: <Wrench className="w-8 h-8" />,
        title: "Custom Components",
        description: "Developing reusable, scalable component libraries and design systems that maintain consistency across large applications."
    },
    {
        icon: <Zap className="w-8 h-8" />,
        title: "Performance Optimization",
        description: "Optimizing web applications for speed and efficiency through code splitting, lazy loading, and best performance practices."
    },
    {
        icon: <Search className="w-8 h-8" />,
        title: "Code Review & Consulting",
        description: "Providing expert code reviews, architecture consulting, and technical guidance to improve your development workflow."
    }
];

const Services = () => {
    return (
        <section id="services" className="py-32 bg-black relative">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-block border border-primary/30 bg-primary/5 text-primary px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-8">
                        <Wrench size={14} className="inline mr-2" />
                        What I Offer
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Built for innovation. <br />
                        <span className="text-gray-400">Designed for results.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Comprehensive solutions to transform your ideas into exceptional digital experiences.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-300 border border-white/10 group-hover:border-primary">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-lg">
                                {service.description}
                            </p>

                            {/* Decorative gradient blob on hover */}
                            <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
