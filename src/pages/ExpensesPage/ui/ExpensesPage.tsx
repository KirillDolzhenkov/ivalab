import { useState } from 'react';
import { ExpensesTable } from '@/wigets/expensesTable/ui/ExpensesTable.tsx';
import { ExpenseModal } from '@/features/ExpenseModal/ui/ExpenseModal.tsx';

import { expensesActions, expensesSelectors, IExpense } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import styles from './ExpensesPage.module.less';
import { Button } from 'antd';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';

export type operationType = 'create' | 'edit' | null;

export const ExpensesPage = () => {
  const dispatch = useAppDispatch();
  const expenses = useAppSelector(expensesSelectors.getExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [operationType, setOperationType] = useState<operationType>(null);

  const handleOpenModal = (type: operationType, expense: IExpense | null = null) => {
    setOperationType(type);
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleRowClick = (record: IExpense) => {
    handleOpenModal('edit', record);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExpense(null);
    setOperationType('create');
  };

  const handleFormSubmit = (values: IExpense) => {
    if (operationType === 'create') {
      dispatch(expensesActions.addExpense(values));
    } else if (operationType === 'edit' && selectedExpense) {
      dispatch(expensesActions.updateExpense({ ...selectedExpense, ...values }));
    }
    handleCloseModal();
  };

  const handleDeleteExpense = (expenseId: string) => {
    dispatch(expensesActions.deleteExpense(expenseId));
  };

  return (
    <div className={styles.expensesWrapper}>
      <ExpensesTable expenses={expenses} onRowClick={handleRowClick} />
      <ExpenseModal
        onDelete={handleDeleteExpense}
        key={operationType}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={selectedExpense}
        operationType={operationType}
      />
      <div className={styles.createBtnWrapper}>
        <Button type="default" onClick={() => handleOpenModal('create')}>
          Создать
        </Button>
      </div>
    </div>
  );
};
