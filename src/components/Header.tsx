
import React from 'react';
import { Film, Newspaper, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="p-4 mb-8 bg-gradient-to-r from-primary/90 to-secondary/90 text-white rounded-lg shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Film className="h-8 w-8" />
          <h1 className="text-2xl font-bold">TrendScribe Visuals</h1>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <Newspaper className="h-5 w-5" />
            <span>News Scraper</span>
          </div>
          <div className="flex items-center space-x-1">
            <Sparkles className="h-5 w-5" />
            <span>AI Generation</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
