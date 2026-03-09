import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif mb-8 text-black">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white shadow-sm">
            <h2 className="text-2xl font-serif mb-4 text-zinc-500">Your cart is empty</h2>
            <Link
              to="/shop"
              className="inline-block mt-4 px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-widest hover:bg-gold transition-colors"
            >
              Go Back
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={`${item.product}-${item.size}`} className="flex items-center bg-white p-6 shadow-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-32 object-cover mr-6"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-lg font-medium text-black hover:text-gold transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-zinc-500 mt-1 uppercase tracking-wider">Size: {item.size}</p>
                    <p className="text-lg font-semibold text-black mt-2">₹{item.price}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-zinc-300">
                      <button
                        className="px-3 py-1 text-zinc-500 hover:text-black transition-colors"
                        onClick={() => addToCart({ ...item, qty: Math.max(1, item.qty - 1) })}
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-sm font-medium">{item.qty}</span>
                      <button
                        className="px-3 py-1 text-zinc-500 hover:text-black transition-colors"
                        onClick={() => addToCart({ ...item, qty: Math.min(item.countInStock, item.qty + 1) })}
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product, item.size)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-8 shadow-sm sticky top-24">
                <h2 className="text-2xl font-serif mb-6 border-b border-zinc-100 pb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                    <span className="font-medium text-black">
                      ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Shipping</span>
                    <span className="font-medium text-black">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Taxes</span>
                    <span className="font-medium text-black">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-zinc-100 pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-black uppercase tracking-wider">Total</span>
                    <span className="text-2xl font-semibold text-black">
                      ₹{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-black text-white py-4 text-sm font-medium uppercase tracking-widest hover:bg-gold transition-colors flex items-center justify-center"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
