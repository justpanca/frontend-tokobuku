<template>
    <input
      type="text"
      v-model="search"
      class="w-full px-4 py-2 border rounded-md"
      placeholder="Cari Product Disini..."
    />
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  
  const props = defineProps({ modelValue: String });
  const emit = defineEmits(["update:modelValue"]);
  
  const search = ref(props.modelValue);
  let timeout = null;
  
  // debounce 
  watch(search, (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      emit("update:modelValue", value);
    }, 300); 
  });
  </script>
  