import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for persisted user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email, password) => {
        // Simple mock authentication
        // In a real app, you would validate against a backend
        if (email === 'admin@example.com' && password === 'admin123') {
            const userData = { email, role: 'admin' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = (details) => {
        // Mock registration - Alert admin
        console.log("Registration attempt:", details);
        alert(`Request sent to Admin! Credentials for ${details.email} have been mailed for review. You cannot login until approved.`);
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
