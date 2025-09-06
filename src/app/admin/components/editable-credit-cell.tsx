import { useEffect, useState } from 'react';

import { Input } from '@/components/ui';

function EditableCreditCell({ id, table, value }: any) {
  const [credit, setCredit] = useState<number>(value);

  useEffect(() => {
    setCredit(value);
  }, [value]);

  return (
    <Input
      className='w-fit'
      onChange={(e) => {
        const newValue = parseInt(e.target.value, 10) || 0;
        setCredit(newValue);
        (table.options.meta as any).onChange(newValue, id);
      }}
      value={credit}
    />
  );
}

export default EditableCreditCell;
