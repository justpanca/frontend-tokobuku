import { ref } from "vue";
import { defineStore } from "pinia";
import { apiClient } from "@/config/api";

export const useProductsStore = defineStore("product", () => {
  const products = ref([]);

  const getProduct = async () => {
    try {
      const response = await apiClient.get("/product");
      products.value = response.data.data.data;
      return response.data.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await apiClient.get(`/product/${id}`);
      return response.data.data;
    } catch (error) {}
  };

  return { products, getProduct, getProductById };
});
