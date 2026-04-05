import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { companies } from '@/lib/data';
import { Bot, Save, Send } from 'lucide-react';

export default function NewArticlePage() {
  const categories = ['AI', 'Big Tech', 'Hardware', 'Society', 'Virtual Reality'];

  return (
    <>
      <Header title="Create New Article" />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>New Article Details</CardTitle>
              <CardDescription>
                Fill out the form below to create a new article.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter article title" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Write your article content here..." rows={15} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">AI Summary</Label>
                <Textarea id="summary" placeholder="Click 'Generate with AI' or write a manual summary..." rows={4} />
                 <Button variant="outline" size="sm">
                  <Bot className="mr-2 h-4 w-4" />
                  Generate with AI
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="e.g., AI, Quantum Computing, Startups" />
                  <p className="text-xs text-muted-foreground">Separate tags with commas.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <Input id="image-url" placeholder="https://example.com/image.png" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Associated Company (optional)</Label>
                  <Select>
                    <SelectTrigger id="company">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {companies.map(comp => (
                        <SelectItem key={comp.id} value={comp.id}>{comp.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Publish Article
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </>
  );
}
