import { memo, useMemo } from 'react';
import { Table, Tag } from 'antd';
import { ITag } from '@/pages/TagsPage/model/TagsSlice.ts';
import { SortOrder } from 'antd/es/table/interface';

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
        render: renderedTag,
        sorter: (a: ITag, b: ITag) => a.name.localeCompare(b.name),
        sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder]
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
