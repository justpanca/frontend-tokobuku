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
          <span class="badge badge-secondary">{{ productDetail.category?.name }}</span>
          <p>{{ productDetail.description }}</p>
          <p>{{ formatter.format(productDetail.price) }}</p>
          <p>Stock: {{ productDetail.stock }}</p>

          <div v-if="productDetail.stock > 0">
            <button class="btn w-full btn-primary" @click="openModal">Buy</button>
          </div>
          <div v-else class="text-red-500 font-bold">Stok habis</div>
        </div>
      </div>

      <ModalOrder
        v-show="showModal"
        :dataProps="productDetail"
        @close-modal="closeModal"
        @kirim-data="handleSubmit"
      />
    </div>
  </Default>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watchEffect } from "vue";
import { useProductsStore } from "@/stores/product";
import { formatter } from "@/utils/formatted";
import Default from "@/layouts/Default.vue";
import ModalOrder from "@/components/Modal/ModalOrder.vue";
import { apiClient } from "@/config/api";

const route = useRoute();
const stores = useProductsStore();
const productDetail = ref({
  image: "",
  name: "",
  category: { name: "" },
  description: "",
  price: 0,
  stock: 0,
});
const showModal = ref(false);

const handleSubmit = async (data) => {
  showModal.value = data[1] ?? false;
  try {
    const res = await apiClient.post("/order", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const snapToken = res.data.snap_token;
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        console.log("success", result);
        alert("Pembayaran berhasil! Terima kasih.");
        // Tunggu 3 detik sebelum mengecek status pembayaran di backend
        setTimeout(() => {
          checkPaymentStatus(result.order_id);
        }, 3000);
      },
      onPending: function (result) {
        console.log("pending", result);
        alert("Pembayaran dalam proses. Silakan cek statusnya nanti.");
      },
      onError: function (result) {
        console.log("error", result);
        alert("Terjadi kesalahan saat memproses pembayaran.");
      },
      onClose: function () {
        // console.log("customer closed the popup without finishing the payment");
        alert("Anda menutup pembayaran sebelum selesai.");
      },
    });
  } catch (error) {
    console.log(error);
    alert("Terjadi kesalahan saat menginisialisasi pembayaran.");
  }
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

watchEffect(async () => {
  productDetail.value = await stores.getProductById(route.params.id);
});
</script>

<!-- <template>
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
          <span class="badge badge-secondary">{{ productDetail.category?.name }}</span>
          <p>{{ productDetail.description }}</p>
          <p>{{ formatter.format(productDetail.price) }}</p>
          <p>Stock: {{ productDetail.stock }}</p>

          <div v-if="productDetail.stock > 0">
            <button class="btn w-full btn-primary" @click="openModal">Buy</button>
          </div>
          <div v-else class="text-red-500 font-bold">Stok habis</div>
        </div>
      </div>

      <ModalOrder
        v-show="showModal"
        :dataProps="productDetail"
        @close-modal="closeModal"
        @kirim-data="handleSubmit"
      />
    </div>
  </Default>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref, watchEffect } from "vue";
import { useProductsStore } from "@/stores/product";
import { formatter } from "@/utils/formatted";
import Default from "@/layouts/Default.vue";
import ModalOrder from "@/components/Modal/ModalOrder.vue";
import { apiClient } from "@/config/api";

const route = useRoute();
const stores = useProductsStore();
const productDetail = ref({
  image: "",
  name: "",
  category: { name: "" },
  description: "",
  price: 0,
  stock: 0,
});
const showModal = ref(false);

const handleSubmit = async (data) => {
  showModal.value = data[1] ?? false;
  try {
    const res = await apiClient.post("/order", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const snapToken = res.data.snap_token;
    window.snap.pay(snapToken, {
      onSuccess: function (result) {
        console.log("success", result);
        alert("Pembayaran berhasil! Terima kasih.");
        // Tunggu 3 detik sebelum mengecek status pembayaran di backend
        setTimeout(() => {
          checkPaymentStatus(result.order_id);
        }, 3000);
      },
      onPending: function (result) {
        console.log("pending", result);
        alert("Pembayaran dalam proses. Silakan cek statusnya nanti.");
      },
      onError: function (result) {
        console.log("error", result);
        alert("Terjadi kesalahan saat memproses pembayaran.");
      },
      onClose: function () {
        alert("Anda menutup pembayaran sebelum selesai.");
      },
    });
  } catch (error) {
    console.log(error);
    alert("Terjadi kesalahan saat menginisialisasi pembayaran.");
  }
};

const checkPaymentStatus = async (orderId) => {
  try {
    const response = await apiClient.get(`/order/status/${orderId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.data.status === "success") {
      alert("Pembayaran telah dikonfirmasi!");
    } else {
      alert("Pembayaran masih dalam proses. Coba cek lagi nanti.");
    }
  } catch (error) {
    console.error("Gagal mengecek status pembayaran:", error);
    alert("Terjadi kesalahan saat mengecek status pembayaran.");
  }
};

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

watchEffect(async () => {
  productDetail.value = await stores.getProductById(route.params.id);
});
</script> -->
