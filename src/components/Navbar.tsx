
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search, MessageCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const cartItems = useCartStore((state) => state.cartItems);
  const { userInfo, logout } = useAuthStore();

  const navigate = useNavigate();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/shop?keyword=${keyword}`);
    } else {
      navigate('/shop');
    }
  };

  const logoutHandler = () => {
    logout();
    navigate('/login');
  };

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-24">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-serif text-2xl tracking-wider text-gold">
              NEW ASMA
            </span>
            <span className="ml-2 text-sm tracking-widest uppercase hidden sm:block">
              Collection
            </span>
          </Link>


          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">

            <Link to="/" className="hover:text-gold transition-colors text-sm uppercase tracking-wider">
              Home
            </Link>

            <Link to="/shop" className="hover:text-gold transition-colors text-sm uppercase tracking-wider">
              Shop
            </Link>

            <Link to="/shop?category=Women" className="hover:text-gold transition-colors text-sm uppercase tracking-wider">
              Women
            </Link>

            <Link to="/shop?category=Girls" className="hover:text-gold transition-colors text-sm uppercase tracking-wider">
              Girls
            </Link>

            <Link to="/contact" className="hover:text-gold transition-colors text-sm uppercase tracking-wider">
              Contact
            </Link>

          </div>


          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-6">

            {/* Search */}
            <form onSubmit={submitHandler} className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-zinc-900 text-white border border-zinc-700 rounded-full py-2 px-5 pl-10 text-sm w-56 focus:outline-none focus:border-gold"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            </form>


            {/* WhatsApp */}
            <a
              href="https://wa.me/919616335787"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
            >
              <MessageCircle className="h-5 w-5" />
            </a>


            {/* User Dropdown */}
            <div className="relative" ref={userMenuRef}>

              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="hover:text-gold"
              >
                <User className="h-5 w-5" />
              </button>

              {userMenuOpen && (

                <div className="absolute right-0 w-48 mt-3 bg-white text-black rounded-md shadow-lg py-1">

                  {userInfo ? (
                    <>
                      <div className="px-4 py-2 text-sm border-b">
                        Signed in as
                        <br />
                        <span className="font-medium">{userInfo.name}</span>
                      </div>

                      {userInfo.isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Admin Dashboard
                        </Link>
                      )}

                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Login
                      </Link>

                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Register
                      </Link>
                    </>
                  )}

                </div>

              )}

            </div>


            {/* Cart */}
            <Link to="/cart" className="relative hover:text-gold">
              <ShoppingBag className="h-5 w-5" />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}

            </Link>

          </div>


          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">

            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>

            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

          </div>

        </div>

      </div>


      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-t border-zinc-800">

          <div className="px-2 pt-2 pb-3 space-y-1">

            <Link to="/" className="block px-3 py-2 hover:text-gold">
              Home
            </Link>

            <Link to="/shop" className="block px-3 py-2 hover:text-gold">
              Shop
            </Link>

            <Link to="/shop?category=Women" className="block px-3 py-2 hover:text-gold">
              Women
            </Link>

            <Link to="/shop?category=Girls" className="block px-3 py-2 hover:text-gold">
              Girls
            </Link>

            <Link to="/contact" className="block px-3 py-2 hover:text-gold">
              Contact
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;

