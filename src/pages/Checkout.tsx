import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { api } from '../services/api';

const Checkout = () => {
  const { cartItems, shippingAddress, saveShippingAddress, clearCart } = useCartStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!userInfo) {
    navigate('/login?redirect=checkout');
    return null;
  }

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 2000 ? 0 : 100;
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    saveShippingAddress({ address, city, postalCode, country, phone });
    setLoading(true);
    setError('');

    try {
      await api.createOrder({
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country, phone },
        paymentMethod: 'PayPal',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      clearCart();
      navigate('/order-success');
    } catch (err: any) {
      setError(err.message || 'Error creating order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-8 text-black">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-serif mb-6">Shipping Information</h2>
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={submitHandler} className="space-y-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-700">Address</label>
                  <input
                    type="text"
                    id="address"
                    required
                    className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-zinc-700">City</label>
                    <input
                      type="text"
                      id="city"
                      required
                      className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-zinc-700">Postal Code</label>
                    <input
                      type="text"
                      id="postalCode"
                      required
                      className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-zinc-700">Country</label>
                    <input
                      type="text"
                      id="country"
                      required
                      className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">Phone Number</label>
                    <input
                      type="text"
                      id="phone"
                      required
                      className="mt-1 block w-full border border-zinc-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-gold focus:border-gold sm:text-sm"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={loading || cartItems.length === 0}
                    className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-gold transition-colors"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-sm sticky top-24">
              <h2 className="text-2xl font-serif mb-6 border-b border-zinc-100 pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-zinc-600 line-clamp-1 flex-1 pr-4">
                      {item.qty} x {item.name} ({item.size})
                    </span>
                    <span className="font-medium text-black">₹{item.qty * item.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-100 pt-4 space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Items</span>
                  <span className="font-medium text-black">₹{itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="font-medium text-black">₹{shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tax</span>
                  <span className="font-medium text-black">₹{taxPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="border-t border-zinc-100 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-black uppercase tracking-wider">Total</span>
                  <span className="text-2xl font-semibold text-black">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
