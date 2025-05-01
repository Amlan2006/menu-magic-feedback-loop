import { useState, useEffect } from 'react';
import { Star, Clock, ThumbsUp, ThumbsDown, Filter } from 'lucide-react';

interface Feedback {
  id: string;
  dishName: string;
  rating: number;
  comment: string;
  timestamp: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  customerName: string;
}

export function FeedbackManagement() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulated feedback data - replace with actual API call
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Simulate API call
        setTimeout(() => {
          setFeedbackList([
            {
              id: '1',
              dishName: 'Chicken Biryani',
              rating: 5,
              comment: 'Absolutely delicious! The flavors were perfect.',
              timestamp: '2024-05-01T10:30:00',
              sentiment: 'positive',
              customerName: 'John Doe'
            },
            {
              id: '2',
              dishName: 'Butter Chicken',
              rating: 3,
              comment: 'Good but could use more spice.',
              timestamp: '2024-05-01T11:15:00',
              sentiment: 'neutral',
              customerName: 'Jane Smith'
            },
            {
              id: '3',
              dishName: 'Paneer Tikka',
              rating: 2,
              comment: 'Too dry and lacked flavor.',
              timestamp: '2024-05-01T12:00:00',
              sentiment: 'negative',
              customerName: 'Mike Johnson'
            }
          ]);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching feedback:', error);
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const filteredFeedback = feedbackList.filter(feedback => 
    filter === 'all' ? true : feedback.sentiment === filter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-5 h-5 text-green-500" />;
      case 'negative':
        return <ThumbsDown className="w-5 h-5 text-red-500" />;
      default:
        return <ThumbsUp className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Food Feedback</h1>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Feedback</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredFeedback.map((feedback) => (
            <div
              key={feedback.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{feedback.dishName}</h3>
                  <p className="text-sm text-gray-500">by {feedback.customerName}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getSentimentIcon(feedback.sentiment)}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700">{feedback.comment}</p>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                {formatDate(feedback.timestamp)}
              </div>
            </div>
          ))}
          
          {filteredFeedback.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No feedback found for the selected filter.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 