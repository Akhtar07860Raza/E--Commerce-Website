
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    numReviews: number;
    category: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const whatsappMessage = `Hello, I want to order this product: ${product.name}`;

  return (
    <div className="group bg-white shadow-sm hover:shadow-lg transition duration-300 rounded-lg overflow-hidden">

      <Link to={`/product/${product._id}`} className="block">

        {/* Image */}
        <div className="relative overflow-hidden bg-zinc-100 aspect-[3/4]">

          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />

          {/* NEW Badge */}
          <span className="absolute top-3 left-3 bg-gold text-black text-xs px-2 py-1 font-semibold uppercase tracking-wider">
            New
          </span>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-300" />

        </div>

      </Link>


      {/* Product Info */}
      <div className="p-4 space-y-2">

        <p className="text-xs text-zinc-500 uppercase tracking-wider">
          {product.category}
        </p>

        <Link to={`/product/${product._id}`}>
          <h3 className="text-sm font-semibold text-black group-hover:text-gold transition line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <p className="text-lg font-bold text-black">
          ₹{product.price}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1">

          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-current'
                    : 'text-zinc-300'
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-zinc-500">
            ({product.numReviews})
          </span>

        </div>


        {/* Buttons */}
        <div className="flex gap-2 pt-2">

          <Link
            to={`/product/${product._id}`}
            className="flex-1 text-center bg-black text-white py-2 text-xs uppercase tracking-wider hover:bg-gold hover:text-black transition"
          >
            View
          </Link>

          <a
            href={`https://wa.me/919616335787?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-green-500 text-white px-3 hover:bg-green-600 transition"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;

