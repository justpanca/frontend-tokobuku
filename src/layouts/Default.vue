<template>
  <section class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1 bg-white">
      <slot></slot>
    </main>
    <Footer />
  </section>
</template>

<script setup>
import Navbar from "@/components/NavbarDaisy.vue";
import Footer from "@/components/Footer.vue";
</script>
