<template>
  
    <div class="container mx-auto px-4 py-6 ">
    <h2 class="text-2xl font-bold mb-2">{{ category.name }}</h2>
    <p class="text-gray-700 mb-6">{{ category.description }}</p>
    <h3 class="text-xl font-semibold mb-4">Produk dalam Kategori:</h3>
      <div class="grid grid-cols-4 gap-4">
    
          <div 
            v-for="product in category.product" 
            :key="product.id" 
            class="flex items-start space-x-6 shadow-lg rounded-md"
          >
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-48 h-48 object-cover rounded-lg shadow-md" 
            />
            <div class="flex-1">
              <h4 class="text-lg font-semibold mb-1">{{ product.name }}</h4>
              <p class="text-gray-600">{{ product.description }}</p>
            </div>
          </div>
        
      </div>

  </div>

  
  
</template>

<script setup>
import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const getCategory = useCategoryStore();
const route = useRoute();
const category = ref({});

const handleGet = async () => {
  try {
    const res = await getCategory.getCategoryDetail(route.params.id);
    console.log('res :', res);
    console.log("route.params.id", route.params.id);
    if (res) {
      category.value = res;
    }
  } catch (error) {
    console.error("Error fetching category details:", error);
  }
};

onMounted(() => {
  handleGet();
});
</script>
