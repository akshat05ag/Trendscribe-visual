
import { NewsArticle } from "@/components/NewsScraperSection";

// Mock image URLs for different categories (in a real app, these would be generated or fetched)
const categoryImages: Record<string, string[]> = {
  general: [
    'https://images.unsplash.com/photo-1495020689067-958852a7765e',
    'https://images.unsplash.com/photo-1585829365295-ab7cd400c167',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
  ],
  business: [
    'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    'https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e',
  ],
  technology: [
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    'https://images.unsplash.com/photo-1518770660439-4636190af475',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
  ],
  entertainment: [
    'https://images.unsplash.com/photo-1603190287605-e6ade32fa852',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
    'https://images.unsplash.com/photo-1509695507497-903c140c43b0',
  ],
  health: [
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef',
  ],
  science: [
    'https://images.unsplash.com/photo-1507668077129-56e32842fceb',
    'https://images.unsplash.com/photo-1628595351029-c2bf17511435',
    'https://images.unsplash.com/photo-1628815116524-daab3aa88623',
  ],
  sports: [
    'https://images.unsplash.com/photo-1475440197469-e367ec8eeb19',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211',
    'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1',
  ],
};

// These are reliable MP4 video URLs for better playback
const styleVideos: Record<string, string> = {
  modern: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  minimal: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  bold: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  professional: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  casual: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
};

// Function to get random image for a category
const getRandomImage = (category: string): string => {
  const images = categoryImages[category] || categoryImages.general;
  return images[Math.floor(Math.random() * images.length)];
};

// In a real application, this would use an actual video generation API
export const generateVideo = async (
  script: string, 
  article: NewsArticle, 
  duration: number, 
  style: string,
  onProgress: (progress: number) => void
): Promise<string> => {
  console.log("Starting video generation with style:", style);
  
  // Simulate video generation process
  return new Promise((resolve) => {
    let progress = 0;
    
    // Simulate progress updates
    const interval = setInterval(() => {
      progress += 5;
      onProgress(Math.min(progress, 95));
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
    
    // After "processing," return the video URL
    setTimeout(() => {
      clearInterval(interval);
      onProgress(100);
      const videoUrl = styleVideos[style] || styleVideos.modern;
      console.log("Video generation complete, URL:", videoUrl);
      resolve(videoUrl);
    }, 5000);
  });
};
