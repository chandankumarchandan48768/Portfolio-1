import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code2, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth(); // Use Auth Context

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Education', to: 'education-section' },
        { name: 'Experience', to: 'experience-section' },
        { name: 'Projects', to: 'projects' },
        { name: 'Services', to: 'services' },
        { name: 'Contact', to: 'contact' },
    ];

    const manageLinks = [
        { name: 'Manage Edu', path: '/education' },
        { name: 'Manage Exp', path: '/experience' },
        { name: 'Manage Proj', path: '/projects-manage' },
        { name: 'Manage Skills', path: '/skills-manage' },
    ];

    const handleNavClick = (to) => {
        if (!isHome) {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(to);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <RouterLink to="/" className="flex items-center gap-2 cursor-pointer font-bold text-2xl text-white">
                    <Code2 className="text-primary w-8 h-8" />
                    <span>ChandanDev</span>
                </RouterLink>

                {/* Desktop Menu */}
                <div className="hidden xl:flex items-center gap-6">
                    {navLinks.map((link) => (
                        isHome ? (
                            <ScrollLink
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                className="text-gray-300 hover:text-primary transition-colors cursor-pointer text-sm font-medium"
                            >
                                {link.name}
                            </ScrollLink>
                        ) : (
                            <button
                                key={link.name}
                                onClick={() => handleNavClick(link.to)}
                                className="text-gray-300 hover:text-primary transition-colors cursor-pointer text-sm font-medium bg-transparent border-0"
                            >
                                {link.name}
                            </button>
                        )
                    ))}

                    {user && (
                        <>
                            <div className="h-4 w-px bg-gray-700 mx-2"></div>
                            {manageLinks.map((link) => (
                                <RouterLink
                                    key={link.name}
                                    to={link.path}
                                    className="text-gray-400 hover:text-white transition-colors text-xs font-medium uppercase tracking-wider"
                                >
                                    {link.name}
                                </RouterLink>
                            ))}
                        </>
                    )}

                    <div className="ml-4 flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <User size={16} />
                                    <span className="hidden lg:inline">Admin</span>
                                </div>
                                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <RouterLink to="/login" className="text-gray-300 hover:text-primary transition-colors">
                                <LogIn size={20} />
                            </RouterLink>
                        )}

                        <RouterLink to="/contact">
                            <button className="bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                                Hire Me
                            </button>
                        </RouterLink>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="xl:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white">
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden bg-black/95 absolute top-full left-0 w-full overflow-hidden"
                    >
                        <div className="flex flex-col items-center gap-6 py-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        setIsOpen(false);
                                        handleNavClick(link.to);
                                    }}
                                    className="text-xl text-gray-300 hover:text-primary font-medium bg-transparent border-0"
                                >
                                    {link.name}
                                </button>
                            ))}

                            {user && (
                                <>
                                    <div className="w-16 h-px bg-gray-800 my-2"></div>
                                    {manageLinks.map((link) => (
                                        <RouterLink
                                            key={link.name}
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className="text-lg text-gray-400 hover:text-white font-medium"
                                        >
                                            {link.name}
                                        </RouterLink>
                                    ))}
                                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-red-500 font-medium flex items-center gap-2">
                                        <LogOut size={18} /> Logout
                                    </button>
                                </>
                            )}

                            {!user && (
                                <RouterLink to="/login" onClick={() => setIsOpen(false)} className="text-primary font-medium flex items-center gap-2">
                                    <LogIn size={18} /> Login
                                </RouterLink>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
