<template>
    <Default>
      <section class="w-full">
        <div class="p-10 flex flex-col">
          <div class="avatar mx-auto">
            <div
              class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2"
            >
              <img
                v-if="store.currentUser"
                :src="store.currentUser.profile?.image"
              />
              <img v-else src="" />
            </div>
          </div>
  
          <div class="mt-4 w-9/12 flex flex-col gap-2 mx-auto text-center">
            <h1 class="text-2xl font-bold">{{ store.currentUser?.name }}</h1>
            <p class="text-lg"><strong>Age:</strong> {{ store.currentUser?.profile?.age }}</p>
            <p class="text-lg"><strong>Bio:</strong> {{ store.currentUser?.profile?.bio }}</p>
          </div>
        </div>
      </section>
    </Default>
  </template>
  
  <script setup>
  import Default from "@/layouts/Default.vue";
  import { authStore } from "@/stores/auth";
  import { onMounted } from "vue";
  
  const store = authStore();
  
  onMounted(async () => {
    await store.getUserLogged();
  });
  </script>
  