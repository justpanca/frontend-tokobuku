<!-- <template>
  <div class="navbar bg-blue-500 px-6">
    <div class="flex-1 gap-3">
      <RouterLink to="/" class="btn btn-ghost normal-case text-white text-3xl">
        TokoBuku
      </RouterLink>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">8</span>
          </div>
        </div>
        <div
          tabindex="0"
          class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
        >
          <div class="card-body">
            <span class="text-lg font-bold">8 Items</span>
            <span class="text-info">Subtotal: $999</span>
            <div class="card-actions">
              <button class="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              v-if="auth.currentUser?.profile"
              alt="Tailwind CSS Navbar component"
              :src="auth.currentUser.profile.image"
            />
            <img
              v-else
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li v-if="user">
            <RouterLink :to="`/profile/${user.id}`" class="justify-between">
              Profile
              <span class="badge" v-if="user">{{
                user ? user.name : "profile"
              }}</span>
            </RouterLink>
          </li>

          <li>
            <button v-if="user" @click="onLogout">Logout</button>
            <RouterLink v-else to="/login">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from "@/stores/auth";
const auth = authStore();
const user = auth.currentUser;

const onLogout = async () => {
  await auth.logout();
};
</script> -->

<template>
  <div class="navbar bg-blue-500 px-6">
    <div class="flex-1 gap-3">
      <RouterLink to="/" class="btn btn-ghost normal-case text-white text-3xl">
        TokoBuku
      </RouterLink>
    </div>

    <div class="flex-none">
      <!-- Dropdown Profil -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              v-if="user?.profile?.image"
              alt="Profile Picture"
              :src="user.profile.image"
            />
            <img
              v-else
              alt="Default Avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>

        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <!-- menampilkan data profile-->
          <li v-if="user">
            <RouterLink to="/profile" class="justify-between">
              My Profile
              <span class="badge">{{ user?.name || "User" }}</span>
            </RouterLink>
          </li>

          <!-- edit profile -->
          <li v-if="user">
            <RouterLink to="/profile/edit" class="justify-between">
              Edit Profile 
            </RouterLink>
          </li>

          <li>
            <button v-if="user" @click="onLogout">Logout</button>
            <RouterLink v-else to="/login">Login</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from "@/stores/auth";
import { computed } from "vue";

const auth = authStore();
const user = computed(() => auth.currentUser); 

const onLogout = async () => {
  await auth.logout();
};
</script>

