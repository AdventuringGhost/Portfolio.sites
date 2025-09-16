import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useCart } from '../contexts/CartContext';
import { Price } from '../components/Price';
import { Card, Input } from '@adventuringghost/ui';
import type { ShippingAddress } from '../types';

type ShippingOption = {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
};

const shippingOptions: ShippingOption[] = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, estimatedDays: '5-7 business days' },
  { id: 'express', name: 'Express Shipping', price: 12.99, estimatedDays: '2-3 business days' },
  { id: 'overnight', name: 'Overnight Shipping', price: 24.99, estimatedDays: '1 business day' },
  { id: 'free', name: 'Free Shipping', price: 0, estimatedDays: '7-10 business days' }
];

export const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [selectedShipping, setSelectedShipping] = useState<string>('free');
  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping);
  const subtotal = cart.total;
  const shipping = selectedShippingOption?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Analytics
  console.log('begin_checkout', {
    items: cart.items.map(item => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    value: total
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate mock order
    const orderId = `ORD-${Date.now()}`;
    const order = {
      id: orderId,
      items: cart.items,
      subtotal,
      shipping,
      tax,
      total,
      shippingAddress: formData,
      shippingOption: selectedShippingOption,
      orderDate: new Date().toISOString(),
      status: 'confirmed' as const
    };

    // Store order in localStorage (in a real app, this would go to a database)
    const orders = JSON.parse(localStorage.getItem('glow-grove-orders') || '[]');
    orders.push(order);
    localStorage.setItem('glow-grove-orders', JSON.stringify(orders));

    // Analytics
    console.log('purchase', {
      transaction_id: orderId,
      value: total,
      items: cart.items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });

    // Clear cart and navigate to order confirmation
    clearCart();
    navigate(`/order/${orderId}`);
  };

  if (cart.items.length === 0) {
    return (
      <>
        <SEO
          title="Checkout - Glow+Grove"
          description="Complete your purchase with secure checkout."
        />
        <div className="text-center py-16">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Please add some products to your cart before checkout.</p>
          <a href="/products" className="btn-primary">
            Continue Shopping
          </a>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Checkout - Glow+Grove"
        description="Complete your purchase with secure checkout."
      />
      
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-600">Complete your purchase</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card>
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                      </label>
                      <Input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <Input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <Input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <Input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <Input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </Card>

              {/* Shipping Options */}
              <Card>
                <h2 className="text-xl font-semibold mb-6">Shipping Options</h2>
                
                <div className="space-y-4">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        selectedShipping === option.id
                          ? 'border-sunrise-green bg-sunrise-green/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={selectedShipping === option.id}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-gray-900">{option.name}</h3>
                            <p className="text-sm text-gray-500">{option.estimatedDays}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-medium text-gray-900">
                              {option.price === 0 ? 'Free' : <Price amount={option.price} />}
                            </span>
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </Card>

              {/* Payment Disclaimer */}
              <Card>
                <div className="text-center p-8 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pastel-green to-pastel-lime rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Site Notice</h3>
                  <p className="text-gray-600 mb-4">
                    This is a demonstration e-commerce site. No real payments will be processed.
                  </p>
                  <p className="text-sm text-gray-500">
                    Your order will be simulated and you'll receive a confirmation page.
                  </p>
                </div>
              </Card>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full btn-primary text-lg py-3"
              >
                Place Order
              </button>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-pastel-green to-pastel-lime rounded-lg flex items-center justify-center flex-shrink-0">
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
                      <Price amount={subtotal} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : <Price amount={shipping} />}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      <Price amount={tax} />
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-semibold text-sunrise-green">
                      <Price amount={total} />
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
