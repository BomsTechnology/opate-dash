import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Button from '~/components/ui/button/Button.vue';
import { ArrowUpDown } from 'lucide-vue-next';
import { Checkbox } from '@/components/ui/checkbox'
import type { Database } from '~/types/database.types';

export const columns: ColumnDef<Database['public']['Tables']['category']['Row']>[] = [
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
    
    accessorKey: 'name_fr',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            class: 'flex justify-center w-full'
        }, () => ['Name FR', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('name_fr')),
  },
  {
    
    accessorKey: 'name_en',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            class: 'flex justify-center w-full'
        }, () => ['Name EN', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-center' }, row.getValue('name_en')),
  },
{
  id: 'actions',
  enableHiding: false,
},
]