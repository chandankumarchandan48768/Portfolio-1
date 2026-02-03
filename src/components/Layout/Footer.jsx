import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Chandan Kumar K N</h3>
                    <p className="text-gray-400 text-sm">Crafting digital experiences that matter.</p>
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com/chandankumarchandan48768" className="text-gray-400 hover:text-primary transition-colors"><Github size={20} /></a>
                    <a href="www.linkedin.com/in/chandan-kumar-k-n-825912261" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter size={20} /></a>
                    <a href="chandankumarchandan48768@gmail.com" className="text-gray-400 hover:text-primary transition-colors"><Mail size={20} /></a>
                </div>

                <div className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Alex. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
