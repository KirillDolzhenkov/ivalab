import { memo } from 'react';
import { Table } from 'antd';
import { ITag } from '@/pages/TagsPage/model/TagsSlice.ts';
import { useTagColumns } from '@/wigets/tagsTable/lib/hooks/useTagColumns.tsx';


interface TagsTableProps {
  tags: ITag[];
  onRowClick: (record: ITag) => void;
}

export const TagsTable = memo(({ tags, onRowClick }: TagsTableProps) => {
  const columns = useTagColumns();

  return (
    <Table
      dataSource={tags}
      columns={columns}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => onRowClick(record),
        style: { cursor: 'pointer' },
      })}
    />
  );
});
