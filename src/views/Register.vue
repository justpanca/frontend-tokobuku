<template>
  <div class="hero bg-white min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center w-1/2 lg:text-left">
        <h1 class="text-5xl text-black font-bold">Register</h1>
        <p class="py-6 text-black font-semibold">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <Form :isRegister="true" />
    </div>
  </div>
</template>

<script setup>
import Form from "@/components/Form.vue";
</script>
