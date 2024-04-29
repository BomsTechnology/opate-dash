<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";

const props = defineProps<{
  open: boolean;
  setOpen: () => void;
  onSubmit: (values: any) => Promise<void>;
}>();
</script>

<template>
  <Dialog :open="open" modal @update:open="setOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Delete</DialogTitle>
        <DialogDescription>
          confirm the deletion this action cannot be undone
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button type="button" variant="outline" @click="onSubmit"
          >Delete</Button
        >
        <Button type="button" @click="setOpen">Cancel</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
