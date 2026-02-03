import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import { Plus, Edit, Trash2, X, Save, Loader2, Cpu, Code2, Copy } from 'lucide-react';
import { getData, createData, updateData, deleteData } from '../services/api';
import { useAuth } from '../context/AuthContext';

const SkillsPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        proficiency: 0 // Optional, but good to have
    });

    const endpoint = '/skills';

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
                    { _id: '1', name: 'React.js', category: 'Frontend', proficiency: 90 },
                    { _id: '2', name: 'Node.js', category: 'Backend', proficiency: 85 }
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
            setFormData({ name: '', category: '', proficiency: 0 });
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
            name: item.name,
            category: item.category,
            proficiency: item.proficiency || 0
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
        setFormData({ name: '', category: '', proficiency: 0 });
        setIsModalOpen(true);
    };

    return (
        <div className="bg-background min-h-screen text-white pt-24 px-6 relative">
            <Navbar />
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <Cpu className="text-primary" size={40} />
                            Skills Management
                        </h1>
                        <p className="text-gray-400 mt-2">Manage your technical skills</p>
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
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {items.length === 0 ? (
                            <div className="col-span-full text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-white/10">
                                <p>No records found. Click "Add New" to create one.</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item._id || item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-primary/50 transition-colors group relative flex flex-col items-center gap-4">
                                    {user && (
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEdit(item)} className="p-1.5 bg-white/10 rounded-full hover:bg-primary hover:text-black transition-colors">
                                                <Edit size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(item._id || item.id)} className="p-1.5 bg-white/10 rounded-full hover:bg-red-500 hover:text-white transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    )}

                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                                        <Code2 size={24} />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-bold text-white mb-1">{item.name}</h3>
                                        <p className="text-xs text-gray-400">{item.category}</p>
                                    </div>
                                    {item.proficiency > 0 && (
                                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                                            <div className="bg-primary h-full" style={{ width: `${item.proficiency}%` }}></div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#121212] border border-white/10 w-full max-w-sm rounded-2xl p-8 relative">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-6">
                            {currentItem ? 'Edit Skill' : 'Add New Skill'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Skill Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="e.g. React.js"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Database">Database</option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Tools">Tools</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Proficiency %</label>
                                <input
                                    type="number"
                                    name="proficiency"
                                    value={formData.proficiency}
                                    onChange={handleInputChange}
                                    min="0"
                                    max="100"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
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

export default SkillsPage;
