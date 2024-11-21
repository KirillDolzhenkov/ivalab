import { Table, Tag } from 'antd';
import { IExpense } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts';
import { tagsSelectors } from '@/pages/TagsPage/model/TagsSlice.ts';
import { SortOrder } from 'antd/es/table/interface';
import dayjs from 'dayjs';

interface ExpensesTableProps {
  expenses: IExpense[];
  onRowClick: (record: IExpense) => void;
}

export const ExpensesTable = (props: ExpensesTableProps) => {
  const { expenses, onRowClick } = props;
  const getTagByName = useAppSelector(tagsSelectors.getTagByName);

  const renderTags = (tags: string[] | undefined) =>
    tags?.map((tag) => {
      const tagData = getTagByName(tag);
      return (
        <Tag key={tag} color={tagData?.color}>
          {tag}
        </Tag>
      );
    }) || '';

  const columns = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: IExpense, b: IExpense) => dayjs(a.date, 'DD.MM.YYYY').unix() - dayjs(b.date, 'DD.MM.YYYY').unix(),
      sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder]
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      sorter: (a: IExpense, b: IExpense) => a.category.localeCompare(b.category),
      sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder]
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      key: 'tags',
      render: renderTags
    },
    {
      title: 'Потрачено',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a: IExpense, b: IExpense) => a.amount - b.amount,
      sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder]
    }
  ];

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
};
