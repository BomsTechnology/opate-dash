
<script setup lang="ts">
import { MoreHorizontal } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '~/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button'


defineEmits(['setCertfied', 'setActive'])

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="$emit('setActive')">
        Active/Desactive
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="$emit('setCertfied')">Cerified/UnCerified</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>