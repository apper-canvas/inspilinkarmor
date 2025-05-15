import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icons
  const LinkIcon = getIcon('Link');
  const PlusIcon = getIcon('Plus');
  const SaveIcon = getIcon('Save');
  const TagIcon = getIcon('Tag');
  const FolderIcon = getIcon('Folder');
  const XIcon = getIcon('X');
  const ExternalLinkIcon = getIcon('ExternalLink');
  const CopyIcon = getIcon('Copy');
  const TrashIcon = getIcon('Trash');
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');
  const SortIcon = getIcon('ArrowUpDown');
  const CloseIcon = getIcon('X');
  const CheckIcon = getIcon('Check');
  
  // State for the form
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    category: '',
    tags: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  // State for the links collection
  const [links, setLinks] = useState(() => {
    const savedLinks = localStorage.getItem('inspilink-saved-links');
    return savedLinks ? JSON.parse(savedLinks) : [
      {
        id: 1,
        url: 'https://tailwindcss.com',
        title: 'Tailwind CSS - Rapidly build modern websites without ever leaving your HTML',
        description: 'A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.',
        thumbnail: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        category: 'Development',
        tags: ['css', 'framework', 'frontend'],
        dateAdded: new Date('2023-05-10').toISOString()
      },
      {
        id: 2,
        url: 'https://react.dev',
        title: 'React – A JavaScript library for building user interfaces',
        description: 'React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.',
        thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe60d47b2d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        category: 'Development',
        tags: ['javascript', 'framework', 'frontend'],
        dateAdded: new Date('2023-05-15').toISOString()
      }
    ];
  });
  
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  
  // Get unique categories from links
  const categories = ['All', ...new Set(links.map(link => link.category))];
  
  // Save links to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('inspilink-saved-links', JSON.stringify(links));
  }, [links]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Validate form data
  const validateForm = () => {
    const errors = {};
    
    if (!formData.url) {
      errors.url = 'URL is required';
    } else if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.url)) {
      errors.url = 'Please enter a valid URL';
    }
    
    if (!formData.title) {
      errors.title = 'Title is required';
    }
    
    if (!formData.category) {
      errors.category = 'Category is required';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send this to an API
      // For now, we'll just simulate a delay and add it locally
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newLink = {
        id: Date.now(),
        url: formData.url.startsWith('http') ? formData.url : `https://${formData.url}`,
        title: formData.title,
        description: formData.description,
        thumbnail: `https://images.unsplash.com/photo-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        dateAdded: new Date().toISOString()
      };
      
      setLinks(prev => [newLink, ...prev]);
      setFormData({
        url: '',
        title: '',
        description: '',
        category: '',
        tags: ''
      });
      setShowAddForm(false);
      toast.success('Link saved successfully!');
    } catch (error) {
      toast.error('Failed to save link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle link deletion
  const handleDeleteLink = (id) => {
    if (confirm('Are you sure you want to delete this link?')) {
      setLinks(prev => prev.filter(link => link.id !== id));
      toast.success('Link deleted successfully');
    }
  };
  
  // Filter and sort links
  const filteredLinks = links
    .filter(link => {
      const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (link.tags && link.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
      const matchesCategory = activeCategory === 'All' || link.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      } else if (sortOrder === 'oldest') {
        return new Date(a.dateAdded) - new Date(b.dateAdded);
      } else if (sortOrder === 'alphabetical') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  
  // Format the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      } 
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">My Link Collection</h2>
            <p className="text-surface-600 dark:text-surface-400">
              Organize and access all your saved content in one place
            </p>
          </div>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary flex items-center justify-center"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add New Link
          </button>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search your links..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="btn btn-outline flex items-center"
              >
                <FilterIcon className="mr-2 h-4 w-4" />
                Filter
              </button>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="input"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>
          
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-6"
              >
                <div className="bg-surface-100 dark:bg-surface-700/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Filter by Category</h3>
                    <button 
                      onClick={() => setShowFilters(false)}
                      className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          activeCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-white dark:bg-surface-600 hover:bg-surface-200 dark:hover:bg-surface-500'
                        }`}
                      >
                        {category}
                        {activeCategory === category && (
                          <CheckIcon className="inline-block ml-1 h-3 w-3" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {filteredLinks.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-100 dark:bg-surface-700 mb-4">
                <LinkIcon className="h-8 w-8 text-surface-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No links found</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6">
                {links.length === 0
                  ? "You haven't saved any links yet. Add your first link to get started!"
                  : "No links match your current search or filters. Try adjusting your criteria."}
              </p>
              {links.length === 0 && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="btn btn-primary"
                >
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Your First Link
                </button>
              )}
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredLinks.map(link => (
                <motion.div
                  key={link.id}
                  variants={itemVariants}
                  className="bg-white dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-lg overflow-hidden shadow-sm hover:shadow-card transition-shadow"
                >
                  <div className="relative h-40 bg-surface-200 dark:bg-surface-600 overflow-hidden">
                    <img
                      src={link.thumbnail}
                      alt={link.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=800&q=60";
                      }}
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button 
                        onClick={() => window.open(link.url, '_blank')}
                        className="p-1.5 rounded-full bg-white/90 dark:bg-surface-800/90 hover:bg-white dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300"
                        title="Open link"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(link.url);
                          toast.success('URL copied to clipboard!');
                        }}
                        className="p-1.5 rounded-full bg-white/90 dark:bg-surface-800/90 hover:bg-white dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300"
                        title="Copy URL"
                      >
                        <CopyIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteLink(link.id)}
                        className="p-1.5 rounded-full bg-white/90 dark:bg-surface-800/90 hover:bg-red-500 hover:text-white text-surface-700 dark:text-surface-300"
                        title="Delete link"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-medium text-white">
                        <FolderIcon className="h-3 w-3" />
                        {link.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block mb-2 hover:underline"
                    >
                      <h3 className="font-semibold line-clamp-2 hover:text-primary">{link.title}</h3>
                    </a>
                    {link.description && (
                      <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">
                        {link.description}
                      </p>
                    )}
                    {link.tags && link.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {link.tags.map(tag => (
                          <span 
                            key={tag}
                            className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300"
                          >
                            <TagIcon className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-surface-500 dark:text-surface-400">
                      Added on {formatDate(link.dateAdded)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Add New Link Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white dark:bg-surface-800 rounded-xl shadow-card max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Add New Link</h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="url" className="block text-sm font-medium mb-1">
                        URL <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
                        <input
                          type="text"
                          id="url"
                          name="url"
                          value={formData.url}
                          onChange={handleInputChange}
                          placeholder="https://example.com"
                          className={`input pl-10 ${validationErrors.url ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                      </div>
                      {validationErrors.url && (
                        <p className="mt-1 text-sm text-red-500">{validationErrors.url}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Page title"
                        className={`input ${validationErrors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {validationErrors.title && (
                        <p className="mt-1 text-sm text-red-500">{validationErrors.title}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Brief description of the link (optional)"
                        rows="3"
                        className="input"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`input ${validationErrors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
                      >
                        <option value="">Select a category</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Finance">Finance</option>
                        <option value="Health">Health</option>
                        <option value="Education">Education</option>
                        <option value="Travel">Travel</option>
                        <option value="Entertainment">Entertainment</option>
                      </select>
                      {validationErrors.category && (
                        <p className="mt-1 text-sm text-red-500">{validationErrors.category}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium mb-1">
                        Tags
                      </label>
                      <div className="relative">
                        <TagIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
                        <input
                          type="text"
                          id="tags"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          placeholder="Separate tags with commas (e.g. tutorial, web, reference)"
                          className="input pl-10"
                        />
                      </div>
                      <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">
                        Tags help you find your content later. Add a few relevant keywords.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-8">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="btn btn-outline"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <SaveIcon className="mr-2 h-4 w-4" />
                          Save Link
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;