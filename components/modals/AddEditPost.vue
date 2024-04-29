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

        <FormField name="level">
      <FormItem class="flex flex-col" v-bind:model-value="post?.category.id">
        <FormLabel>Language</FormLabel>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                :class="cn('w-full justify-between', !values.level && 'text-muted-foreground')"
              >
                {{ values.level ? categories!.find(
                  (level) => level.id === values.level,
                )?.name : 'Select level...' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-full p-0">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="level in categories"
                    :key="level.id"
                    :value="level.name"
                    @select="() => {
                      setValues({
                        level: level.id,
                      })
                    }"
                  >
                    <Check
                      :class="cn('mr-2 h-4 w-4', level.id === values.level ? 'opacity-100' : 'opacity-0')"
                    />
                    {{ level.name }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
        
    <div class="sm:flex gap-2">
        <FormField v-slot="{ componentField }"  name="post" v-bind:model-value="post?.post">
          <FormItem>
            <FormLabel>Posts</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Posts"
                v-bind="componentField"
                class="flex-1"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }"  name="answer" v-bind:model-value="post?.answer">
          <FormItem>
            <FormLabel>Answer</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Answer"
                v-bind="componentField"
                class="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="sm:flex gap-2">
        <FormField v-slot="{ componentField }" name="word1" v-bind:model-value="post?.word1">
          <FormItem>
            <FormLabel>Posts 1</FormLabel>
            <FormControl>
              <Input
                type="text"
                v-bind="componentField"
                
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="word2" v-bind:model-value="post?.word2">
          <FormItem>
            <FormLabel>Posts 2</FormLabel>
            <FormControl>
              <Input
                type="text"
                v-bind="componentField"
                
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="word3" v-bind:model-value="post?.word3">
          <FormItem>
            <FormLabel>Posts 3</FormLabel>
            <FormControl>
              <Input
                type="text"
                v-bind="componentField"
                
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <FormField v-slot="{ componentField }" name="meaning" v-bind:model-value="post?.meaning">
          <FormItem>
            <FormLabel>Meaning</FormLabel>
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
</template>~/schemas/PostSchema
