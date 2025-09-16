import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { Price } from '../components/Price';
import { Card } from '@adventuringghost/ui';
import type { Order } from '../types';

export const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Load order from localStorage
      const orders = JSON.parse(localStorage.getItem('glow-grove-orders') || '[]');
      const foundOrder = orders.find((o: Order) => o.id === id);
      setOrder(foundOrder || null);
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sunrise-pink mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <>
        <SEO
          title="Order Not Found - Glow+Grove"
          description="The order you are looking for does not exist."
        />
        <div className="text-center py-16 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">Order Not Found</h1>
          <p className="text-lg text-gray-600">
            We couldn't find the order you're looking for.
          </p>
          <Link to="/products" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <SEO
        title={`Order ${order.id} - Glow+Grove`}
        description="Thank you for your order! Here are your order details."
      />
      
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-sunrise-pink to-sunrise-orange rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
            <p className="text-gray-600">Your order has been confirmed</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <div>
              <Card>
                <h2 className="text-xl font-semibold mb-6">Order Details</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">{formatDate(order.orderDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {order.status}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="mt-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                
                <div className="space-y-2">
                  <p className="font-medium">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.address}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.country}</p>
                  <p className="text-gray-600">{order.shippingAddress.email}</p>
                  <p className="text-gray-600">{order.shippingAddress.phone}</p>
                </div>
              </Card>
            </div>

            {/* Order Items */}
            <div>
              <Card>
                <h2 className="text-xl font-semibold mb-6">Order Items</h2>
                
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-pastel-rose to-pastel-sky rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          <Price amount={item.price} /> × {item.quantity}
                        </p>
                      </div>
                      <div className="font-medium">
                        <Price amount={parseFloat(item.price.replace('$', '')) * item.quantity} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      <Price amount={order.subtotal} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      <Price amount={order.shipping} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      <Price amount={order.tax} />
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold text-sunrise-pink">
                      <Price amount={order.total} />
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="text-center mt-8 space-y-4">
            <p className="text-gray-600">
              We'll send you an email confirmation with tracking information once your order ships.
            </p>
            <div className="space-x-4">
              <Link to="/products" className="btn-primary">
                Continue Shopping
              </Link>
              <Link to="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};









