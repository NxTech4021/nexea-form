import { Allowlist } from '@prisma/client';
import React from 'react';

import { columns } from '../columns';
import { DataTable } from '../data-table';

const EmailListView = ({
  emails,
  onDelete,
}: {
  emails: Allowlist[];
  onDelete: ({ id }: { id: number }) => Promise<null | undefined>;
}) => {
  return (
    <div className='mt-4'>
      <div className='text-md font-semibold'>List of whitelisted emails</div>

      <div className='container mx-auto py-5'>
        <DataTable columns={columns} data={emails} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default EmailListView;
