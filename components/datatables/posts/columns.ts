import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Button from '~/components/ui/button/Button.vue';
import { ArrowUpDown } from 'lucide-vue-next';
import { Checkbox } from '@/components/ui/checkbox'
import type { Database } from '~/types/database.types';

export const columns: ColumnDef<Database["public"]["Tables"]["post"]["Row"]>[] = [
  {
    id: 'select',
    header: ({ table }) => h(Checkbox, {
        'checked': table.getIsAllPageRowsSelected(),
        'onUpdate:checked': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all',
    }),
    cell: ({ row }) => h(Checkbox, {
        'checked': row.getIsSelected(),
        'onUpdate:checked': (value: boolean) => row.toggleSelected(!!value),
        'ariaLabel': 'Select row',
    }),
    enableSorting: false,
    enableHiding: false,
},
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-left' }, 'ID'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium max-w-[100px] text-ellipsis text-nowrap overflow-hidden' }, row.getValue('id'))
    },
  },
  {
    accessorKey: 'image',
    header: () => h('div', { class: 'text-center' }, 'Image'),
    cell: ({ row }) => h('img', { class: 'h-8 object-cover w-8', src: row.getValue('image') }),
  },
  
  {
    
    accessorKey: 'title',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            class: 'flex justify-center w-full'
        }, () => ['Title', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => {
      return h('div', { class: 'text-center' }, row.getValue('title'))
    },
  },
  {
    accessorKey: 'user_id',
    header: () => h('div', { class: 'flex justify-center w-full' }, 'User'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center' }, row.getValue('user_id'))
    },
  },
  {
    accessorKey: 'category_id',
    header: () => h('div', { class: 'flex justify-center w-full' }, 'Category'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center' }, row.getValue('category_id'))
    },
  },
  {
    accessorKey: 'view',
    header: () => h('div', { class: 'flex justify-center w-full' }, 'View'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center' }, row.getValue('view'))
    },
  },
  {
    accessorKey: 'likes',
    header: () => h('div', { class: 'flex justify-center w-full' }, 'Likes'),
    cell: ({ row }) => {
      return h('div', { class: 'text-center' }, row.getValue('view'))
    },
  },
{
  id: 'actions',
  enableHiding: false,
},
]