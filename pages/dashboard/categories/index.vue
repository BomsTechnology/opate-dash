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

type CategoryType = Database["public"]["Tables"]["category"]["Row"];
const supabase = useSupabaseClient<Database>();
const { uploadFile, deleteFile } = useFiles();
const { toast } = useToast();
const loading = ref(false);
const currentCategory = ref<CategoryType | undefined>(undefined);

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
    if (!currentCategory.value && !file.value) {
      toast({
        title: "Please select an image",
        variant: "destructive",
      });
      loading.value = false;
      return;
    }
    let purl = null;
    if (file.value) {
      purl = await uploadFile(file.value);
    }
    if (!currentCategory.value) {
      const { data, error } = await supabase
        .from("category")
        .insert({ name_fr: values.name_fr!, name_en: values.name_en!, image: purl?.url!, image_path: purl?.path! })
        .select();
    } else {
      const { data, error } = await supabase
        .from("category")
        .update({
          name_fr: values.name_fr!, name_en: values.name_en!,
          image: purl ? purl.url! : currentCategory.value?.image,
          image_path: purl ? purl.path! : currentCategory.value?.image_path,
        })
        .eq("id", currentCategory.value?.id!)
        .select();
      await deleteFile(currentCategory.value?.image_path!);
    }
    currentCategory.value = undefined;
    refresh();
    toast({ title: "Category added successfully" });
    open.value = false;
  } catch (error) {
    toast({ title: (error as Error).message, variant: "destructive" });
  } finally {
    loading.value = false;
  }
};

async function deleteCategory() {
  try {
    const { data, error } = await supabase
      .from("category")
      .delete()
      .eq("id", currentCategory.value?.id!);
    if (error) throw error;
    refresh();
    openConfirm.value = false;
    await deleteFile(currentCategory.value?.image_path!);
  } catch (error) {
    toast({ title: (error as Error).message, variant: "destructive" });
  }
}

async function confirmAction(id: string) {
  let item = categories.value?.find((item) => item.id === id);
  if (item) {
    currentCategory.value = item;
    openConfirm.value = true;
  }
}

async function updateCategory(id: string) {
  let item = categories.value?.find((item) => item.id === id);
  if (item) {
    currentCategory.value = item;
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
      :update="updateCategory"
    />
    <ModalsAddEditCategory
      :category="currentCategory"
      :on-submit="onSubmit"
      :loading="loading"
      v-model="file"
      :open="open"
      :set-open="
        () => {
          open = !open;
          currentCategory = undefined;
        }
      "
    />
    <Confirm :on-submit="deleteCategory" :open="openConfirm" :set-open="
        () => {
          openConfirm = !openConfirm;
          currentCategory = undefined;
        }
      "  />
  </div>
</template>
~/components/datatables/categories/columns