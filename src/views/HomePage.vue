<template>
  <DefaultLayout>
    <Hero />

    <div class="px-10">
      <div class="flex flex-wrap gap-2 py-4">
        <RouterLink
          class="px-10 py-2 text-black border border-black font-italic rounded-md"
          v-for="item in category.category"
          :key="item.id"
          :to="`/category/${item.id}`"
        >
          {{ item.name }}
        </RouterLink>
      </div>
    </div>

    <div class="py-4 px-10 mt-4">
      <div class="mb-6">
        <input
          type="text"
          v-model="searchQuery"
          class="w-full px-4 py-2 border rounded-md"
          placeholder="Cari Product Disini..."
        />
      </div>

      <h1 class="text-4xl font-bold text-black mb-4 font-sans bg-gradient-to-r bg-gray-600 to-white bg-clip-text text-transparent">Recommended for you</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tampilkan hasil pencarian -->
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

const category = useCategoryStore();
const product = useProductsStore();
const isLoading = ref(true);
const searchQuery = ref("");

const handleGetCategory = async () => {
  try {
    const res = await category.getCategory();
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const handleGetProduct = async () => {
  try {
    const res = await product.getProduct();
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return product.products;
  }
  return product.products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(() => {
  handleGetCategory();
  handleGetProduct();
});
</script>

