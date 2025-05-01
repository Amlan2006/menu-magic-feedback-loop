import { Users, MessageSquare, BarChart2, Clock, ShoppingBag } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import { formatDistance } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 200 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 800 },
  { name: 'Sun', value: 700 },
];

export function Dashboard() {
  const { orders, pendingOrders } = useOrders();
  const navigate = useNavigate();

  // Get only active orders, sorted by newest first
  const activeOrders = [...pendingOrders].sort(
    (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
  ).slice(0, 5); // Take only the most recent 5

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price * 80); // Converting to Rupees (assuming 1 USD = 80 INR)
  };

  const getTimeAgo = (dateString: string) => {
    return formatDistance(new Date(dateString), new Date(), { addSuffix: true });
  };

  // Calculate total revenue for today
  const today = new Date().toDateString();
  const todayRevenue = orders
    .filter(order => new Date(order.placedAt).toDateString() === today)
    .reduce((sum, order) => sum + order.totalAmount, 0);

  const stats = [
    { title: 'Today\'s Revenue', value: formatPrice(todayRevenue), icon: BarChart2, change: '+12%' },
    { title: 'Active Orders', value: pendingOrders.length.toString(), icon: ShoppingBag, change: '+8%' },
    { title: 'Total Customers', value: new Set(orders.map(o => o.userId)).size.toString(), icon: Users, change: '+5%' },
    { title: 'Avg. Preparation Time', value: '15m', icon: Clock, change: '-2m' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <stat.icon className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex justify-between">
              Recent Orders
              <Button variant="link" onClick={() => navigate('/admin/orders')}>
                View All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No active orders
                    </TableCell>
                  </TableRow>
                ) : (
                  activeOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">#{order.id.slice(-4)}</TableCell>
                      <TableCell>{order.userName}</TableCell>
                      <TableCell>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</TableCell>
                      <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          order.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                          order.status === 'preparing' ? 'bg-blue-50 text-blue-700' :
                          'bg-green-50 text-green-700'
                        }>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{getTimeAgo(order.placedAt)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 