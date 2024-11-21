import { useMemo } from 'react';
import { ColumnsType } from 'antd/es/table';
import { ITag } from '@/pages/TagsPage/model/TagsSlice.ts';
import { TagRenderer } from '@/entities';
export const useTagColumns = () => {
  const columns: ColumnsType<ITag> = useMemo(
    () => [
      {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: (name: string, record: ITag) => <TagRenderer name={name} color={record.color} />,
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['ascend', 'descend'],
      },
    ],
    []
  );

  return columns;
};
