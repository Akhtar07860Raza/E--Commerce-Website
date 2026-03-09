import { useAuthStore } from '../store/authStore';

const BASE_URL = '/api';

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const { userInfo } = useAuthStore.getState();
  const headers = new Headers(options.headers);

  if (userInfo && userInfo.token) {
    headers.set('Authorization', `Bearer ${userInfo.token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${BASE_URL}${url}`, { ...options, headers });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Something went wrong' }));
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
};

export const api = {
  getProducts: (keyword = '', category = '') => {
    const params = new URLSearchParams();
    if (keyword) params.append('keyword', keyword);
    if (category) params.append('category', category);
    return fetchWithAuth(`/products?${params.toString()}`);
  },
  getProductDetails: (id: string) => fetchWithAuth(`/products/${id}`),
  login: (data: any) => fetchWithAuth('/users/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: any) => fetchWithAuth('/users', { method: 'POST', body: JSON.stringify(data) }),
  createOrder: (data: any) => fetchWithAuth('/orders', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: () => fetchWithAuth('/orders'),
  createProduct: () => fetchWithAuth('/products', { method: 'POST' }),
  updateProduct: (id: string, data: any) => fetchWithAuth(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: string) => fetchWithAuth(`/products/${id}`, { method: 'DELETE' }),
};
