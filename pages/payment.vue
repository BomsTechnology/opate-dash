<template>
  <div class="container mx-auto flex flex-col justify-center items-center">
    <Card class="max-w-lg">
      <template v-if="patientPending || doctorPending ">
        <CardContent
          class="flex flex-col justify-center items-center min-w-[200px] py-10"
        >
          <div
            class="w-20 h-20 border-8 border-[#5eb0ef] rounded-full loader"
          ></div>
          <p class="text-center mt-4 italic">Chargement...</p>
        </CardContent>
      </template>
      <template v-else-if="doctorError || patientError || errors">
        <CardContent class="flex flex-col justify-center items-center">
          <img
            src="~/assets/images/error.webp"
            class="md:w-64 w-60 max-w-full"
            alt=""
          />

          <h1 class="font-bold uppercase md:text-3xl text-2xl text-center">
            Oupps !
          </h1>
          <p class="text-center mt-4">
            Oupps ! Une erreur est survenue. veillez reessayer ultérieurement
            <span class="font-bold">ou essayer de contacter le support</span>
          </p>
        </CardContent>
        <CardFooter>
          <a
            href="mailto:marcsigha@gmail.com"
            class="bg-[#5eb0ef] text-white text-center font-bold py-2 px-4 rounded mt-2 w-full"
          >
            Contacter le Support
          </a>
        </CardFooter>
      </template>
      <template v-else>
        <CardContent class="flex flex-col justify-center items-center">
          <img
            src="~/assets/images/payment.webp"
            class="md:w-64 w-60 max-w-full"
            alt=""
          />

          <h1 class="font-bold uppercase md:text-3xl text-2xl text-center">
            M2-MED Payment
          </h1>
          <p class="text-center mt-4">
            <span class="font-bold"
              >{{ patient?.firstname }} {{ patient?.lastname }}</span
            >
            vous devez payer <span class="font-bold">200 XAF</span> pour débuter
            une conversation avec
            <span class="font-bold"
              >Dr. {{ doctor?.firstname }} {{ doctor?.lastname }} ({{
                doctor?.speciality
              }})</span
            >
          </p>
        </CardContent>
        <CardFooter class="flex flex-col justify-center items-center">
          <button
            @click="pay()"
            v-if="!loading"
            type="button"
            class="bg-[#5eb0ef] text-white font-bold py-2 px-4 rounded mt-2 w-full"
          >
            Payer les frais
          </button>
          <div
            v-else
            class="w-16 h-16 border-8 border-[#5eb0ef] rounded-full loader"
          ></div>
        </CardFooter>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
const route = useRoute();
const supabase = useSupabaseClient<Database>();
const loading = ref(false);
const errors = ref(false)
const config = useRuntimeConfig()

const {
  data: doctor,
  error: doctorError,
  pending: doctorPending,
} = await useAsyncData("doctor", async () => {
  const { data } = await supabase
    .from("user")
    .select("*")
    .eq("id", route.query.doctor)
    .single();
  return data;
});

const {
  data: patient,
  error: patientError,
  pending: patientPending,
} = await useAsyncData("patient", async () => {
  const { data } = await supabase
    .from("user")
    .select("*")
    .eq("id", route.query.patient)
    .single();
  return data;
});

async function pay() {
  loading.value = true
   const { data, error } = await useFetch("https://api.notchpay.co/payments/initialize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": config.public.notchPay!
      },
      body: JSON.stringify({
        amount: 200,
        currency: "XAF",
        reference: uuidv4(),
        description: "M2-MED Payment",
        email: route.query.email || patient?.value.email,
        phone: route.query.phone || patient?.value.phone_number
      }),
},
    );

    if(error.value){
      loading.value = false
      errors.value = true
      return    
    }

    window.location.href = data.value.authorization_url
}

definePageMeta({
  layout: "login",
});
</script>

<style>
@keyframes loader-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loader {
  border-right-color: transparent;
  animation: loader-rotate 1s linear infinite;
}
</style>
