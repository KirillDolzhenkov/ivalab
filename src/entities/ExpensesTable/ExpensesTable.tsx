import { memo, useMemo } from 'react';
import { Table, Tag } from 'antd';
import { IExpense } from '@/pages/ExpensesPage/model/expensesSlice.ts';

interface ExpensesTableProps {
  expenses: IExpense[];
  onRowClick: (record: IExpense) => void;
}

export const ExpensesTable = memo((props: ExpensesTableProps) => {
  const { expenses, onRowClick } = props;
  const columns = useMemo(
    () => [
      { title: 'Дата', dataIndex: 'date', key: 'date' },
      { title: 'Категория', dataIndex: 'category', key: 'category' },
      { title: 'Описание', dataIndex: 'description', key: 'description' },
      {
        title: 'Теги',
        dataIndex: 'tags',
        key: 'tags',
        render: (tags: string[] | undefined) =>
          tags?.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          )) || '-'
      },
      { title: 'Потрачено', dataIndex: 'amount', key: 'amount' }
    ],
    []
  );

  return (
    <Table
      dataSource={expenses}
      columns={columns}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => onRowClick(record),
        style: { cursor: 'pointer' }
      })}
    />
  );
});
