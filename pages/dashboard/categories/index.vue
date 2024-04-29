<script lang="ts" setup>
import { columns } from "~/components/datatables/categories/columns";
import DataTable from "~/components/datatables/categories/DataTable.vue";
import type { Database } from "~/types/database.types";
import useFiles from "~/services/useFiles";
import { useToast } from "~/components/ui/toast";
import Confirm from "~/components/modals/Confirm.vue";

definePageMeta({
  middleware: ["auth"],
});

type LanguageType = Database["public"]["Tables"]["category"]["Row"];
const supabase = useSupabaseClient<Database>();
const { uploadFile, deleteFile } = useFiles();
const { toast } = useToast();
const loading = ref(false);
const currentLanguage = ref<LanguageType | undefined>(undefined);
const update = async () => {
  console.log("update");
};
const { data: categories, refresh } = await useAsyncData(
  "categories",
  async () => {
    const { data } = await supabase.from("category").select("*");

    return data;
  }
);
const file = ref();
const open = ref(false);
const openConfirm = ref(false);
const onSubmit = async (values: any) => {
  try {
    loading.value = true;
    if (!currentLanguage && !file.value) {
      toast({
        title: "Please select an image",
        variant: "destructive",
      });
      return;
    }
    let purl = null;
    if (file.value) {
      purl = await uploadFile(file.value);
    }
    if (!currentLanguage.value) {
      const { data, error } = await supabase
        .from("category")
        .insert({ name: values.name!, image: purl?.url!, path: purl?.path! })
        .select();
    } else {
      const { data, error } = await supabase
        .from("category")
        .update({
          name: values.name!,
          iso_code: values.iso_code!,
          image: purl ? purl.url! : currentLanguage.value?.image,
          path: purl ? purl.path! : currentLanguage.value?.path,
        })
        .eq("id", currentLanguage.value?.id!)
        .select();
      await deleteFile(currentLanguage.value?.path!);
    }
    currentLanguage.value = undefined;
    refresh();
    toast({ title: "Category added successfully" });
    open.value = false;
  } catch (error) {
    toast({ title: (error as Error).message, variant: "destructive" });
  } finally {
    loading.value = false;
  }
};

async function deleteLanguage() {
  try {
    const { data, error } = await supabase
      .from("category")
      .delete()
      .eq("id", currentLanguage.value?.id!);
    if (error) throw error;
    refresh();
    openConfirm.value = false;
    await deleteFile(currentLanguage.value?.path!);
  } catch (error) {
    toast({ title: (error as Error).message, variant: "destructive" });
  }
}

async function confirmAction(id: string) {
  let item = categories.value?.find((item) => item.id === id);
  if (item) {
    currentLanguage.value = item;
    openConfirm.value = true;
  }
}

async function updateLanguage(id: string) {
  let item = categories.value?.find((item) => item.id === id);
  if (item) {
    currentLanguage.value = item;
    open.value = true;
  }
}
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="font-bold sm:text-4xl">Categories</h1>
      <Button @click="() => (open = !open)">Add category</Button>
    </div>
    <DataTable
      :data="categories!"
      :columns="columns"
      :deleteL="confirmAction"
      :update="updateLanguage"
    />
    <ModalsAddEditCategory
      :category="currentLanguage"
      :on-submit="onSubmit"
      :loading="loading"
      v-model="file"
      :open="open"
      :set-open="
        () => {
          open = !open;
          currentLanguage = undefined;
        }
      "
    />
    <Confirm :on-submit="deleteLanguage" :open="openConfirm" :set-open="
        () => {
          openConfirm = !openConfirm;
          currentLanguage = undefined;
        }
      "  />
  </div>
</template>
~/components/datatables/categories/columns