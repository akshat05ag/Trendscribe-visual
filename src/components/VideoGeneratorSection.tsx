
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { VideoIcon, Film, Download, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateVideo } from '@/utils/videoGenerator';
import { NewsArticle } from './NewsScraperSection';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface VideoGeneratorSectionProps {
  selectedArticle: NewsArticle | null;
  script: string;
  onVideoGenerated: (videoUrl: string) => void;
}

const VideoGeneratorSection: React.FC<VideoGeneratorSectionProps> = ({
  selectedArticle,
  script,
  onVideoGenerated,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLength, setVideoLength] = useState(30);
  const [videoStyle, setVideoStyle] = useState('modern');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  // Reset video states when URL changes
  useEffect(() => {
    if (videoUrl) {
      setVideoLoaded(false);
      setVideoError(false);
    }
  }, [videoUrl]);

  // Function to try reloading the video when it fails
  const retryLoadVideo = () => {
    if (videoRef.current) {
      setVideoError(false);
      videoRef.current.load();
    }
  };

  const handleGenerateVideo = async () => {
    if (!selectedArticle || !script) {
      toast({
        variant: 'destructive',
        title: !selectedArticle ? 'No article selected' : 'No script generated',
        description: !selectedArticle 
          ? 'Please select an article first'
          : 'Please generate a script first',
      });
      return;
    }

    setIsGenerating(true);
    setProgress(0);
    setVideoError(false);

    try {
      const url = await generateVideo(script, selectedArticle, videoLength, videoStyle, (p) => {
        setProgress(p);
      });

      setProgress(100);
      setVideoUrl(url);
      onVideoGenerated(url);

      toast({
        title: 'Video generated successfully',
        description: 'Your video is ready to view or download',
      });
    } catch (error) {
      console.error('Error generating video:', error);
      toast({
        variant: 'destructive',
        title: 'Error generating video',
        description: 'Please try again later',
      });
      setVideoError(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVideoLoad = () => {
    console.log("Video loaded successfully");
    setVideoLoaded(true);
    setVideoError(false);
    
    // Attempt to play the video automatically
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay prevented:", err);
        // This is expected on some browsers, not an error
      });
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error("Video error occurred with URL:", videoUrl);
    setVideoError(true);
    setVideoLoaded(false);
    
    // Notify user about video loading issues
    toast({
      variant: 'destructive',
      title: 'Video playback error',
      description: 'Unable to play the video. Please try regenerating it.',
    });
  };

  const handleDownload = () => {
    // In a real app, this would trigger a download of the video file
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `video-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: 'Downloading video',
        description: 'Your video is being downloaded',
      });
    }
  };

  return (
    <section className="section-container bg-white shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <VideoIcon className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-bold">Video Generator</h2>
        </div>
        <Button
          onClick={handleGenerateVideo}
          disabled={isGenerating || !script || !selectedArticle}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {isGenerating ? 'Generating...' : 'Generate Video'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Video Length</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Duration: {videoLength} seconds</Label>
              </div>
              <Slider
                value={[videoLength]}
                min={15}
                max={60}
                step={5}
                onValueChange={(value) => setVideoLength(value[0])}
                disabled={isGenerating}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Video Style</CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={videoStyle}
              onValueChange={setVideoStyle}
              disabled={isGenerating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="minimal">Minimal</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Generation Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-xs text-center">{isGenerating ? `${progress}% complete` : progress === 100 ? 'Complete' : 'Not started'}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Video Preview</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          {videoUrl ? (
            <div className="w-full max-w-xl">
              {videoError ? (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Video playback error</AlertTitle>
                  <AlertDescription>
                    Unable to play the video. Please try regenerating it.
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={retryLoadVideo} 
                      className="mt-2"
                    >
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              ) : null}
              
              <video 
                ref={videoRef}
                className="w-full rounded-md shadow-lg aspect-video bg-black"
                controls
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                playsInline
                preload="auto"
                poster="public/lovable-uploads/b8cbf728-7e07-4502-b0bf-3116732e1134.png"
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="w-full max-w-xl aspect-video flex items-center justify-center bg-gray-200 rounded-md">
              <div className="text-center">
                <Film className="h-12 w-12 mx-auto mb-2 text-gray-500" />
                <p className="text-gray-500">
                  {isGenerating 
                    ? 'Generating video...' 
                    : videoError 
                      ? 'Error loading video. Please try again.' 
                      : 'No video generated yet. Click "Generate Video" to create one.'}
                </p>
              </div>
            </div>
          )}
        </CardContent>
        {videoUrl && (
          <CardFooter className="justify-end">
            <Button onClick={handleDownload} variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download Video</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  );
};

export default VideoGeneratorSection;
