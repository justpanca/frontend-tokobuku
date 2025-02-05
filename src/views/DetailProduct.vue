<template>
  <Default>
    <div class="px-4 py-4 flex justify-center">
      <div class="card bg-base-100 w-96 shadow-xl">
        <figure class="h-[400px]">
          <img
            :src="productDetail.image"
            :alt="productDetail.name"
            class="object-cover"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ productDetail.name }}</h2>
          <span class="badge badge-secondary">{{
            productDetail.category?.name
          }}</span>
          <p>{{ productDetail.description }}</p>
          <p>{{ formatter.format(productDetail.price) }}</p>
          <p>Stock: {{ productDetail.stock }}</p>

          <div v-if="productDetail.stock > 0">
            <button class="btn w-full btn-primary" @click="openModal">
              Buy
            </button>
          </div>
          <div v-else class="text-red-500 font-bold">Stok habis</div>
        </div>
      </div>

      <ModalOrder
        v-if="showModal"
        :dataProps="productDetail"
        @close-modal="closeModal"
        @kirim-data="handleSubmit"
      />
    </div>
  </Default>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useProductsStore } from "@/stores/product";
import { formatter } from "@/utils/formatted";
import Default from "@/layouts/Default.vue";
import ModalOrder from "@/components/Modal/ModalOrder.vue";
import { apiClient } from "@/config/api";

const route = useRoute();
const id = route.params.id;
const stores = useProductsStore();
const productDetail = ref({});
const showModal = ref(false);

const handleSubmit = async (data) => {
  showModal.value = data[1];
  try {
    const res = await apiClient.post("/order", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const snapToken = res.data.snap_token;
    snap.pay(snapToken, {
      onSuccess: function (result) {
        console.log("success");
        console.log(result);
      },
      onPending: function (result) {
        console.log("pending");
        console.log(result);
      },
      onError: function (result) {
        console.log("error");
        console.log(result);
      },
      onClose: function () {
        console.log("customer closed the popup without finishing the payment");
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

onMounted(async () => {
  productDetail.value = await stores.getProductById(id);
});
</script>
