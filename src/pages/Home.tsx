
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, ShieldCheck, RefreshCw, MessageCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-white">


      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070"
            alt="Fashion Hero"
            className="w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        </div>


        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">

          <h2 className="text-gold font-medium tracking-[0.25em] uppercase mb-4 text-sm md:text-base">
            New Asma Collection
          </h2>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight">
            Elegant Style
            <br />
            <span className="italic font-light">for Women & Girls</span>
          </h1>

          <p className="text-zinc-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light">
            Discover beautiful fashion for women and girls. Premium quality clothing,
            stylish designs and elegant outfits from New Asma Collection.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-10 py-4 text-sm font-semibold uppercase tracking-widest text-black bg-gold hover:bg-white transition duration-300"
          >
            Shop Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>

        </div>

      </section>


      {/* Features Section */}
      <section className="py-16 bg-zinc-50 border-b border-zinc-100">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

            <div className="flex flex-col items-center p-6">
              <Truck className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                Free Shipping
              </h3>
              <p className="text-zinc-500 text-sm">
                On orders over ₹2000
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <RefreshCw className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                Easy Returns
              </h3>
              <p className="text-zinc-500 text-sm">
                7 days return policy
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <ShieldCheck className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                Secure Payment
              </h3>
              <p className="text-zinc-500 text-sm">
                100% secure checkout
              </p>
            </div>

            <div className="flex flex-col items-center p-6">
              <ShoppingBag className="h-10 w-10 text-gold mb-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                Premium Quality
              </h3>
              <p className="text-zinc-500 text-sm">
                Best fabrics guaranteed
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Categories */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Shop by Category
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


          {/* Women */}
          <Link
            to="/shop?category=Women"
            className="group relative h-[500px] overflow-hidden"
          >

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              alt="Women"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

            <div className="absolute bottom-10 w-full text-center">
              <h3 className="text-white text-3xl font-serif mb-2">
                Women Collection
              </h3>

              <span className="border-b border-white text-white uppercase tracking-widest text-sm hover:text-gold hover:border-gold transition">
                Discover
              </span>
            </div>

          </Link>


          {/* Girls */}
          <Link
            to="/shop?category=Girls"
            className="group relative h-[500px] overflow-hidden"
          >

            <img
              src="https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&q=80&w=800"
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              alt="Girls"
            />

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition" />

            <div className="absolute bottom-10 w-full text-center">
              <h3 className="text-white text-3xl font-serif mb-2">
                Girls Collection
              </h3>

              <span className="border-b border-white text-white uppercase tracking-widest text-sm hover:text-gold hover:border-gold transition">
                Discover
              </span>
            </div>

          </Link>

        </div>

      </section>


      {/* Featured Products */}
      <section className="py-24 bg-zinc-50">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-end mb-12">

            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-4">
                Featured Collection
              </h2>
              <div className="w-24 h-1 bg-gold" />
            </div>

            <Link
              to="/shop"
              className="hidden md:flex items-center text-sm uppercase tracking-wider hover:text-gold"
            >
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

          </div>


          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            </div>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}

            </div>

          )}

        </div>

      </section>


      {/* Newsletter */}
      <section className="py-24 bg-black text-white text-center px-4">

        <div className="max-w-3xl mx-auto">

          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Join Our Newsletter
          </h2>

          <p className="text-zinc-400 mb-10 font-light text-lg">
            Subscribe to get new arrivals, fashion updates and exclusive offers.
          </p>

          <form className="flex flex-col sm:flex-row max-w-xl mx-auto gap-4">

            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent border border-zinc-700 px-6 py-4 text-white focus:outline-none focus:border-gold"
              required
            />

            <button
              type="submit"
              className="bg-gold text-black px-8 py-4 font-medium uppercase tracking-widest hover:bg-white transition"
            >
              Subscribe
            </button>

          </form>

        </div>

      </section>


      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919616335787"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition"
      >
        <MessageCircle className="h-6 w-6" />
      </a>


    </div>
  );
};

export default Home;
