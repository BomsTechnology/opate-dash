<script lang="ts" setup>
import { columns } from '~/components/datatables/users/columns';
import DataTable from '~/components/datatables/users/DataTable.vue';
import { useToast } from '~/components/ui/toast';
import type { Database } from '~/types/database.types';


const { toast } = useToast();

definePageMeta({
  middleware: ["auth"],
});
const supabase  = useSupabaseClient<Database>();

const { data: users, refresh } = await useAsyncData('users', async () => {
  const { data } = await supabase.from('user').select('*');
  return data
})

const setCertified = async (id: string, state: boolean) => {
  console.log(state, id)
  try {
      const { data, error } = await supabase
        .from("user")
        .update({
          certified: !state
        })
        .eq("id",id!)
        .select();
    refresh();
    toast({ title: "Certified updated successfully" });;
  } catch (error) {
    toast({ title: (error as Error).message, variant: "destructive" });
  } 
};

const setActive = async (id: string, state: boolean) => {
  try {
      const { data, error } = await supabase
        .from("user")
        .update({
          status: !state
        })
        .eq("id",id!)
        .select();
    refresh();
    toast({ title: "Active updated successfully" });;
  } catch (error) {
    toast({ title: (error as Error).message, variant: "destructive" });
  } 
};
</script>

<template>
  <div class=" container mx-auto">
    <h1 class=" font-bold sm:text-4xl">Users</h1>
    <DataTable :data="users!" :columns="columns" :setCertfied="setCertified" :setActive="setActive" />
  </div>
</template>~/components/datatables/users/columns
