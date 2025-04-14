
import React, { useState } from 'react';
import Header from '@/components/Header';
import NewsScraperSection, { NewsArticle } from '@/components/NewsScraperSection';
import ScriptGeneratorSection from '@/components/ScriptGeneratorSection';
import VideoGeneratorSection from '@/components/VideoGeneratorSection';
import VideoHistorySection, { VideoHistoryItem } from '@/components/VideoHistorySection';

const Index = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [generatedScript, setGeneratedScript] = useState('');
  const [videoHistory, setVideoHistory] = useState<VideoHistoryItem[]>([]);

  const handleSelectArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  const handleScriptGenerated = (script: string) => {
    setGeneratedScript(script);
  };

  const handleVideoGenerated = (videoUrl: string) => {
    if (selectedArticle) {
      const newVideo: VideoHistoryItem = {
        id: `video-${Date.now()}`,
        title: selectedArticle.title,
        thumbnail: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}`,
        duration: Math.floor(Math.random() * 30) + 30, // Random duration between 30-60s
        createdAt: new Date(),
        videoUrl,
      };
      
      setVideoHistory([newVideo, ...videoHistory]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="space-y-8">
          <NewsScraperSection onSelectArticle={handleSelectArticle} />
          
          <ScriptGeneratorSection 
            selectedArticle={selectedArticle} 
            onScriptGenerated={handleScriptGenerated} 
          />
          
          <VideoGeneratorSection 
            selectedArticle={selectedArticle}
            script={generatedScript}
            onVideoGenerated={handleVideoGenerated}
          />
          
          <VideoHistorySection videos={videoHistory} />
        </div>
      </div>
    </div>
  );
};

export default Index;
