import { apiClient } from './axiosConfig';

export const fetchCarts = async () => {
  const endpoint = import.meta.env.VITE_CART_API_ENDPOINT || '/carts';
  const response = await apiClient.get(`${endpoint}?limit=0`);
  const carts = response.data.carts;
  
  // Flatten products from all carts
  const products = carts.flatMap((cart: any) => 
    cart.products.map((product: any) => ({
      ...product,
      cartId: cart.id,
      userId: cart.userId
    }))
  );
  
  return products;
};

export const fetchCartDetails = async (cartId: string) => {
  const endpoint = import.meta.env.VITE_CART_DETAILS_ENDPOINT || '/carts/{id}';
  const response = await apiClient.get(endpoint.replace('{id}', cartId));
  return response.data;
};