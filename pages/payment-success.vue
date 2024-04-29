<template>
  <div
    class="container mx-auto flex flex-col items-center justify-center space-y-8 text-center sm:max-w-lg"
  >
    <template v-if="errors">
      <img
        src="~/assets/images/error.webp"
        class="md:w-64 w-60 max-w-full"
        alt=""
      />

      <h1 class="font-bold uppercase md:text-3xl text-2xl text-center">
        Oupps !
      </h1>
      <p class="text-center mt-4">
        Oupps ! Une erreur est survenue pendant la tentative de paiement.
        veillez reessayer ultérieurement
        <span class="font-bold">ou essayer de contacter le support</span>
      </p>
      <a
        href="mailto:marcsigha@gmail.com"
        class="bg-[#5eb0ef] text-white text-center font-bold py-2 px-4 rounded mt-2 w-full"
      >
        Contacter le Support
      </a>
    </template>
    <template v-else>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        class="md:w-32 md:h-32 w-24 h-24 text-green-500"
        fill="currentColor"
      >
        <path
          d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"
        />
      </svg>
      <h2 class="mb-8 md:text-3xl text-2xl font-extrabold">
        Confirmation de Paiement
      </h2>
      <p class="text-gray-500 mt-4 mb-8">
        Nous avons bien reçu votre paiement. Vous pourrez débuter la
        conversation dans quelques instants veillez patienter...
      </p>
      <div
        class="w-12 h-12 border-8 border-[#5eb0ef] rounded-full loader"
      ></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Database } from "~/types/database.types";

const errors = ref(false);
const route = useRoute();
const config = useRuntimeConfig();
const supabase = useSupabaseClient<Database>();

await useFetch(`https://api.notchpay.co/payments/${route.query.reference}`, {
  method: "GET",
  headers: {
    Authorization: config.public.notchPay!,
  },
  onRequestError: ({ request, options, error }) => {
    errors.value = true;
  },
  onResponse: async ({ request, response, options }) => {
    const doctor = localStorage.getItem("doctor")!;
    const patient = localStorage.getItem("patient")!; 
    if (patient &&  doctor && response._data.transaction?.status === "complete") {
      const { data, error } = await supabase
        .from("payment")
        .insert({
          doctor_id: doctor,
          user_id: patient,
          payment_reference: route.query.reference! as string,
        id: response._data.transaction?.merchant_reference!
        })
        .select("*")
        .single();
      if (error) errors.value = true;
      console.log(data);
    } else {
      errors.value = true;
    }
    window.localStorage.removeItem("doctor");
    window.localStorage.removeItem("patient");
  },
});

definePageMeta({
  layout: "login",
});
</script>

<style scoped></style>
