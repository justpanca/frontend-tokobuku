<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <div class="text-lg font-bold">Admin Dashboard</div>
    <div class="flex items-center space-x-4">
      <button class="p-2 rounded-full hover:bg-gray-200 transition-colors">
        <span class="material-icons">notifications</span>
      </button>
      <div class="relative">
        <button class="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            class="w-10 h-10 rounded-full"
          />
          <span class="font-semibold">Admin</span>
        </button>
        <div
          class="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-2"
        >
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >Profile</a
          >
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >Logout</a
          >
        </div>
      </div>
    </div>
  </header>
</template>
