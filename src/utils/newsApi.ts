
import { NewsArticle } from "@/components/NewsScraperSection";

// Mocked responses for each category since we're not using a real API at the moment
const mockNewsData: Record<string, Omit<NewsArticle, 'id'>[]> = {
  general: [
    {
      title: "Global Climate Summit Set to Begin Next Week",
      description: "Leaders from over 100 countries are expected to attend the conference to discuss new measures to combat climate change and reduce carbon emissions globally.",
      source: "World News Network",
      category: "general",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Tech Giants Face New Regulations in European Union",
      description: "New digital market regulations aim to limit the power of technology monopolies and ensure fair competition in the digital marketplace.",
      source: "Tech Insider",
      category: "general",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Historic Peace Deal Signed in Middle East",
      description: "After decades of conflict, regional powers have agreed to a comprehensive peace framework that includes economic cooperation and security guarantees.",
      source: "Global Affairs",
      category: "general",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Inflation Rates Continue to Rise Globally",
      description: "Central banks worldwide are considering further interest rate hikes as inflation reaches multi-decade highs in several major economies.",
      source: "Economic Times",
      category: "general",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
  ],
  business: [
    {
      title: "Major Merger Reshapes Airline Industry",
      description: "Two leading airlines have announced a $40 billion merger, creating one of the world's largest air carriers and reshaping the competitive landscape.",
      source: "Business Daily",
      category: "business",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Stock Markets Reach All-Time High",
      description: "Global markets have surged to record levels driven by strong corporate earnings and optimistic economic forecasts despite inflation concerns.",
      source: "Financial Review",
      category: "business",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Cryptocurrencies Face Increased Regulation",
      description: "Government agencies worldwide are introducing new frameworks to regulate digital currencies amid concerns about financial stability and consumer protection.",
      source: "Crypto News",
      category: "business",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Supply Chain Issues Continue to Impact Global Trade",
      description: "Manufacturing delays and shipping bottlenecks persist, affecting everything from consumer electronics to automotive production worldwide.",
      source: "Trade Monitor",
      category: "business",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
  ],
  technology: [
    {
      title: "Revolutionary AI Model Can Generate Realistic Videos from Text",
      description: "Researchers have released a new AI system capable of generating high-quality videos from simple text prompts, raising both excitement and ethical concerns.",
      source: "Tech Crunch",
      category: "technology",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Quantum Computing Breakthrough Solves Complex Problem",
      description: "Scientists have used a quantum computer to solve a complex problem that would take traditional computers millennia, marking a significant milestone in computing.",
      source: "Quantum Review",
      category: "technology",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "New Smartphone Launch Features Revolutionary Camera System",
      description: "The latest flagship device boasts computational photography capabilities that rival professional camera equipment in a compact form factor.",
      source: "Gadget News",
      category: "technology",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Electric Vehicle Battery Technology Advances Significantly",
      description: "A new battery design promises to double the range of electric vehicles while reducing charging time to under 10 minutes, potentially accelerating EV adoption.",
      source: "EV Today",
      category: "technology",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
  ],
  entertainment: [
    {
      title: "Blockbuster Movie Breaks Box Office Records",
      description: "The latest superhero film has shattered opening weekend records, generating over $300 million in global ticket sales.",
      source: "Entertainment Weekly",
      category: "entertainment",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Popular Streaming Series Renewed for Multiple Seasons",
      description: "Following its critical acclaim and massive viewership, the hit show has been greenlit for three additional seasons.",
      source: "Stream News",
      category: "entertainment",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Music Festival Announces Star-Studded Lineup",
      description: "The annual event will feature performances from over 50 major artists across multiple genres, expected to draw record crowds.",
      source: "Music Buzz",
      category: "entertainment",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Legendary Actor Announces Retirement After 50-Year Career",
      description: "The acclaimed performer revealed plans to step away from the silver screen after completing work on their final film project next year.",
      source: "Hollywood Reporter",
      category: "entertainment",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
  ],
  health: [
    {
      title: "New Cancer Treatment Shows Promising Results in Clinical Trials",
      description: "A novel immunotherapy approach has demonstrated unprecedented success rates in treating previously untreatable forms of cancer.",
      source: "Medical Journal",
      category: "health",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Global Health Organization Warns of New Respiratory Virus",
      description: "Health officials are monitoring the spread of a newly identified virus that causes severe respiratory symptoms in vulnerable populations.",
      source: "Health Alert",
      category: "health",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Breakthrough in Alzheimer's Research Offers Hope",
      description: "Scientists have identified a key mechanism that could lead to new treatments for preventing or slowing the progression of Alzheimer's disease.",
      source: "Neuroscience Today",
      category: "health",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Study Links Gut Microbiome to Improved Mental Health",
      description: "Comprehensive research has established strong connections between gut bacteria composition and various mental health conditions, suggesting new treatment paths.",
      source: "Psychology News",
      category: "health",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
  ],
  science: [
    {
      title: "Astronomers Discover Earth-Like Planet in Habitable Zone",
      description: "The newly found exoplanet orbits a sun-like star at a distance that could potentially support liquid water and possibly life.",
      source: "Space Science",
      category: "science",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Glacial Melt Accelerating at Unprecedented Rate",
      description: "New satellite data reveals that polar ice sheets are losing mass at a rate three times faster than in the 1990s, raising concerns about sea level rise.",
      source: "Climate Science",
      category: "science",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Revolutionary Material Could Transform Energy Storage",
      description: "Scientists have developed a new compound that can store and release energy with unprecedented efficiency, with potential applications in renewable energy.",
      source: "Materials Research",
      category: "science",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Genetic Engineering Breakthrough Eliminates Disease in Animal Model",
      description: "Using CRISPR technology, researchers have successfully eliminated a hereditary disease from mice and their offspring, showing promise for human applications.",
      source: "Genetics Journal",
      category: "science",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
  ],
  sports: [
    {
      title: "Underdog Team Wins Championship in Stunning Upset",
      description: "In one of the biggest surprises in sports history, the lowest-ranked team has defeated the defending champions to claim the title.",
      source: "Sports Center",
      category: "sports",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Star Athlete Signs Record-Breaking Contract",
      description: "The unprecedented deal makes them the highest-paid player in the history of the sport, worth over $500 million over 10 years.",
      source: "Sports Business",
      category: "sports",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Olympic Committee Announces New Events for Next Games",
      description: "Several new sports will debut at the upcoming Olympic Games, reflecting changing global interests and increasing diversity in athletics.",
      source: "Olympic News",
      category: "sports",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
    {
      title: "Major Doping Scandal Rocks Professional Sports League",
      description: "An investigation has revealed systematic performance enhancement drug use across multiple teams, leading to suspensions and a comprehensive review.",
      source: "Sports Integrity",
      category: "sports",
      url: "#",
      publishedAt: new Date().toISOString(),
    },
  ],
};

export const fetchTrendingNews = async (category: string = 'general'): Promise<NewsArticle[]> => {
  // In a real application, this would make an API call to a news service
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      const categoryNews = mockNewsData[category] || mockNewsData.general;
      
      // Add unique IDs to each article
      const articlesWithIds = categoryNews.map((article, index) => ({
        ...article,
        id: `${category}-${index}`,
      }));
      
      resolve(articlesWithIds);
    }, 1500);
  });
};

// In a real application, you would implement a function to fetch from an actual news API
// For example:
/*
export const fetchRealTrendingNews = async (category: string = 'general'): Promise<NewsArticle[]> => {
  const API_KEY = 'your-api-key';
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?category=${category}&language=en&apiKey=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }
  
  const data = await response.json();
  
  return data.articles.map((article: any, index: number) => ({
    id: `${category}-${index}`,
    title: article.title,
    description: article.description || 'No description available',
    source: article.source.name,
    category: category,
    url: article.url,
    publishedAt: article.publishedAt,
  }));
};
*/
