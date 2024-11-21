import { memo, useMemo } from 'react';
import { Table, Tag } from 'antd';
import { ITag } from '@/pages/TagsPage/model/TagsSlice.ts';

interface TagsTableProps {
  tags: ITag[];
  onRowClick: (record: ITag) => void;
}

export const TagsTable = memo((props: TagsTableProps) => {
  const { tags, onRowClick } = props;
  const renderedTag = (name: string, record: ITag) => <Tag color={record.color}>{name}</Tag>;

  const columns = useMemo(
    () => [
      {
        title: 'Название',
        dataIndex: 'name',
        key: 'name',
        render: renderedTag
      }
    ],
    []
  );

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
