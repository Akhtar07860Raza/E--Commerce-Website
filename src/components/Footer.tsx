
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <span className="font-serif text-2xl tracking-wider text-gold">
                NEW ASMA
              </span>
              <span className="ml-2 text-sm tracking-widest uppercase">
                Collection
              </span>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              New Asma Collection offers stylish readymade suits and dresses
              for women and girls. Discover beautiful kurtas, party dresses,
              frocks and elegant fashion for every occasion.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">

              <a
                href="https://instagram.com/new_asma_collection24g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-gold transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-gold transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>

            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gold">
              Shop
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/shop?category=Women"
                  className="text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  Women Collection
                </Link>
              </li>

              <li>
                <Link
                  to="/shop?category=Girls"
                  className="text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  Girls Collection
                </Link>
              </li>

              <li>
                <Link
                  to="/shop"
                  className="text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  New Arrivals
                </Link>
              </li>

            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gold">
              Help
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/faq"
                  className="text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping"
                  className="text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  Delivery Information
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-zinc-400 hover:text-white transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6 text-gold">
              Contact
            </h3>

            <ul className="space-y-4">

              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-zinc-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-400 text-sm">
                  Basement A.H. Shopping Centre,
                  Near Pappu Sardar,
                  Roshan Bagh, Prayagraj
                </span>
              </li>

              <li className="flex items-center">
                <Phone className="h-5 w-5 text-zinc-400 mr-3 flex-shrink-0" />
                <span className="text-zinc-400 text-sm">
                  +91 9616335787
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} New Asma Collection. All rights reserved.
          </p>

          <div className="flex space-x-6">

            <Link
              to="/privacy"
              className="text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-zinc-500 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
