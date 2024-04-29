<script lang="ts" setup>
import { columns } from '~/components/datatables/users/columns';
import DataTable from '~/components/datatables/users/DataTable.vue';
import type { Database } from '~/types/database.types';

definePageMeta({
  middleware: ["auth"],
});
const supabase  = useSupabaseClient<Database>();

const { data: users } = await useAsyncData('users', async () => {
  const { data } = await supabase.from('user').select('*');
  return data
})
</script>

<template>
  <div class=" container mx-auto">
    <h1 class=" font-bold sm:text-4xl">Users</h1>
    <DataTable :data="users!" :columns="columns" :deleteL="() => {}" :update="() => {}" />
  </div>
</template>~/components/datatables/users/columns
