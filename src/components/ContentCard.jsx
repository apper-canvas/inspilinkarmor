import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const ContentCard = ({ item, saveToCollection = true }) => {
  const [saved, setSaved] = useState(item.saved || false);
  const [saveCount, setSaveCount] = useState(item.saveCount || 0);
  const [isLoading, setIsLoading] = useState(false);

  // Icons
  const BookmarkIcon = getIcon('Bookmark');
  const ExternalLinkIcon = getIcon('ExternalLink');
  const HeartIcon = getIcon('Heart');
  const TagIcon = getIcon('Tag');
  const UserIcon = getIcon('User');

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (!saved) {
        setSaved(true);
        setSaveCount(prev => prev + 1);
        toast.success('Added to your collection!');
      } else {
        setSaved(false);
        setSaveCount(prev => Math.max(0, prev - 1));
        toast.info('Removed from your collection');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openLink = () => {
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-surface-700 rounded-xl overflow-hidden shadow-card h-full flex flex-col"
    >
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <img 
            src={item.thumbnail} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=60";
            }}
          />
        </div>
        
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={openLink}
            className="p-2 rounded-full bg-white/90 dark:bg-surface-800/90 hover:bg-white dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300 transition-colors"
            aria-label="Open link"
          >
            <ExternalLinkIcon className="h-4 w-4" />
          </button>
          
          {saveToCollection && (
            <button 
              onClick={handleSave}
              disabled={isLoading}
              className={`p-2 rounded-full transition-colors ${
                saved 
                  ? 'bg-primary text-white' 
                  : 'bg-white/90 dark:bg-surface-800/90 hover:bg-white dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
              }`}
              aria-label={saved ? 'Remove from collection' : 'Save to collection'}
            >
              <BookmarkIcon className={`h-4 w-4 ${isLoading ? 'animate-pulse' : ''}`} />
            </button>
          )}
        </div>
        
        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1 text-xs font-medium text-white">
            {item.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        
        {item.description && (
          <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>
        )}
        
        <div className="mt-auto pt-4 flex items-center justify-between text-surface-500 dark:text-surface-400 text-sm">
          <div className="flex items-center gap-1">
            <UserIcon className="h-3.5 w-3.5" />
            <span>{item.creator || 'Unknown'}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <BookmarkIcon className="h-3.5 w-3.5" />
            <span>{saveCount} saves</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard;