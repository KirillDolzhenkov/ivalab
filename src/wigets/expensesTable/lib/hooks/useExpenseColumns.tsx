import { SortOrder } from 'antd/es/table/interface';
import dayjs from 'dayjs';
import { ColumnsType } from 'antd/es/table';
import { IExpense } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import {ExpenseRenderer} from "@/entities/expenseRenderer/ui/ExpenseRenderer";


export const useExpenseColumns = () => {
  const columns: ColumnsType<IExpense> = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date, 'DD.MM.YYYY').unix() - dayjs(b.date, 'DD.MM.YYYY').unix(),
      sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder],
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder],
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => <ExpenseRenderer tags={tags} />,
    },
    {
      title: 'Потрачено',
      dataIndex: 'amount',
      key: 'amount',
      sorter: (a, b) => a.amount - b.amount,
      sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder],
    },
  ];

  return columns;
};
