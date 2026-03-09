
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { api } from '../services/api';

const Shop = () => {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const keyword = searchParams.get('keyword') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {

    const fetchProducts = async () => {

      setLoading(true);

      try {

        const data = await api.getProducts(keyword, category);
        setProducts(data);

      } catch (error) {

        console.error('Error fetching products:', error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, [keyword, category]);


  return (

    <div className="min-h-screen bg-white py-12">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Page Title */}

        <div className="mb-12">

          <h1 className="text-4xl md:text-5xl font-serif mb-4">

            {category
              ? `${category} Collection`
              : keyword
              ? `Search Results for "${keyword}"`
              : 'Shop Collection'}

          </h1>

          <div className="w-24 h-1 bg-gold" />

        </div>



        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">


          {/* Filters */}

          <div className="space-y-8">

            {/* Category */}

            <div>

              <h3 className="text-lg font-semibold mb-4">
                Categories
              </h3>

              <ul className="space-y-2 text-sm">

                <li>
                  <Link to="/shop?category=Women" className="hover:text-gold">
                    Women
                  </Link>
                </li>

                <li>
                  <Link to="/shop?category=Girls" className="hover:text-gold">
                    Girls
                  </Link>
                </li>

              </ul>

            </div>


            {/* Women Types */}

            <div>

              <h3 className="text-lg font-semibold mb-4">
                Women
              </h3>

              <ul className="space-y-2 text-sm text-zinc-600">

                <li>Kurtas</li>
                <li>Suits</li>
                <li>Abayas</li>
                <li>Party Wear</li>

              </ul>

            </div>


            {/* Girls Types */}

            <div>

              <h3 className="text-lg font-semibold mb-4">
                Girls
              </h3>

              <ul className="space-y-2 text-sm text-zinc-600">

                <li>Frocks</li>
                <li>Party Dresses</li>
                <li>Casual Dresses</li>
                <li>Festive Wear</li>

              </ul>

            </div>

          </div>



          {/* Product Grid */}

          <div className="lg:col-span-3">

            {loading ? (

              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
              </div>

            ) : products.length === 0 ? (

              <div className="text-center py-20">

                <h2 className="text-2xl font-serif mb-4 text-zinc-500">
                  No products found
                </h2>

                <p className="text-zinc-400">
                  Try adjusting your search or filter criteria.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}

              </div>

            )}

          </div>

        </div>

      </div>

    </div>

  );

};

export default Shop;
