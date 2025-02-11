<template>
  <DefaultLayout>
    <Hero />

<div class="py-4 px-10 mt-4">
  <!-- Search Bar -->
  <div class="mb-6">
    <SearchBar v-model="searchQuery" />
  </div>

  <!-- Category List -->
  <div class="flex flex-wrap gap-2 py-4">
    <RouterLink
      v-for="item in category.category"
      :key="item.id"
      :to="`/category/${item.id}`"
      class="px-10 py-2 text-black border border-black font-italic rounded-md"
    >
      {{ item.name }}
    </RouterLink>
  </div>

  <!-- Recommended Section -->
  <h1 
    class="text-4xl font-bold text-black mb-4 font-sans 
           bg-gradient-to-r from-gray-600 to-white 
           bg-clip-text text-transparent"
  >
    Recommended for you
  </h1>

  <!-- Product Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <CardProduct :dataProps="filteredProducts" />
  </div>
</div>

  </DefaultLayout>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useCategoryStore } from "@/stores/category";
import { useProductsStore } from "@/stores/product";
import DefaultLayout from "@/layouts/Default.vue";
import Hero from "@/components/Hero.vue";
import CardProduct from "@/components/CardProduct.vue";
import SearchBar from "@/components/SearchBar.vue";

const category = useCategoryStore();
const product = useProductsStore();
const isLoading = ref(true);
const searchQuery = ref("");

// Panggil API dengan Promise.all
const fetchData = async () => {
  try {
    await Promise.all([category.getCategory(), product.getProduct()]);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
};

// Filter produk
const filteredProducts = computed(() => {
  return product.products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(fetchData);
</script>
