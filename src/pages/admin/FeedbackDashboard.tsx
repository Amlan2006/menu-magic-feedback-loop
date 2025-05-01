import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, MessageSquare, Trash2, UserCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { feedbackStore } from '@/components/UserFeedback';

interface FeedbackItem {
  id: string;
  userId: string;
  userName: string;
  menuItemId?: string;
  menuItemName?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export function FeedbackDashboard() {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Load feedback data
    setFeedback([...feedbackStore]);
  }, []);

  const handleDeleteFeedback = (id: string) => {
    // In a real app, this would be an API call
    const index = feedbackStore.findIndex(f => f.id === id);
    if (index !== -1) {
      feedbackStore.splice(index, 1);
      setFeedback([...feedbackStore]);
      toast.success('Feedback deleted successfully');
    }
  };

  // Calculate average rating
  const averageRating = feedback.length > 0
    ? (feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length).toFixed(1)
    : 'N/A';

  // Filter feedback by rating
  const filteredFeedback = activeTab === 'all'
    ? feedback
    : feedback.filter(f => {
        if (activeTab === 'positive') return f.rating >= 4;
        if (activeTab === 'neutral') return f.rating === 3;
        if (activeTab === 'negative') return f.rating <= 2;
        return true;
      });

  // Sort by date descending
  const sortedFeedback = [...filteredFeedback].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Customer Feedback</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <MessageSquare className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-3xl font-bold">{feedback.length}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-3xl font-bold">{averageRating}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">User Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserCircle className="w-6 h-6 text-green-500 mr-2" />
              <span className="text-3xl font-bold">
                {new Set(feedback.map(f => f.userId)).size}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="positive">Positive (4-5)</TabsTrigger>
          <TabsTrigger value="neutral">Neutral (3)</TabsTrigger>
          <TabsTrigger value="negative">Negative (1-2)</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Menu Item</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Comment</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedFeedback.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No feedback found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedFeedback.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.userName}</TableCell>
                        <TableCell>
                          {item.menuItemName || 'General Feedback'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className={`w-4 h-4 ${
                              item.rating >= 4 ? 'text-green-500' :
                              item.rating === 3 ? 'text-yellow-500' :
                              'text-red-500'
                            } mr-1`} />
                            <span>{item.rating}/5</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{item.comment}</TableCell>
                        <TableCell className="text-sm">
                          {new Date(item.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteFeedback(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 