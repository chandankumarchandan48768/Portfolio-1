import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import { Plus, Edit, Trash2, X, Save, Loader2, Briefcase, MapPin } from 'lucide-react';
import { getData, createData, updateData, deleteData } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Experience = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        role: '',
        company: '',
        duration: '',
        location: '',
        description: ''
    });

    const endpoint = '/experience';

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            try {
                const data = await getData(endpoint);
                setItems(data);
            } catch {
                console.warn("API not connected, using mockup");
                setItems([
                    { _id: '1', role: 'Senior Frontend Developer', company: 'Tech Corp', duration: '2022 - Present', location: 'San Francisco, CA', description: 'Leading the frontend team.' }
                ]);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (currentItem) {
                await updateData(endpoint, currentItem._id, formData);
            } else {
                await createData(endpoint, formData);
            }
            setIsModalOpen(false);
            setCurrentItem(null);
            setFormData({ role: '', company: '', duration: '', location: '', description: '' });
            fetchItems();
        } catch (error) {
            console.error("Operation failed", error);
            alert("Operation failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (item) => {
        setCurrentItem(item);
        setFormData({
            role: item.role,
            company: item.company,
            duration: item.duration,
            location: item.location || '',
            description: item.description
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteData(endpoint, id);
                fetchItems();
            } catch (error) {
                console.error("Delete failed", error);
                alert("Delete failed.");
            }
        }
    };

    const openModal = () => {
        setCurrentItem(null);
        setFormData({ role: '', company: '', duration: '', location: '', description: '' });
        setIsModalOpen(true);
    };

    return (
        <div className="bg-background min-h-screen text-white pt-24 px-6 relative">
            <Navbar />
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <Briefcase className="text-primary" size={40} />
                            Experience Management
                        </h1>
                        <p className="text-gray-400 mt-2">Add, edit, or remove work experience</p>
                    </div>
                    {user && (
                        <button
                            onClick={openModal}
                            className="bg-primary hover:bg-primary/90 text-black px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 transition-all"
                        >
                            <Plus size={20} />
                            Add New
                        </button>
                    )}
                </div>

                {loading && !isModalOpen ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={40} />
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {items.length === 0 ? (
                            <div className="text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-white/10">
                                <p>No records found. Click "Add New" to create one.</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item._id || item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-colors group relative">
                                    {user && (
                                        <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(item)} className="p-2 bg-white/10 rounded-full hover:bg-primary hover:text-black transition-colors">
                                                <Edit size={18} />
                                            </button>
                                            <button onClick={() => handleDelete(item._id || item.id)} className="p-2 bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
                                    <h4 className="text-primary font-medium mb-2">{item.company}</h4>
                                    <div className="flex gap-4 text-xs text-gray-300 mb-4">
                                        <span className="bg-white/10 px-3 py-1 rounded-full">{item.duration}</span>
                                        {item.location && <span className="bg-white/10 px-3 py-1 rounded-full flex items-center gap-1"><MapPin size={12} /> {item.location}</span>}
                                    </div>
                                    <p className="text-gray-400">{item.description}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#121212] border border-white/10 w-full max-w-lg rounded-2xl p-8 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-6">
                            {currentItem ? 'Edit Experience' : 'Add New Experience'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Role / Job Title</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="e.g. Google"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="e.g. 2020 - 2022"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="e.g. Remote"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                                    placeholder="Describe your responsibilities..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 mt-2 transition-all"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                                {currentItem ? 'Update' : 'Save'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Experience;
