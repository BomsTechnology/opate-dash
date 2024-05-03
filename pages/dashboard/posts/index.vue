<script lang="ts" setup>
import type { Database } from "~/types/database.types";
import { useToast } from "~/components/ui/toast";
import Confirm from "~/components/modals/Confirm.vue";
import type { Post } from "~/types/Post";
import { columns } from "~/components/datatables/posts/columns";
import useFiles from "~/services/useFiles";

definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseClient<Database>();
const { toast } = useToast();
const { uploadFile, deleteFile } = useFiles();
const loading = ref(false);

const currentPost = ref<Database["public"]["Tables"]["post"]["Row"] | undefined>(undefined);
const update = async () => {
  console.log("update");
};
const { data: posts, refresh } = await useAsyncData("posts", async () => {
  const { data: posts } = await supabase
    .from("post")
    .select(
      "*, user:user_id(id, firstname, lastname), category:category_id(id, name_fr, name_en)"
    );
  return posts as unknown as Post[];
});
const file = ref();
const open = ref(false);
const openConfirm = ref(false);
const onSubmit = async (values: any) => {
  try {
    loading.value = true;
    if (!currentPost.value && !file.value) {
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
    if (!currentPost.value) {
     /* const { data, error } = await supabase
        .from("post")
        .insert({
          title: values.title!,
          description: values.description!,
          category_id: values.category_id!,
          user_id: user.value?.id,
        })
        .select();*/
    } else {
      const { data, error } = await supabase
        .from("post")
        .update({
          title: values.title!,
          description: values.description!,
          category_id: values.category_id!,
          image: purl ? purl.url! : currentPost.value?.image,
          image_path: purl ? purl.path! : currentPost.value?.image_path,
        })
        .eq("id", currentPost.value?.id!)
        .select();
    }
    currentPost.value = undefined;
    refresh();
    toast({ title: "Post added successfully" });
    open.value = false;
  } catch (error) {
    toast({ title: (error as Error).message, variant: "destructive" });
  } finally {
    loading.value = false;
  }
};

async function deletePost() {
  try {
    const { data, error } = await supabase
      .from("post")
      .delete()
      .eq("id", currentPost.value?.id!);
    if (error) throw error;
    refresh();
    openConfirm.value = false;
  } catch (error) {
    toast({ title: (error as Error).message, variant: "destructive" });
  }
}

async function confirmAction(id: string) {
  let item = posts.value?.find((item) => item.id === id);
  if (item) {
    console.log(item);
    currentPost.value = item;
    openConfirm.value = true;
  }
}

async function updatePost(id: string) {
  let item = posts.value?.find((item) => item.id === id);
  if (item) {
    currentPost.value = item;
    open.value = true;
  }
}
</script>

<template>
  <div class="container mx-auto">
    <div class="flex items-center justify-between">
      <h1 class="font-bold sm:text-4xl">Posts</h1>
      <Button @click="() => (open = !open)" class=" hidden">Add Post</Button>
    </div>
    <DatatablesPostsDataTable
      :data="posts!"
      :columns="columns"
      :deleteL="confirmAction"
      :update="updatePost"
    />
    <ModalsAddEditPost
      :post="currentPost"
      :on-submit="onSubmit"
      :loading="loading"
      :open="open"
      v-model="file"
      :set-open="
        () => {
          open = !open;
          currentPost = undefined;
        }
      "
    />
    <Confirm
      :on-submit="deletePost"
      :open="openConfirm"
      :set-open="
        () => {
          openConfirm = !openConfirm;
          currentPost = undefined;
        }
      "
    />
  </div>
</template>
~/components/datatables/posts/columns~/types/Post