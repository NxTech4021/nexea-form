'use client';

import { Allowlist } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui';
import { Input } from '@/components/ui/input';

dayjs.extend(LocalizedFormat);

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Allowlist>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'credits',
    cell: ({ row, table }) => {
      const value = row.getValue<number>('credits');
      const data = row.original;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [credit, setCredit] = useState<number>(value);

      return (
        <Input
          className='w-fit'
          onChange={(e) => {
            setCredit(parseInt(e.target.value, 10) || 0);
            (table.options.meta as any).onChange(
              parseInt(e.target.value, 10),
              data.id,
            );
          }}
          value={credit}
        />
      );
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
