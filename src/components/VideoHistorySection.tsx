
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Play, Clock, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export interface VideoHistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  createdAt: Date;
  videoUrl: string;
}

interface VideoHistorySectionProps {
  videos: VideoHistoryItem[];
}

const VideoHistorySection: React.FC<VideoHistorySectionProps> = ({ videos }) => {
  const { toast } = useToast();

  const handleDownload = (video: VideoHistoryItem) => {
    // In a real app, this would trigger a download of the video
    toast({
      title: 'Downloading video',
      description: `Downloading "${video.title}"`,
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    }).format(date);
  };

  return (
    <section className="section-container gradient-bg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <History className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Video History</h2>
        </div>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <Card key={video.id} className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-md line-clamp-1">{video.title}</CardTitle>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDate(video.createdAt)}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {video.duration}s
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                  <img 
                    src={video.thumbnail || '/placeholder.svg'} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    size="icon" 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80"
                    asChild
                  >
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                      <Play className="h-6 w-6" />
                    </a>
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => handleDownload(video)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-muted/50">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <History className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No videos generated yet. Your generated videos will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default VideoHistorySection;
