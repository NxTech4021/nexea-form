'use client';

import { Allowlist } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

// import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

dayjs.extend(LocalizedFormat);

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

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

      // const onChange = async (credit: number, id: number) => {
      //   try {
      //     fetch('/api/admin/allowlist', {
      //       body: JSON.stringify({ credit: credit, id: id }),
      //       method: 'PATCH',
      //     })
      //       .then(async (data) => await data.json())
      //       .then((data) => toast.success(data?.message));
      //   } catch (error) {
      //     console.log(error);
      //   }
      // };

      // // eslint-disable-next-line react-hooks/rules-of-hooks
      // const debouncedUpdate = useMemo(
      //   () => debounce((val: number) => onChange(val, data.id), 500),
      //   [data.id]
      // );

      // // eslint-disable-next-line react-hooks/rules-of-hooks
      // useEffect(() => {
      //   debouncedUpdate(credit);
      // }, [credit, debouncedUpdate]);

      return (
        // <div className='text-left'>
        //   <Badge variant={'secondary'}>{value}</Badge>
        // </div>
        <Input
          className='w-fit'
          onChange={(e) => {
            setCredit(parseInt(e.target.value, 10) || 0);
            table.options.meta?.onChange(parseInt(e.target.value, 10), data.id);
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
];
