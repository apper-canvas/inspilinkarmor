import { useState } from 'react';
import { motion } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const SearchIcon = getIcon('Search');
  const StarIcon = getIcon('Star');
  const BookmarkIcon = getIcon('Bookmark');
  const HashIcon = getIcon('Hash');
  const TrendingUpIcon = getIcon('TrendingUp');
  const SparklesIcon = getIcon('Sparkles');
  
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample featured categories
  const categories = [
    { id: 'design', name: 'Design', icon: 'Palette', color: 'bg-pink-500' },
    { id: 'tech', name: 'Technology', icon: 'Cpu', color: 'bg-blue-500' },
    { id: 'finance', name: 'Finance', icon: 'DollarSign', color: 'bg-green-500' },
    { id: 'health', name: 'Health', icon: 'Heart', color: 'bg-red-500' },
    { id: 'travel', name: 'Travel', icon: 'Map', color: 'bg-amber-500' },
    { id: 'education', name: 'Education', icon: 'GraduationCap', color: 'bg-purple-500' },
  ];
  
  // Featured links for the discovery section
  const featuredLinks = [
    {
      id: 1,
      title: "The Ultimate Guide to Personal Finance",
      url: "https://example.com/finance-guide",
      thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Finance",
      saved: 245,
      creator: "Financial Freedom"
    },
    {
      id: 2,
      title: "10 Essential UX Principles Every Designer Should Know",
      url: "https://example.com/ux-principles",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Design",
      saved: 189,
      creator: "UX Masters"
    },
    {
      id: 3,
      title: "The Art of Mindful Meditation: A Beginner's Guide",
      url: "https://example.com/mindful-meditation",
      thumbnail: "https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Health",
      saved: 321,
      creator: "Mindful Living"
    },
    {
      id: 4,
      title: "Hidden Gems of South America: Travel Guide",
      url: "https://example.com/south-america-travel",
      thumbnail: "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Travel",
      saved: 178,
      creator: "Wanderlust"
    }
  ];
  
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
      transition: { duration: 0.5 }
    }
  };
  
  // Category icon components
  const CategoryIcon = ({ category }) => {
    const IconComponent = getIcon(category.icon);
    return (
      <div className={`p-3 rounded-lg ${category.color} text-white`}>
        <IconComponent className="h-5 w-5" />
      </div>
    );
  };
  
  // Filter tabs for discovery section
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'trending', label: 'Trending', icon: TrendingUpIcon },
    { id: 'new', label: 'New', icon: SparklesIcon },
    { id: 'popular', label: 'Popular', icon: StarIcon },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light via-primary to-primary-dark text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Discover, Collect, and Organize Inspiration
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-white/90"
            >
              Save and categorize links from around the web. Build your personal library of inspiration and knowledge.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative max-w-xl mx-auto mb-8"
            >
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <input 
                type="text" 
                placeholder="Search for inspiration..." 
                className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <MainFeature />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-surface-100 dark:bg-surface-800/50">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
              Explore curated content organized by topics that matter to you
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {categories.map((category) => (
              <motion.div 
                key={category.id}
                variants={itemVariants}
                className="bg-white dark:bg-surface-700 rounded-xl shadow-card hover:shadow-soft cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-4 flex flex-col items-center text-center space-y-3">
                  <CategoryIcon category={category} />
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Discovery Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Discover Inspiration</h2>
            <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap flex items-center space-x-1 transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-primary text-white' 
                      : 'bg-white dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                  }`}
                >
                  {tab.icon && <tab.icon className="h-4 w-4" />}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredLinks.map((link) => (
              <motion.div
                key={link.id}
                variants={itemVariants}
                className="bg-white dark:bg-surface-700 rounded-xl overflow-hidden shadow-card group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={link.thumbnail} 
                    alt={link.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div className="flex items-center space-x-2 text-white">
                      <BookmarkIcon className="h-4 w-4" />
                      <span className="text-sm font-medium">{link.saved} saves</span>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center rounded-full bg-black/50 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-white">
                      <HashIcon className="h-3 w-3 mr-1" />
                      {link.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-surface-500 dark:text-surface-400 text-sm mb-3">
                    By {link.creator}
                  </p>
                  <button className="btn btn-outline w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                    Save Link
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;