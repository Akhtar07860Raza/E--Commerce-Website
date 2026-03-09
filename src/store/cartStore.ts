import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
  size: string;
}

interface CartState {
  cartItems: CartItem[];
  shippingAddress: any;
  paymentMethod: string;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  saveShippingAddress: (data: any) => void;
  savePaymentMethod: (data: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      shippingAddress: {},
      paymentMethod: 'PayPal',
      addToCart: (item) => {
        const existItem = get().cartItems.find((x) => x.product === item.product && x.size === item.size);
        if (existItem) {
          set({
            cartItems: get().cartItems.map((x) =>
              x.product === existItem.product && x.size === existItem.size ? item : x
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, item] });
        }
      },
      removeFromCart: (id, size) => {
        set({
          cartItems: get().cartItems.filter((x) => !(x.product === id && x.size === size)),
        });
      },
      saveShippingAddress: (data) => {
        set({ shippingAddress: data });
      },
      savePaymentMethod: (data) => {
        set({ paymentMethod: data });
      },
      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
