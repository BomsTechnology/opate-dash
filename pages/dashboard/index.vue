<template>
  <div class="container mx-auto">
    <h1 class=" font-bold sm:text-4xl">Dashboard</h1>
    <div class=" grid sm:grid-cols-3 grid-cols-2 gap-4 mt-6">
      <NuxtLink to="/dashboard/users" class="border p-4 rounded flex justify-center items-center">
        <h2 class=" font-medium text-2xl"> {{ u?.length }} Users</h2>
      </NuxtLink>

      <NuxtLink to="/dashboard/categories" class="border p-4 rounded flex justify-center items-center">
        <h2 class=" font-medium text-2xl"> {{ l?.length }} Categories</h2>
      </NuxtLink>
      <NuxtLink to="/dashboard/posts" class="border p-4 rounded flex justify-center items-center">
        <h2 class=" font-medium text-2xl">{{ w?.length }} Posts</h2>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '~/types/database.types';

definePageMeta({
  middleware: ["auth"],
});
const supabase  = useSupabaseClient<Database>();
const u = ref<Array<Database["public"]["Tables"]["user"]["Row"]>>();
const l = ref<Array<Database["public"]["Tables"]["category"]["Row"]>>();
const w = ref<Array<Database["public"]["Tables"]["post"]["Row"]>>();
onMounted(async () => {
  const { data: users } = await supabase.from("user").select("*");
  const { data: languages } = await supabase.from("category").select("*");
  const { data: words } = await supabase.from("post").select("*");

  u.value = users!;
  l.value = languages!;
  w.value = words!;
});
</script>

<style scoped></style>
