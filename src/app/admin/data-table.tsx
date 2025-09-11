'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { toast } from 'sonner';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDelete: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const onChange = async (credit: number, id: number) => {
    try {
      fetch('/api/admin/allowlist', {
        body: JSON.stringify({ credit: credit, id: id }),
        method: 'PATCH',
      })
        .then(async (data) => await data.json())
        .then((data) => toast.success(data?.message));
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedUpdate = useMemo(
    () =>
      debounce((credit: number, id: number) => {
        onChange(credit, id);
        // console.log(credit, id);
      }, 300),
    [],
  );

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),

    meta: {
      onChange: debouncedUpdate,
      onDelete: onDelete,
    },
  });

  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{
                      background: 'white',
                      boxShadow:
                        header.id === 'email'
                          ? '-2px 0 4px -4px gray inset'
                          : 'none',
                      left: header.id === 'email' ? 0 : undefined,
                      position: header.id === 'email' ? 'sticky' : 'static',
                      textAlign: header.id === 'rowNumber' ? 'center' : 'left',
                      zIndex: header.id === 'email' ? 2 : 1, // ensure it's above other columns
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                data-state={row.getIsSelected() && 'selected'}
                key={row.id}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      background: 'white',
                      boxShadow:
                        i === 1 ? '-2px 0 4px -4px gray inset' : 'none',
                      left: i === 1 ? 0 : undefined,
                      position: i === 1 ? 'sticky' : 'static',
                      zIndex: i === 1 ? 1 : 0,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='h-24 text-center' colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
