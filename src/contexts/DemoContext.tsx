import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  user_id?: string;
  guest_name: string;
  guest_phone: string;
  guest_address: string;
  items: any[];
  total_amount: number;
  discount_amount: number;
  final_amount: number;
  is_guest: boolean;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  created_at: string;
}

interface DemoContextType {
  currentUser: User | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Omit<User, 'id'>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  createOrder: (orderData: Omit<Order, 'id' | 'created_at'>) => Promise<{ success: boolean; orderId?: string; error?: string }>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<{ success: boolean; error?: string }>;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (context === undefined) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};

interface DemoProviderProps {
  children: ReactNode;
}

export const DemoProvider: React.FC<DemoProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderCounter, setOrderCounter] = useState(1);

  // Load user data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('demoUser');
    const savedOrders = localStorage.getItem('demoOrders');
    const savedCounter = localStorage.getItem('orderCounter');
    
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
    
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
    
    if (savedCounter) {
      setOrderCounter(parseInt(savedCounter));
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('demoUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('demoUser');
    }
  }, [currentUser]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('demoOrders', JSON.stringify(orders));
  }, [orders]);

  // Save order counter to localStorage
  useEffect(() => {
    localStorage.setItem('orderCounter', orderCounter.toString());
  }, [orderCounter]);

  // Pure-frontend mode: no backend. Emails are logged to console only.

  const login = async (email: string, password: string) => {
    try {
      // Local demo mode - check localStorage for registered users
      const savedUser = localStorage.getItem('demoUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === email) {
          setCurrentUser(user);
          console.log('✅ User logged in via localStorage:', user);
          return { success: true };
        }
      }

      // Check for demo user
      if (email === 'demo@example.com' && password === 'demo123') {
        const demoUser: User = {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User',
          phone: '9876543210',
          address: '123 Demo Street, Demo City, Demo State - 123456'
        };
        setCurrentUser(demoUser);
        console.log('✅ Demo user logged in:', demoUser);
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials. Please check your email and password.' };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (userData: Omit<User, 'id'>) => {
    try {
      // Pure local demo mode
      const newUser: User = {
        ...userData,
        id: Date.now().toString()
      };
      
      setCurrentUser(newUser);
      console.log('✅ User registered via localStorage:', newUser);
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err);
      // Fallback to demo mode
      const newUser: User = {
        ...userData,
        id: Date.now().toString()
      };
      
      setCurrentUser(newUser);
      console.log('✅ User registered via localStorage (fallback):', newUser);
      return { success: true };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    console.log('✅ User logged out');
  };

  const createOrder = async (orderData: Omit<Order, 'id' | 'created_at'>) => {
    try {
      const orderId = `order_${Date.now()}`;
      const newOrder: Order = {
        ...orderData,
        id: orderId,
        created_at: new Date().toISOString()
      };

      // Fallback to localStorage
      setOrders(prev => [...prev, newOrder]);
      setOrderCounter(prev => prev + 1);
      
      console.log('✅ Order stored in localStorage:', newOrder);
      
      // Email notifications (console only in pure-frontend mode)
      await sendOrderEmail(newOrder, false);
      
      return { success: true, orderId: newOrder.id };
    } catch (err) {
      console.error('Order creation error:', err);
      // Fallback to localStorage
      const newOrder: Order = {
        ...orderData,
        id: `order_${orderCounter}`,
        created_at: new Date().toISOString()
      };
      
      setOrders(prev => [...prev, newOrder]);
      setOrderCounter(prev => prev + 1);
      
      console.log('✅ Order stored in localStorage (fallback):', newOrder);
      
      // Send email notifications only in fallback local mode
      await sendOrderEmail(newOrder, false);
      
      return { success: true, orderId: newOrder.id };
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      // Update local state
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
      
      // Send confirmation email when order is confirmed
      if (status === 'confirmed') {
        const order = orders.find(o => o.id === orderId);
        if (order) {
          await sendOrderConfirmationEmail(order);
        }
      }
      
      return { success: true };
    } catch (err) {
      console.error('Order status update error:', err);
      // Fallback to localStorage
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId ? { ...order, status } : order
        )
      );
      
      // Send confirmation email when order is confirmed
      if (status === 'confirmed') {
        const order = orders.find(o => o.id === orderId);
        if (order) {
          await sendOrderConfirmationEmail(order);
        }
      }
      
      return { success: true };
    }
  };

  // No realtime in pure-frontend mode

  const sendOrderEmail = async (order: Order, isSupabase: boolean) => {
    try {
      // Map order to edge function payload
      const totalQuantity = Array.isArray(order.items)
        ? order.items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0)
        : Number((order as any).quantity) || 1;

      const primaryProductName = Array.isArray(order.items) && order.items.length > 0
        ? (order.items.length === 1
            ? order.items[0].product_name
            : `${order.items[0].product_name} (+${order.items.length - 1} more)`)
        : (order as any).product_name || 'Order';

      const payload = {
        order_id: order.id,
        product_name: primaryProductName,
        quantity: totalQuantity,
        buyer_name: order.guest_name,
        buyer_email: '', // Not captured in demo order
        buyer_phone: order.guest_phone,
        buyer_address: order.guest_address,
      };

      console.log('📧 NEW ORDER EMAIL (Console Only):', {
        to: 'Shreeraagaswaadghar@gmail.com',
        subject: '🛒 New Order Placed - Shree Raaga SWAAD GHAR',
        body: payload,
        orderId: order.id,
      });
    } catch (err) {
      console.error('Error sending order email:', err);
    }
  };

  const sendOrderConfirmationEmail = async (order: Order) => {
    try {
      const emailData = {
        to: 'Shreeraagaswaadghar@gmail.com',
        subject: '✅ Order Confirmed - Shree Raaga SWAAD GHAR',
        body: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Order Confirmed - Shree Raaga SWAAD GHAR</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #4caf50 0%, #45a049 100%); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .order-details { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .customer-info { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .product-list { margin: 15px 0; }
        .product-item { padding: 10px; border-bottom: 1px solid #eee; }
        .price-summary { background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .footer { background: #f5f5f5; padding: 15px; text-align: center; color: #666; }
    </style>
</head>
<body>
    <div class="header">
        <h1>✅ Order Confirmed</h1>
        <p>Shree Raaga SWAAD GHAR</p>
    </div>
    
    <div class="content">
        <h2>Order Confirmation</h2>
        <div class="order-details">
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Status:</strong> <span style="color: #4caf50; font-weight: bold;">CONFIRMED</span></p>
            <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
        </div>

        <h2>Customer Information</h2>
        <div class="customer-info">
            <p><strong>Name:</strong> ${order.guest_name}</p>
            <p><strong>Phone:</strong> ${order.guest_phone}</p>
            <p><strong>Address:</strong> ${order.guest_address}</p>
        </div>

        <h2>Product Details</h2>
        <div class="product-list">
            ${order.items.map((item, index) => `
                <div class="product-item">
                    <h4>${index + 1}. ${item.product_name}</h4>
                    <p><strong>Category:</strong> ${item.category}</p>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                    <p><strong>Price:</strong> ₹${item.price}</p>
                </div>
            `).join('')}
        </div>

        <h2>Final Amount</h2>
        <div class="price-summary">
            <p><strong>Total Amount:</strong> ₹${order.final_amount}</p>
        </div>

        <h2>Next Steps</h2>
        <ol>
            <li>Prepare the order for packaging</li>
            <li>Update inventory</li>
            <li>Arrange for delivery</li>
            <li>Send tracking information to customer</li>
        </ol>

        <p>Please ensure timely delivery and excellent customer service.</p>
    </div>

    <div class="footer">
        <p>Best regards,<br>Your Website System</p>
        <p><small>This email was sent automatically from the database system.</small></p>
    </div>
</body>
</html>
        `.trim(),
        orderId: order.id
      };

      // Console only in pure-frontend mode
      console.log('📧 ORDER CONFIRMATION EMAIL (Console Only):', emailData);
      
    } catch (err) {
      console.error('Error sending confirmation email:', err);
    }
  };

  const value: DemoContextType = {
    currentUser,
    orders,
    login,
    register,
    logout,
    createOrder,
    updateOrderStatus
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
};
