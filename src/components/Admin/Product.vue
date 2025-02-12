<template>
  <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
    <input type="hidden" v-model="data.id" />

    <label class="form-control w-full">
      <span class="label-text">Image</span>
      <input type="file" class="file-input w-full max-w-xs" @change="handleImage" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Name</span>
      <input type="text" class="input input-bordered w-full" 
      v-model="data.name" placeholder="Enter name" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Description</span>
      <input type="text" class="input input-bordered w-full" 
      v-model="data.description" placeholder="Enter description" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Price</span>
      <input type="number" class="input input-bordered w-full" 
      v-model="data.price" placeholder="Enter price" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Stock</span>
      <input type="number" class="input input-bordered w-full" 
      v-model="data.stock" placeholder="Enter stock" />
    </label>

    <label class="form-control w-full">
      <span class="label-text">Category</span>
      <select class="select select-bordered" v-model="data.category_id">
        <option disabled selected value="">Select category</option>
        <option v-for="item in categoryList" :key="item.id" :value="item.id">{{ item.name }}</option>
      </select>
    </label>

    <div class="flex gap-4 mt-5">
      <button class="btn btn-primary flex-1" type="submit">
        {{ isEdit ? "Update" : "Add" }}
      </button>
      <button v-if="isEdit" type="button" class="btn btn-danger flex-1"
       @click="handleDelete">Delete</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCategoryStore } from "@/stores/category";
import { apiClient } from "@/config/api";

const router = useRouter();
const categoryStore = useCategoryStore();
const categoryList = ref([]);

const props = defineProps({
  isEdit: Boolean,
  dataUpdate: Object,
});

const data = reactive({
  id: "",
  name: "",
  description: "",
  price: "",
  stock: "",
  category_id: "",
  image: null,
});

const loadCategories = async () => {
  try {
    categoryList.value = await categoryStore.getCategory();
  } catch (error) {
    alert("Failed to load categories: " + error.message);
  }
};

const handleImage = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) return alert("Image must be under 5MB");
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type))
      return alert("Invalid file type");
    data.image = file;
  }
};

const validateInput = () => {
  if (!data.name || !data.description || !data.category_id || !data.price || !data.stock) {
    alert("All fields are required");
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (!validateInput()) return;

  if (props.isEdit && !data.id) {
    alert("Product ID is missing!");
    return;
  }

  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] !== "" && data[key] !== null) {
      formData.append(key, data[key]);
    }
  });

  try {
    const endpoint = props.isEdit ? `/product/${data.id}?_method=put` : "/product";
    await apiClient.post(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
    alert(props.isEdit ? "Product updated successfully" : "Product added successfully");
    router.push("/dashboard/product");
  } catch (error) {
    alert(error.response?.data?.message || "An error occurred");
  }
};

const handleDelete = async () => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await apiClient.delete(`/product/${data.id}`);
    alert("Product deleted successfully");
    router.push("/dashboard/product");
  } catch (error) {
    alert(error.response?.data?.message || "An error occurred");
  }
};

onMounted(() => {
  loadCategories();
  if (props.dataUpdate) {
    Object.keys(data).forEach((key) => {
      if (props.dataUpdate[key] !== undefined) {
        data[key] = props.dataUpdate[key];
      }
    });
  }
});
</script>
