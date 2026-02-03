import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-scroll';

const Hero = () => {
    return (
        <section id="banner" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
                        <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-gray-300">Available for Freelance</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        React.js Developer <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">
                            Portfolio
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                        Building modern, scalable web applications with React, JavaScript, and cutting-edge technologies. Transforming ideas into exceptional digital experiences.
                    </p>

                    <div className="flex flex-wrap gap-4 mb-12">
                        <Link to="contact" smooth={true} duration={500}>
                            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2">
                                Get in Touch <ArrowRight size={20} />
                            </button>
                        </Link>
                        <button className="border border-white/20 px-8 py-3 rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300 flex items-center gap-2">
                            Download CV <Download size={20} />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-3xl font-bold text-primary mb-1">3+</h3>
                            <p className="text-sm text-gray-400">Years Experience</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-primary mb-1">50+</h3>
                            <p className="text-sm text-gray-400">Projects Completed</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-primary mb-1">15+</h3>
                            <p className="text-sm text-gray-400">Technologies</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content - Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative group w-full max-w-md mx-auto md:max-w-none"
                >
                    {/* Revolving Light Effect */}
                    <div className="absolute -inset-1 rounded-[26px] overflow-hidden -z-10">
                        <div className="absolute top-[50%] left-[50%] w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_300deg,var(--color-primary)_360deg)] animate-[spin_4s_linear_infinite] opacity-70 blur-md" />
                    </div>

                    {/* Image Container - Added solid bg to make light feel 'hollow' or surrounding */}
                    <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] backdrop-blur-sm shadow-2xl">
                        <img
                            src="/hero.png"
                            alt="Developer Portrait"
                            className="w-full h-auto object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                        {/* Tech Icons overlay */}
                        <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                            {['⚛️', '🟢', '🔷', '🎨', '🚀'].map((emoji, i) => (
                                <span key={i} className="text-2xl hover:-translate-y-2 transition-transform cursor-default">{emoji}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
