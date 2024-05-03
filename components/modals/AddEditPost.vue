<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Database } from "~/types/database.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from '~/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PostValidationSchema } from "~/schemas/PostSchema";
//import type { Posts } from "~/types/Posts";
import { useForm } from "vee-validate";
import { Textarea } from "../ui/textarea";

const supabase = useSupabaseClient<Database>();
const props = defineProps<{
  post?: Database["public"]["Tables"]["post"]["Row"];
  onSubmit: (values: any) => Promise<void>;
    loading: boolean;
    open: boolean;
    setOpen: () => void
}>();

const { handleSubmit, setValues, values } = useForm({
  validationSchema: PostValidationSchema,
})

const model = defineModel()
const handleFile = (e: any) => {
    let files: FileList = e.target.files;
    model.value = files[0];
};

const { data: categories, refresh } = await useAsyncData(
  "categories",
  async () => {
    const { data } = await supabase.from("category").select("*");
    return data;
  }
);

const submit = handleSubmit(async (values) => {
  await props.onSubmit(values);
});
</script>

<template>
  <Dialog :open="open" modal @update:open="setOpen">

    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span v-if="!post">Add</span>
          <span v-else>Edit</span> Posts</DialogTitle
        >
        <DialogDescription>
          Enter the information below to
          <span v-if="!post">add</span>
          <span v-else>edit</span> a post
        </DialogDescription>
      </DialogHeader>
      <form class="space-y-4 overflow-hidden" @submit="submit" :validation-schema="PostValidationSchema">
        <Label for="email">Image</Label>
        <input
            @change="handleFile"
            name="file"
            id="file"
            type="file"
            class="block text-sm max-w-full border w-full p-2 rounded"
            accept="image/*"
            />
        <FormField name="category_id">
      <FormItem class="flex flex-col" v-bind:model-value="post?.category_id">
        <FormLabel>Language</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                :class="cn('w-full justify-between', !values.category_id && 'text-muted-foreground')"
              >
                {{ values.category_id ? categories!.find(
                  (category) => category.id === values.category_id,
                )?.name_fr : 'Select Category...' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-full p-0">
            <Command>
              <CommandInput placeholder="Search Category..." />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                    @select="() => {
                      setValues({
                        category_id: category.id,
                      })
                    }"
                  >
                    <Check
                      :class="cn('mr-2 h-4 w-4', category.id === values.category_id ? 'opacity-100' : 'opacity-0')"
                    />
                    {{ category.name_fr }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
        
        <FormField v-slot="{ componentField }"  name="title" v-bind:model-value="post?.title">
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Title"
                v-bind="componentField"
                class="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

      <FormField v-slot="{ componentField }" name="description" v-bind:model-value="post?.description">
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
              class="resize-none"
                v-bind="componentField"
                
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      <DialogFooter> <Button :disabled="loading"><span v-if="!loading">Save</span><span v-else>Loading...</span></Button>  </DialogFooter>
    </form>
    </DialogContent>
  </Dialog>
</template>
