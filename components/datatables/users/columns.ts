import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import Button from '~/components/ui/button/Button.vue';
import { ArrowUpDown } from 'lucide-vue-next';
import { Checkbox } from '@/components/ui/checkbox'
import type { Database } from '~/types/database.types';

export const columns: ColumnDef<Database['public']['Tables']['user']['Row']>[] = [
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
    accessorKey: 'order_number',
    header: () => h('div', { class: 'text-left' }, 'Order number'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('order_number') ? row.getValue('order_number') : '---------')
    },
  },
  {
    accessorKey: 'avatar',
    header: () => h('div', { class: 'text-center' }, 'Avatar'),
    cell: ({ row }) => row.getValue('avatar') ? h('img', { class: 'h-8 object-cover w-8', src: row.getValue('avatar') }) : h('div', { class: 'text-center' }, '---------'),
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-center' }, 'Active'),
    cell: ({ row }) => {
      if(row.getValue('status')) {
        return h('div', { class: 'text-center font-medium border rounded p-0.5 border-green-500 text-green-500 uppercase text-xs' }, 'Active')
      }else{
        return h('div', { class: 'text-center font-medium border rounded p-0.5 border-red-500 text-red-500 uppercase text-xs' }, 'Not Active')
    }
  },
},
  {
    
    accessorKey: 'firstname',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            class: 'flex justify-center w-full'
        }, () => ['Firstname', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-center' }, `${row.getValue('firstname')}`),
  },
  {
    
    accessorKey: 'lastname',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            class: 'flex justify-center w-full'
        }, () => ['Lastname', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'text-center' }, `${row.getValue('lastname')}`),
  },
  {
    
    accessorKey: 'email',
    header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            class: 'flex justify-center w-full'
        }, () => ['Email', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase text-center' }, row.getValue('email') ? row.getValue('email') : '---------'),
  },
  
  {
    accessorKey: 'type',
    header: () => h('div', { class: 'text-center' }, 'Type'),
    cell: ({ row }) => {
      if(row.getValue('type') === 'admin') {
        return h('div', { class: 'text-center font-medium border rounded p-0.5 border-yellow-500 text-yellow-500 uppercase text-xs' }, row.getValue('type'))
      }
      else if(row.getValue('type') === 'doctor'){
        return h('div', { class: 'text-center font-medium border rounded p-0.5 border-blue-500 text-blue-500 uppercase text-xs' }, row.getValue('type'))
    }
      else{
        return h('div', { class: 'text-center font-medium border rounded p-0.5 border-gray-500 text-gray-500 uppercase text-xs' }, row.getValue('type'))
    }
  },
},
{
    
  accessorKey: 'phone_number',
  header: () => h('div', { class: 'text-center' }, 'Phone number'),
  cell: ({ row }) => h('div', { class: 'lowercase text-center' }, row.getValue('phone_number') ? row.getValue('phone_number') : '---------'),
},

{
    
  accessorKey: 'speciality',
  header: () => h('div', { class: 'text-center' }, 'Speciality'),
  cell: ({ row }) => h('div', { class: 'lowercase text-center' }, row.getValue('speciality') ? row.getValue('speciality') : '---------'),
},

{
  accessorKey: 'certified',
  header: () => h('div', { class: 'text-center' }, 'Type'),
  cell: ({ row }) => {
    if(row.getValue('certified')) {
      return h('div', { class: 'text-center font-medium border rounded p-0.5 border-green-500 text-green-500 uppercase text-xs' }, 'Certified')
    }else{
      return h('div', { class: 'text-center font-medium border rounded p-0.5 border-orange-500 text-orange-500 uppercase text-xs' }, 'Not certified')
  }
},

},
{
  id: 'actions',
  enableHiding: false,
},
]