
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Newspaper, RefreshCw, TrendingUp } from 'lucide-react';
import { fetchTrendingNews } from '@/utils/newsApi';
import { useToast } from '@/components/ui/use-toast';

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: string;
  category: string;
  url: string;
  publishedAt: string;
  selected?: boolean;
}

interface NewsScraperSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
}

const NewsScraperSection: React.FC<NewsScraperSectionProps> = ({ onSelectArticle }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const { toast } = useToast();

  const categories = [
    { id: 'general', label: 'General' },
    { id: 'business', label: 'Business' },
    { id: 'technology', label: 'Technology' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'health', label: 'Health' },
    { id: 'science', label: 'Science' },
    { id: 'sports', label: 'Sports' },
  ];

  const handleFetchNews = async () => {
    setIsLoading(true);
    try {
      const news = await fetchTrendingNews(selectedCategory);
      setArticles(news);
      toast({
        title: 'News fetched successfully',
        description: `Found ${news.length} trending articles in ${selectedCategory}`,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      toast({
        variant: 'destructive',
        title: 'Error fetching news',
        description: 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectArticle = (article: NewsArticle) => {
    onSelectArticle(article);
    toast({
      title: 'Article selected',
      description: 'You can now generate a script based on this article',
    });
  };

  return (
    <section className="section-container bg-white shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Newspaper className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Trending News Scraper</h2>
        </div>
        <Button 
          onClick={handleFetchNews}
          disabled={isLoading}
          className="flex items-center space-x-2"
        >
          {isLoading ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <TrendingUp className="h-4 w-4" />
          )}
          <span>{isLoading ? 'Fetching...' : 'Fetch Trending News'}</span>
        </Button>
      </div>

      <Tabs defaultValue="general" onValueChange={setSelectedCategory} className="mb-4">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse-slow">
              <CardHeader className="pb-2">
                <div className="h-4 bg-primary/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-primary/10 rounded w-1/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-primary/10 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <Card key={article.id} className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-md">{article.title}</CardTitle>
                <CardDescription className="text-xs flex items-center justify-between">
                  <span>{article.source}</span>
                  <div className="inline-block">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600 line-clamp-3">
                  {article.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm" asChild>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    View Source
                  </a>
                </Button>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => handleSelectArticle(article)}
                >
                  Use This Article
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-100">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Newspaper className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">
              No articles fetched yet. Select a category and click "Fetch Trending News" to get started.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default NewsScraperSection;
