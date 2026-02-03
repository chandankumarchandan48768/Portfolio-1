import React, { useState, useEffect } from 'react';
import Navbar from '../components/Layout/Navbar';
import { Plus, Edit, Trash2, X, Save, Loader2, FolderGit, Github, Globe } from 'lucide-react';
import { getData, createData, updateData, deleteData } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ProjectsPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        technologies: '',
        githubUrl: '',
        liveUrl: '',
        imageUrl: ''
    });

    const endpoint = '/projects';

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
                    { _id: '1', title: 'Portfolio Website', category: 'Web App', description: 'Personal portfolio built with React.', technologies: 'React, Tailwind', githubUrl: '#', liveUrl: '#' }
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
            setFormData({ title: '', category: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' });
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
            title: item.title,
            category: item.category || '',
            description: item.description,
            technologies: item.technologies || '',
            githubUrl: item.githubUrl || '',
            liveUrl: item.liveUrl || '',
            imageUrl: item.imageUrl || ''
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
        setFormData({ title: '', category: '', description: '', technologies: '', githubUrl: '', liveUrl: '', imageUrl: '' });
        setIsModalOpen(true);
    };

    return (
        <div className="bg-background min-h-screen text-white pt-24 px-6 relative">
            <Navbar />
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-bold flex items-center gap-3">
                            <FolderGit className="text-primary" size={40} />
                            Projects Management
                        </h1>
                        <p className="text-gray-400 mt-2">Manage your project portfolio</p>
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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.length === 0 ? (
                            <div className="col-span-full text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-white/10">
                                <p>No records found. Click "Add New" to create one.</p>
                            </div>
                        ) : (
                            items.map((item) => (
                                <div key={item._id || item.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-colors group flex flex-col">
                                    {/* Image Placeholder */}
                                    <div className="h-40 bg-white/5 w-full flex items-center justify-center text-gray-600 relative">
                                        {item.imageUrl ? (
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <FolderGit size={40} />
                                        )}
                                        {user && (
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                                <button onClick={() => handleEdit(item)} className="p-2 bg-white text-black rounded-full hover:bg-primary transition-colors">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(item._id || item.id)} className="p-2 bg-white text-black rounded-full hover:bg-red-500 hover:text-white transition-colors">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                            {item.category && <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-0.5 rounded-full">{item.category}</span>}
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{item.description}</p>

                                        {item.technologies && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {item.technologies.split(',').map((tech, i) => (
                                                    <span key={i} className="text-xs bg-white/10 px-2 py-0.5 rounded text-gray-300">
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex gap-4 pt-4 border-t border-white/10">
                                            {item.githubUrl && (
                                                <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
                                                    <Github size={16} /> Code
                                                </a>
                                            )}
                                            {item.liveUrl && (
                                                <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-1 text-sm">
                                                    <Globe size={16} /> Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-[#121212] border border-white/10 w-full max-w-lg rounded-2xl p-8 relative my-8">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-6">
                            {currentItem ? 'Edit Project' : 'Add New Project'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="e.g. My Awesome App"
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
                                    <option value="Web App">Web App</option>
                                    <option value="Mobile App">Mobile App</option>
                                    <option value="UI/UX">UI/UX</option>
                                    <option value="Full Stack">Full Stack</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors resize-none"
                                    placeholder="Describe the project..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Technologies (comma separated)</label>
                                <input
                                    type="text"
                                    name="technologies"
                                    value={formData.technologies}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">GitHub URL</label>
                                    <input
                                        type="url"
                                        name="githubUrl"
                                        value={formData.githubUrl}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="https://github.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Live Demo URL</label>
                                    <input
                                        type="url"
                                        name="liveUrl"
                                        value={formData.liveUrl}
                                        onChange={handleInputChange}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Image URL</label>
                                <input
                                    type="text"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder="/path/to/image.jpg"
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

export default ProjectsPage;
