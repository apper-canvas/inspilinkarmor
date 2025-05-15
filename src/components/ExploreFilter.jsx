import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const ExploreFilter = ({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder 
}) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Icons
  const SearchIcon = getIcon('Search');
  const FilterIcon = getIcon('Filter');
  const SortIcon = getIcon('ArrowUpDown');
  const StarIcon = getIcon('Star');
  const TrendingUpIcon = getIcon('TrendingUp');
  const ClockIcon = getIcon('Clock');
  const SparklesIcon = getIcon('Sparkles');
  const CheckIcon = getIcon('Check');
  const ChevronDownIcon = getIcon('ChevronDown');
  const ArrowLeftIcon = getIcon('ArrowLeft');

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setShowMobileFilters(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter tabs (trending, popular, etc.)
  const tabs = [
    { id: 'all', label: 'All', icon: null },
    { id: 'trending', label: 'Trending', icon: TrendingUpIcon },
    { id: 'new', label: 'New', icon: SparklesIcon },
    { id: 'popular', label: 'Popular', icon: StarIcon },
  ];

  // Sorting options
  const sortOptions = [
    { value: 'recent', label: 'Most Recent', icon: ClockIcon },
    { value: 'popular', label: 'Most Popular', icon: StarIcon },
    { value: 'trending', label: 'Trending Now', icon: TrendingUpIcon },
  ];

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors ${
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
          
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="input pl-3 pr-8 py-2"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-2 pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
              }`}
            >
              All Categories
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap flex items-center space-x-1.5 text-sm ${
                  activeCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600'
                }`}
              >
                <span>{category.name}</span>
                {activeCategory === category.id && (
                  <CheckIcon className="h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mobile filters */}
      <div className="md:hidden mb-6">
        <div className="flex items-center gap-2">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 w-full"
            />
          </div>
          <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="btn btn-outline">
            <FilterIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ExploreFilter;