import productService, { type IProduct } from '@/services/services';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchProducts() {
    loading.value = true;
    error.value = null;
    try {
      products.value = await productService.getAllProducts();
    } catch (err) {
      error.value = 'Failed to fetch products';
      console.error(err);
    } finally {
      loading.value = false;
    }
  }

  async function addProduct(product: Omit<IProduct, 'id'>) {
    loading.value = true;
    error.value = null;
    try {
      const newProduct = await productService.createProduct(product);
      products.value.push(newProduct);
      return newProduct;
    } catch (err) {
      error.value = 'Failed to add product';
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateProduct(id: number, product: Partial<IProduct>) {
    loading.value = true;
    error.value = null;
    try {
      const updatedProduct = await productService.updateProduct(id, product);
      const index = products.value.findIndex((p) => p.id === id);
      if (index !== -1) {
        products.value[index] = updatedProduct;
      }
      return updatedProduct;
    } catch (err) {
      error.value = 'Failed to update product';
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function deleteProduct(id: number) {
    loading.value = true;
    error.value = null;
    try {
      await productService.deleteProduct(id);
      products.value = products.value.filter((p) => p.id !== id);
    } catch (err) {
      error.value = 'Failed to delete product';
      console.error(err);
      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
});
