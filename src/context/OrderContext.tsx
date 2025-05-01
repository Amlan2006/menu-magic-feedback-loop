import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Order, OrderStatus, CartItem } from "../types/menu";
import { useUser } from "./UserContext";
import { toast } from "@/components/ui/sonner";

interface OrderContextType {
  orders: Order[];
  pendingOrders: Order[];
  userOrders: Order[];
  placeOrder: (items: CartItem[], totalAmount: number) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Mock orders for development
const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    items: [
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 12.99,
        category: 'Main Courses',
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
        tags: ['vegetarian'],
        nutritionInfo: {
          calories: 850,
          protein: 25,
          carbs: 95,
          fat: 35,
          allergens: ['dairy', 'gluten']
        },
        averageRating: 4.5,
        reviewCount: 120,
        popular: true,
        quantity: 2
      }
    ],
    totalAmount: 25.98,
    status: 'completed',
    placedAt: '2023-07-15T10:30:00Z',
    completedAt: '2023-07-15T10:55:00Z'
  }
];

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const { user } = useUser();

  // Load orders from localStorage on startup
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Failed to parse stored orders:', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Filter orders that are still pending (not completed or cancelled)
  const pendingOrders = orders.filter(
    order => order.status !== 'completed' && order.status !== 'cancelled'
  );

  // Filter orders that belong to the current user
  const userOrders = user 
    ? orders.filter(order => order.userId === user.id)
    : [];

  const placeOrder = async (items: CartItem[], totalAmount: number) => {
    if (!user) {
      toast.error('You need to be logged in to place an order');
      throw new Error('User not authenticated');
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newOrder: Order = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      items,
      totalAmount,
      status: 'pending',
      placedAt: new Date().toISOString()
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    toast.success('Order placed successfully!');
    
    return;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder = { 
            ...order, 
            status,
            ...(status === 'completed' ? { completedAt: new Date().toISOString() } : {})
          };
          return updatedOrder;
        }
        return order;
      })
    );

    toast.success(`Order #${orderId.slice(-4)} updated to ${status}`);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <OrderContext.Provider 
      value={{ 
        orders, 
        pendingOrders, 
        userOrders, 
        placeOrder, 
        updateOrderStatus, 
        getOrderById 
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}; 