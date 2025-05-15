import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import ExploreFilter from '../components/ExploreFilter';
import ContentCard from '../components/ContentCard';

const Explore = () => {
  // State
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('recent');
  const [content, setContent] = useState([]);
  const [filteredContent, setFilteredContent] = useState([]);

  // Icons
  const SearchIcon = getIcon('Search');
  const SparklesIcon = getIcon('Sparkles');
  const TrendingUpIcon = getIcon('TrendingUp');
  const RefreshCcwIcon = getIcon('RefreshCcw');

  // Sample categories
  const categories = [
    { id: 'design', name: 'Design', color: 'bg-pink-500' },
    { id: 'technology', name: 'Technology', color: 'bg-blue-500' },
    { id: 'finance', name: 'Finance', color: 'bg-green-500' },
    { id: 'health', name: 'Health', color: 'bg-red-500' },
    { id: 'travel', name: 'Travel', color: 'bg-amber-500' },
    { id: 'education', name: 'Education', color: 'bg-purple-500' },
    { id: 'productivity', name: 'Productivity', color: 'bg-indigo-500' },
    { id: 'career', name: 'Career', color: 'bg-teal-500' },
  ];

  // Mock content data
  const mockContent = [
    {
      id: 1,
      title: "The Complete Guide to UX Research Methods",
      description: "Learn how to choose and apply the right research methods for your product design challenges.",
      url: "https://example.com/ux-research-guide",
      thumbnail: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1470&q=80",
      category: "Design",
      creator: "UX Collective",
      saveCount: 328,
      featured: true,
      trending: true,
      dateAdded: new Date('2023-10-15').toISOString()
    },
    {
      id: 2,
      title: "2023 Web Development Trends You Need to Know",
      description: "Stay ahead of the curve with these emerging technologies and practices in web development.",
      url: "https://example.com/web-dev-trends-2023",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1470&q=80",
      category: "Technology",
      creator: "Dev Community",
      saveCount: 245,
      featured: true,
      trending: true,
      dateAdded: new Date('2023-09-28').toISOString()
    },
    {
      id: 3,
      title: "Personal Finance Dashboard: Track Your Spending",
      description: "A simple yet powerful spreadsheet to visualize your finances and plan for the future.",
      url: "https://example.com/finance-dashboard",
      thumbnail: "https://images.unsplash.com/photo-1565514020179-026b92b4a0b5?auto=format&fit=crop&w=1470&q=80",
      category: "Finance",
      creator: "Personal Finance Club",
      saveCount: 412,
      featured: false,
      trending: true,
      dateAdded: new Date('2023-10-03').toISOString()
    },
    {
      id: 4,
      title: "30-Day Mindfulness Challenge: Improve Your Mental Health",
      description: "Daily exercises to reduce stress, improve focus, and build resilience through mindfulness.",
      url: "https://example.com/mindfulness-challenge",
      thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1470&q=80",
      category: "Health",
      creator: "Mindful Living",
      saveCount: 198,
      featured: false,
      trending: false,
      dateAdded: new Date('2023-09-10').toISOString()
    },
    {
      id: 5,
      title: "Hidden Gems of Southeast Asia: Off the Beaten Path",
      description: "Discover breathtaking locations most tourists never see with this detailed travel guide.",
      url: "https://example.com/southeast-asia-gems",
      thumbnail: "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1470&q=80",
      category: "Travel",
      creator: "Wanderlust Journal",
      saveCount: 287,
      featured: true,
      trending: false,
      dateAdded: new Date('2023-08-22').toISOString()
    },
    {
      id: 6,
      title: "The Science of Learning: How to Study Effectively",
      description: "Evidence-based techniques to learn faster, remember more, and achieve your educational goals.",
      url: "https://example.com/effective-learning",
      thumbnail: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1470&q=80",
      category: "Education",
      creator: "Learning Lab",
      saveCount: 356,
      featured: false,
      trending: true,
      dateAdded: new Date('2023-09-05').toISOString()
    },
    {
      id: 7,
      title: "Build a Morning Routine That Actually Works",
      description: "Design a personalized morning ritual to boost productivity and wellbeing based on science.",
      url: "https://example.com/morning-routine",
      thumbnail: "https://images.unsplash.com/photo-1506368083636-6defb67639a7?auto=format&fit=crop&w=1470&q=80",
      category: "Productivity",
      creator: "Optimal Living",
      saveCount: 423,
      featured: true,
      trending: true,
      dateAdded: new Date('2023-10-01').toISOString()
    },
    {
      id: 8,
      title: "Negotiation Skills: Get What You're Worth",
      description: "Master the art of negotiation to advance your career and increase your compensation.",
      url: "https://example.com/negotiation-skills",
      thumbnail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1470&q=80",
      category: "Career",
      creator: "Career Accelerator",
      saveCount: 189,
      featured: false,
      trending: false,
      dateAdded: new Date('2023-08-15').toISOString()
    },
    {
      id: 9,
      title: "Responsive Design Patterns for Modern Web Apps",
      description: "Best practices and code examples for creating fluid, device-agnostic user interfaces.",
      url: "https://example.com/responsive-design",
      thumbnail: "https://images.unsplash.com/photo-1493119508027-2b584f234d6c?auto=format&fit=crop&w=1470&q=80",
      category: "Design",
      creator: "Frontend Masters",
      saveCount: 276,
      featured: false,
      trending: false,
      dateAdded: new Date('2023-08-30').toISOString()
    },
    {
      id: 10,
      title: "AI Tools for Everyday Productivity",
      description: "How to leverage artificial intelligence to automate tasks and enhance your workflow.",
      url: "https://example.com/ai-productivity",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1470&q=80",
      category: "Technology",
      creator: "Future Proof",
      saveCount: 315,
      featured: true,
      trending: true,
      dateAdded: new Date('2023-09-20').toISOString()
    },
    {
      id: 11,
      title: "Introduction to Index Fund Investing",
      description: "A beginner's guide to building wealth through low-cost index funds and passive investing.",
      url: "https://example.com/index-investing",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1470&q=80",
      category: "Finance",
      creator: "Smart Money",
      saveCount: 392,
      featured: true,
      trending: false,
      dateAdded: new Date('2023-09-15').toISOString()
    },
    {
      id: 12,
      title: "Home Office Setup for Maximum Productivity",
      description: "Design an ergonomic and inspiring workspace that boosts focus and creativity.",
      url: "https://example.com/home-office-setup",
      thumbnail: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?auto=format&fit=crop&w=1470&q=80",
      category: "Productivity",
      creator: "Workspace Design",
      saveCount: 214,
      featured: false,
      trending: true,
      dateAdded: new Date('2023-10-10').toISOString()
    }
  ];

  // Fetch content on component mount
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // In a real app, this would be an API call
        setContent(mockContent);
      } catch (error) {
        console.error("Error fetching content:", error);
        toast.error("Failed to load content. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  // Filter content based on active filters
  useEffect(() => {
    if (content.length === 0) return;
    
    let filtered = [...content];
    
    // Filter by tab
    if (activeTab === 'trending') {
      filtered = filtered.filter(item => item.trending);
    } else if (activeTab === 'new') {
      // Sort by date and get only the most recent ones
      filtered = filtered.sort((a, b) => 
        new Date(b.dateAdded) - new Date(a.dateAdded)
      ).slice(0, 6);
    } else if (activeTab === 'popular') {
      filtered = filtered.sort((a, b) => b.saveCount - a.saveCount);
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === categories.find(c => c.id === activeCategory)?.name.toLowerCase()
      );
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(search) ||
        (item.description && item.description.toLowerCase().includes(search)) ||
        item.category.toLowerCase().includes(search) ||
        (item.creator && item.creator.toLowerCase().includes(search))
      );
    }
    
    // Apply sorting
    if (sortOrder === 'recent') {
      filtered.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    } else if (sortOrder === 'popular') {
      filtered.sort((a, b) => b.saveCount - a.saveCount);
    }
    
    setFilteredContent(filtered);
  }, [content, activeCategory, activeTab, searchTerm, sortOrder]);

  return (
    <div className="min-h-screen">
      {/* Explore Header Section */}
      <section className="bg-gradient-to-br from-secondary-light via-secondary to-secondary-dark text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">
              <span className="flex items-center">
                <SparklesIcon className="mr-2 h-6 w-6 md:h-8 md:w-8" />
                Explore Curated Content
              </span>
            </h1>
            <p className="text-white/90 text-lg">
              Discover handpicked resources and inspiration across various categories
            </p>
          </div>
        </div>
      </section>
      
      {/* Explore Content Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <ExploreFilter 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <RefreshCcwIcon className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-lg text-surface-600 dark:text-surface-400">Loading inspiring content...</p>
            </div>
          ) : filteredContent.length === 0 ? (
            <div className="bg-white dark:bg-surface-800 rounded-xl shadow-card p-8 text-center">
              <SearchIcon className="h-12 w-12 text-surface-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No content found</h3>
              <p className="text-surface-500 dark:text-surface-400 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? "No results match your search criteria. Try adjusting your filters or search terms."
                  : "No content available in this category right now."}
              </p>
              <button 
                onClick={() => {
                  setActiveCategory('all');
                  setActiveTab('all');
                  setSearchTerm('');
                }}
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredContent.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;