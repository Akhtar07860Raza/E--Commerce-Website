import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 shadow-sm text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-green-500" />
        </div>
        <h2 className="mt-6 text-3xl font-serif text-black">Order Placed Successfully!</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Thank you for shopping with New Asma Collection. Your order is being processed and will be shipped soon.
        </p>
        <div className="mt-8">
          <Link
            to="/shop"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-none text-white bg-black hover:bg-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold transition-colors uppercase tracking-widest"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
