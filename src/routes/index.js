import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Dashboard from "@/views/Admin/Dashboard.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import VerifyAccount from "@/views/VerifyAccount.vue";
import Category from "@/views/Admin/Category.vue";
import CategoryDetail from "@/views/CategoryDetail.vue";
import Product from "@/views/Admin/Product.vue";
import Profile from "@/views/Profile.vue";
import DetailProduct from "@/views/DetailProduct.vue";


const routes = [
  {
    path: "/",
    component: HomePage,
    meta: {
      layout: "Default",
    },
  },

  {
    path: "/profile/:id",
    component: Profile,
    meta: {
      layout: "Default",
    },
  },
  {
    path: "/product/:id",
    component: DetailProduct,
    meta: {
      layout: "Default",
    },
  },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: {
      layout: "Dashboard",
    },
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/verify-account",
    component: VerifyAccount,
  },
  {

    path: "/dashboard/category",
    component: Category,
    meta: {
      layout: "Dashboard",
    },
  },
  {
    path: "/category/:id",
    component: CategoryDetail,
    meta: {
      layout: "Default",
    },
  },
{
    path: "/dashboard/product",
    component: Product,
    meta: {
      layout: "Dashboard",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Tambahkan Navigation Guard
// router.beforeEach((to, from, next) => {
//   const store = useStore(); // Ambil store untuk mendapatkan informasi user
//   const user = store.getters["auth/user"]; // Pastikan Vuex memiliki getter untuk user

//   if (to.meta.requiresAuth && !user) {
//     // Jika route membutuhkan autentikasi dan user belum login, arahkan ke login
//     next("/login");
//   } else if (to.meta.requiresVerified && user?.email_verified_at) {
//     // Jika user sudah verifikasi, tapi mencoba masuk ke verify-account, langsung ke home
//     next("/");
//   } else {
//     next();
//   }
// });

export default router;
