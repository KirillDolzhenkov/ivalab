import { Table } from 'antd';
import { IExpense } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import { useExpenseColumns } from '../lib/hooks/useExpenseColumns.tsx';

interface ExpensesTableProps {
  expenses: IExpense[];
  onRowClick: (record: IExpense) => void;
}
export const ExpensesTable = ({ expenses, onRowClick }: ExpensesTableProps) => {
  const columns = useExpenseColumns();

  return (
    <Table
      dataSource={expenses}
      columns={columns}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => onRowClick(record),
        style: { cursor: 'pointer' },
      })}
    />
  );
};
