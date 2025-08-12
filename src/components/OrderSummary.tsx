import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, User, Phone, MapPin, ArrowLeft, CreditCard, Package, Truck, Shield, Star } from 'lucide-react';
import { useDemo } from '../contexts/DemoContext';

const OrderSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, orderData } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { updateOrderStatus } = useDemo();

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">Please start your order from the beginning.</p>
          <Link 
            to="/" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      const result = await updateOrderStatus(orderId, 'confirmed');

      if (!result.success) {
        console.error('Error updating order:', result.error);
      } else {
        setOrderPlaced(true);
        // Email notification will be sent automatically through the context
      }
    } catch (err) {
      console.error('Error placing order:', err);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 relative overflow-hidden">
        {/* Success Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full text-center"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-emerald-100">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
              <p className="text-gray-600 mb-6 text-lg">
                Your order has been confirmed and will be processed soon. You'll receive updates via SMS and email.
              </p>
              
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 mb-6 border border-emerald-200">
                <p className="text-sm text-emerald-600 mb-2 font-semibold">Order ID:</p>
                <p className="font-mono text-xl font-bold text-emerald-700">{orderId}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center text-emerald-600">
                  <Truck className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Delivery in 3-5 business days</span>
                </div>
                <div className="flex items-center justify-center text-emerald-600">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">Secure payment processed</span>
                </div>
              </div>

              <Link
                to="/"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 px-8 rounded-2xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 text-lg shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 inline-flex items-center justify-center"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="hidden"></div>
      
      <div className="relative z-10 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center text-white/70 hover:text-white transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Order Summary</h1>
            <p className="text-gray-600 text-xl">Review your order details before placing it</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShoppingBag className="h-6 w-6 mr-3 text-red-500" />
                  Product Details
                </h2>
                {orderData.items?.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-6 border-b border-white/10 last:border-b-0">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.product_name}</h3>
                      <p className="text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600 mb-1">Qty: {item.quantity}</p>
                      <p className="text-2xl font-bold text-red-600">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-3 text-red-500" />
                  Shipping Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <User className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-semibold text-gray-900 text-lg">{orderData.customerInfo?.name || orderData.guest_name}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-semibold text-gray-900 text-lg">{orderData.customerInfo?.phone || orderData.guest_phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-red-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500">Shipping Address</p>
                      <p className="font-semibold text-gray-900 text-lg">{orderData.customerInfo?.address || orderData.guest_address}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
                
                {/* Price Breakdown */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-700 text-lg">
                    <span>Subtotal:</span>
                    <span>₹{orderData.total_amount}</span>
                  </div>
                  {orderData.discount_amount > 0 && (
                    <div className="flex justify-between text-green-600 text-lg">
                      <span>Discount (1%):</span>
                      <span>-₹{orderData.discount_amount}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-2xl font-bold text-gray-900">
                      <span>Total:</span>
                      <span>₹{orderData.final_amount}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold py-5 px-8 rounded-2xl hover:from-red-700 hover:to-amber-700 focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xl shadow-2xl transform hover:scale-105 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-6 w-6 mr-3" />
                      Place Order
                    </>
                  )}
                </button>

                {/* Additional Info */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-slate-300 space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-sm">Order processed within 24-48 hours</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-sm">Delivery in 3-5 business days</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-sm">SMS & email updates on order status</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span className="text-sm">Secure payment processing</span>
                    </div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-center space-x-4 text-slate-400">
                    <Shield className="h-5 w-5" />
                    <span className="text-sm">Secure Checkout</span>
                    <Star className="h-5 w-5" />
                    <span className="text-sm">Premium Service</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
