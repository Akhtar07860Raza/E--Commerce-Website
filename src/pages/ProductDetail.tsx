import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingBag, ArrowLeft, Check } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { api } from '../services/api';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductDetails(id!);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-serif">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm uppercase tracking-wider text-zinc-500 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-zinc-100 aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-sm text-gold uppercase tracking-widest mb-2 font-medium">
              {product.brand}
            </p>
            <h1 className="text-4xl md:text-5xl font-serif mb-4 text-black">
              {product.name}
            </h1>
            
            <div className="flex items-center mb-6">
              <div className="flex text-gold mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-zinc-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-500">
                ({product.numReviews} reviews)
              </span>
            </div>

            <p className="text-3xl font-light text-black mb-8">
              ₹{product.price}
            </p>

            <div className="prose prose-sm text-zinc-600 mb-10 font-light leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="border-t border-zinc-200 pt-8 mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium uppercase tracking-wider">Size</span>
                <button className="text-xs text-zinc-500 underline hover:text-gold">Size Guide</button>
              </div>
              <div className="flex space-x-3">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 flex items-center justify-center border transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-zinc-300 text-zinc-600 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <span className="text-sm font-medium uppercase tracking-wider block mb-4">Quantity</span>
              <div className="flex items-center border border-zinc-300 w-32">
                <button
                  className="px-4 py-3 text-zinc-500 hover:text-black transition-colors"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  disabled={product.countInStock === 0}
                >
                  -
                </button>
                <span className="flex-1 text-center font-medium">{qty}</span>
                <button
                  className="px-4 py-3 text-zinc-500 hover:text-black transition-colors"
                  onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                  disabled={product.countInStock === 0}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`w-full py-4 flex items-center justify-center text-sm font-medium uppercase tracking-widest transition-all ${
                product.countInStock === 0
                  ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed'
                  : added
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-gold'
              }`}
            >
              {product.countInStock === 0 ? (
                'Out of Stock'
              ) : added ? (
                <>
                  <Check className="w-5 h-5 mr-2" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
                </>
              )}
            </button>
            
            <div className="mt-8 space-y-4 text-sm text-zinc-500">
              <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /> Free shipping on orders over ₹2000</p>
              <p className="flex items-center"><Check className="w-4 h-4 mr-2 text-green-500" /> 30 days return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
