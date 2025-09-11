'use client';

import { Allowlist } from '@prisma/client';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui';

import EditableCreditCell from './components/editable-credit-cell';

dayjs.extend(LocalizedFormat);

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const columnHelper = createColumnHelper<Allowlist>();

export const columns: ColumnDef<Allowlist>[] = [
  columnHelper.display({
    cell: ({ row }) => <p className='text-center'>{row.index + 1}</p>,
    header: '#',
    id: 'rowNumber',
  }),
  {
    accessorKey: 'email',
    header: 'Email',
    id: 'email',
  },
  {
    accessorKey: 'credits',
    cell: ({ getValue, row, table }) => {
      const value = getValue();
      const id = row.original.id;

      return <EditableCreditCell id={id} table={table} value={value} />;
    },

    header: 'Credit',
  },
  {
    accessorKey: 'addedBy',
    cell: ({ row }) => {
      return <div>{row.getValue('addedBy') ?? 'None'}</div>;
    },
    header: 'Added By',
  },
  {
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      const date = dayjs(row.getValue('createdAt')).format('LLL');

      return <div>{date}</div>;
    },
    header: 'Created At',
  },
  {
    cell: ({ row, table }) => (
      <Button
        className='cursor-pointer hover:-translate-y-0.5 bg-red-50 hover:bg-red-50'
        onClick={() =>
          (table.options.meta as any).onDelete({ id: row.original.id })
        }
        size={'icon'}
        variant={'secondary'}
      >
        <Trash2 color='red' />
      </Button>
    ),
    header: 'Actions',
    id: 'actions',
  },
];
