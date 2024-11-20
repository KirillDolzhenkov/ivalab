import { memo, useMemo } from 'react';
import { Table } from 'antd';
import { ITag } from '@/pages/TagsPage/model/TagsSlice.ts';

interface TagsTableProps {
  tags: ITag[];
  onRowClick: (record: ITag) => void;
}

export const TagsTable = memo((props: TagsTableProps) => {
  const { tags, onRowClick } = props;

  const columns = useMemo(() => [{ title: 'Название', dataIndex: 'name', key: 'name' }], []);

  return (
    <Table
      dataSource={tags}
      columns={columns}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => onRowClick(record),
        style: { cursor: 'pointer' }
      })}
    />
  );
});