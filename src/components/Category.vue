<template>
  <h1 class="text-3xl text-info text-center">Halaman Category</h1>
  <section class="my-3" v-show="inputAction">
    <h2 class="text-lg text-info">{{ isEdit ? "Edit" : "Tambah" }} Category</h2>
    <form @submit.prevent="actionCategory">
      <input
        type="text"
        placeholder="Masukan nama category"
        class="input input-bordered w-full mt-2"
        v-model="nameCategory"
        required
      />
      <div class="flex gap-5">
        <button class="btn btn-primary btn-block mt-3">
          {{ isEdit ? "Edit" : "Tambah" }}
        </button>
        <button
          class="btn btn-error btn-block mt-3"
          type="button"
          @click="closeForm"
        >
          Cancel
        </button>
      </div>
    </form>
  </section>
  <section>
    <div class="overflow-x-auto">
      <div class="flex justify-between">
        <h2 class="text-lg font-bold text-info my-5 p-5">Tampil Category</h2>
        <button
          @click="tambahForm"
          class="btn btn-error btn-sm mr-4 px-4 py-2 mt-8 rounded-xl"
        >
          Add
        </button>
      </div>
      <table class="table table-zebra">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="categoryData.length === 0">
            <td colspan="3" class="text-center">No categories available</td>
          </tr>
          <tr v-for="(item, key) in categoryData" :key="item.id || key">
            <th>{{ key + 1 }}</th>
            <td>{{ item.name }}</td>
            <td class="flex gap-5">
              <button
                class="btn btn-primary btn-sm"
                @click="handleEdit(item)"
              >
                Edit
              </button>
              <button
                class="btn btn-error btn-sm"
                @click="handleDelete(item.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiClient } from "../config/api";
import { authStore } from "@/stores/auth";

// State Management
const store = authStore();
const nameCategory = ref("");
const inputAction = ref(false);
const categoryData = ref([]);
const isEdit = ref(false);
const id = ref(null);

// Fetch Data
const fetchCategory = async () => {
  try {
    const { data } = await apiClient.get("/category");
    categoryData.value = data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    alert("Failed to fetch categories. Please try again later.");
  }
};

// Form Handlers
const tambahForm = () => {
  clearInputForm();
  inputAction.value = true;
};

const closeForm = () => {
  clearInputForm();
  inputAction.value = false;
};

const clearInputForm = () => {
  nameCategory.value = "";
  isEdit.value = false;
  id.value = null;
};

// Edit & Delete
const handleEdit = (item) => {
  inputAction.value = true;
  isEdit.value = true;
  id.value = item.id;
  nameCategory.value = item.name;
};

const handleDelete = async (itemId) => {
  if (!confirm("Are you sure you want to delete this category?")) return;
  try {
    await apiClient.delete(`/category/${itemId}`, {
      headers: { Authorization: `Bearer ${store.token}` },
    });
    alert("Category deleted successfully.");
    await fetchCategory();
  } catch (error) {
    console.error("Error deleting category:", error);
    alert("Failed to delete category. Please try again later.");
  }
};

// Add & Update Category
const actionCategory = async () => {
  if (!nameCategory.value.trim()) {
    alert("Category name cannot be empty.");
    return;
  }

  try {
    if (isEdit.value) {
      await apiClient.put(`/category/${id.value}`, { name: nameCategory.value }, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      alert("Category updated successfully.");
    } else {
      await apiClient.post("/category", { name: nameCategory.value }, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      alert("Category added successfully.");
    }

    await fetchCategory();
    closeForm();
  } catch (error) {
    console.error("Error:", error);
    alert(error.response?.data?.message || "An error occurred.");
  }
};

// Lifecycle Hook
onMounted(fetchCategory);
</script>
