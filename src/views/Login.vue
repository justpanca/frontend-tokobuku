<template>
  <div class="hero bg-white min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center w-1/2 lg:text-left">
        <h1 class="text-5xl text-black font-bold">Login</h1>
        <p class="py-6 text-black semi-bold">
          silahkan login dengan akun yang anda punya
          
        </p>
      </div>
      <Form :isRegister="false" />
    </div>
  </div>
</template>

<script setup>
import Form from "@/components/Form.vue";
</script>
