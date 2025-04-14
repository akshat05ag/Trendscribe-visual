
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Pencil, Copy, Check } from 'lucide-react';
import { generateScript } from '@/utils/scriptGenerator';
import { useToast } from '@/components/ui/use-toast';
import { NewsArticle } from './NewsScraperSection';

interface ScriptGeneratorSectionProps {
  selectedArticle: NewsArticle | null;
  onScriptGenerated: (script: string) => void;
}

const ScriptGeneratorSection: React.FC<ScriptGeneratorSectionProps> = ({ 
  selectedArticle, 
  onScriptGenerated 
}) => {
  const [script, setScript] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { toast } = useToast();

  const handleGenerateScript = async () => {
    if (!selectedArticle) {
      toast({
        variant: 'destructive',
        title: 'No article selected',
        description: 'Please select an article first from the News Scraper section',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const generatedScript = await generateScript(selectedArticle);
      setScript(generatedScript);
      setEditMode(false);
      onScriptGenerated(generatedScript);
      toast({
        title: 'Script generated',
        description: 'You can now edit the script or proceed to generate a video',
      });
    } catch (error) {
      console.error('Error generating script:', error);
      toast({
        variant: 'destructive',
        title: 'Error generating script',
        description: 'Please try again later',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(script);
    setIsCopied(true);
    toast({
      title: 'Script copied to clipboard',
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleScriptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setScript(e.target.value);
  };

  const handleSaveEdit = () => {
    setEditMode(false);
    onScriptGenerated(script);
    toast({
      title: 'Script updated',
      description: 'Your edits have been saved',
    });
  };

  return (
    <section className="section-container gradient-bg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Sparkles className="h-6 w-6 text-secondary" />
          <h2 className="text-xl font-bold">AI Script Generator</h2>
        </div>
        <Button
          onClick={handleGenerateScript}
          disabled={isGenerating || !selectedArticle}
          className="bg-secondary hover:bg-secondary/90"
        >
          {isGenerating ? 'Generating...' : 'Generate Script'}
        </Button>
      </div>

      <Card className="bg-black/20 border-secondary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex justify-between items-center">
            <span>
              {selectedArticle 
                ? `Script based on: ${selectedArticle.title}` 
                : 'No article selected yet'}
            </span>
            {script && !editMode && (
              <Button variant="ghost" size="sm" onClick={() => setEditMode(true)}>
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
            )}
            {script && editMode && (
              <Button variant="outline" size="sm" onClick={handleSaveEdit}>
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isGenerating ? (
            <div className="h-32 relative overflow-hidden bg-gradient-to-r from-transparent via-secondary/10 to-transparent bg-[length:200%_100%] animate-shimmer">
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-secondary animate-pulse" />
              </div>
            </div>
          ) : editMode ? (
            <Textarea
              value={script}
              onChange={handleScriptChange}
              className="min-h-32 bg-black/10 border-secondary/20"
              placeholder="Edit your script here..."
            />
          ) : (
            <div className="min-h-32 bg-black/10 p-3 rounded-md whitespace-pre-line">
              {script || (
                <span className="text-muted-foreground italic">
                  {selectedArticle 
                    ? 'Click "Generate Script" to create a script based on the selected article'
                    : 'Select an article first from the News Scraper section'}
                </span>
              )}
            </div>
          )}
        </CardContent>
        {script && !editMode && (
          <CardFooter className="justify-end">
            <Button variant="outline" size="sm" onClick={handleCopyScript}>
              {isCopied ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </section>
  );
};

export default ScriptGeneratorSection;
