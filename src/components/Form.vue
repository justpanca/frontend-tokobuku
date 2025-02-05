<template>
  <form
    class="card-body w-1/2 border border-black rounded-md text-black"
    @submit.prevent="onSubmit"
  >
    <div class="form-control" v-if="isRegister">
      <label class="label">
        <span class="label-text text-black">Name</span>
      </label>
      <input
        type="text"
        placeholder="username"
        class="input input-bordered bg-white text-black"
        v-model="formData.name"
      />
      <p class="invalid" v-for="error of v$.name.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </div>

    <div class="form-control">
      <label class="label">
        <span class="label-text text-black">Email</span>
      </label>
      <input
        type="email"
        placeholder="email"
        class="input input-bordered bg-white text-black"
        v-model="formData.email"
      />
    </div>
    <p class="invalid" v-for="error of v$.email.$errors" :key="error.$uid">
      {{ error.$message }}
    </p>
    <div class="form-control">
      <label class="label">
        <span class="label-text text-black">Password</span>
      </label>
      <input
        type="password"
        placeholder="password"
        class="input input-bordered bg-white text-black"
        v-model="formData.password"
      />
    </div>
    <p class="invalid" v-for="error of v$.password.$errors" :key="error.$uid">
      {{ error.$message }}
    </p>

    <div class="form-control" v-if="isRegister">
      <label class="label">
        <span class="label-text bg-white text-black"
          >Password Confirmation</span
        >
      </label>
      <input
        type="password"
        placeholder="password"
        class="input border border-blue-400 bg-white text-black"
        v-model="formData.password_confirmation"
      />
      <p class="invalid" v-for="error of v$.name.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </div>
    <p>
      {{ isRegister ? "sudah punya akun?" : "belum punya akun?" }}
      <RouterLink
        :to="isRegister ? '/login' : '/register'"
        class="text-blue-500"
        >{{ isRegister ? "Login" : "Register" }}</RouterLink
      >
    </p>

    <div class="form-control mt-6">
      <button
        class="btn btn-primary text-white font-bold"
        type="submit"
        :disabled="loading"
      >
        {{ isRegister ? "Register" : "Login" }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { authStore } from "@/stores/auth";
import { computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const rules = computed(() => {
  return {
    name: { required },
    email: { required },
    password: { required },
    password_confirmation: { required },
  };
});

const auth = authStore();
const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false,
  },
});

const formData = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const v$ = useVuelidate(rules, formData);

const onReset = () => {
  formData.name = "";
  formData.email = "";
  formData.password = "";
  formData.password_confirmation = "";
};

const onSubmit = async () => {
  // v$.value.$touch();

  // if (v$.value.$invalid) return;

  if (props.isRegister) {
    await auth.register(formData);
  } else {
    await auth.login(formData);
  }
};
</script>

<style scoped>
.invalid {
  color: red;
}
</style>
