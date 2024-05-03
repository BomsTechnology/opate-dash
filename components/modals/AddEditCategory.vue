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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { CategoryValidationSchema } from "~/schemas/CategorySchema";

const props = defineProps<{
  category?: Database["public"]["Tables"]["category"]["Row"];
  onSubmit: (values: any) => Promise<void>;
    loading: boolean;
    open: boolean;
    setOpen: () => void
}>();

const model = defineModel()
const handleFile = (e: any) => {
    let files: FileList = e.target.files;
    model.value = files[0];
};

</script>

<template>
  <Dialog :open="open" modal @update:open="setOpen">

    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          <span v-if="!category">Add</span>
          <span v-else>Edit</span> Category</DialogTitle
        >
        <DialogDescription>
          Enter the information below to
          <span v-if="!category">add</span>
          <span v-else>edit</span> a category
        </DialogDescription>
      </DialogHeader>
      <Form class="space-y-4 overflow-hidden" @submit="onSubmit" :validation-schema="CategoryValidationSchema">
        <Label for="email">Image</Label>
        <input
            @change="handleFile"
            name="file"
            id="file"
            type="file"
            required
            class="block text-sm max-w-full border w-full p-2 rounded"
            accept="image/*"
            />
            
        <FormField v-slot="{ componentField }" name="name_fr" v-bind:model-value="category?.name_fr">
          <FormItem>
            <FormLabel>Name FR</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="French"
                v-bind="componentField"
                
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="name_en" v-bind:model-value="category?.name_en">
          <FormItem>
            <FormLabel>Name EN</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="English"
                v-bind="componentField"
                
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      <DialogFooter> <Button :disabled="loading"><span v-if="!loading">Save</span><span v-else>Loading...</span></Button>  </DialogFooter>
    </Form>
    </DialogContent>
  </Dialog>
</template>
