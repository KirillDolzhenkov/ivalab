import { useState } from 'react';
import { Table, Button } from 'antd';
import styles from './Categories.module.less';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts';
import { categoriesActions, categoriesSelectors, ICategory } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
import { CategoryModal } from '@/entities/CategoryModal/CategoryModal.tsx';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';
import { expensesActions } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import { SortOrder } from 'antd/es/table/interface';

export type operationType = 'create' | 'edit' | null;

export const CategoriesPage = () => {
  const categories = useAppSelector(categoriesSelectors.getCategories);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
  const [operationType, setOperationType] = useState<operationType>(null);

  const columnsData = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: ICategory, b: ICategory) => a.name.localeCompare(b.name),
      sortDirections: ['ascend' as SortOrder, 'descend' as SortOrder]
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description'
    }
  ];

  const handleOpenModal = (type: operationType, category: ICategory | null = null) => {
    setOperationType(type);
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleRowClick = (record: ICategory) => {
    handleOpenModal('edit', record);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setOperationType('create');
  };

  const handleFormSubmit = (values: ICategory) => {
    if (operationType === 'create') {
      dispatch(categoriesActions.addCategory(values));
    } else if (operationType === 'edit' && selectedCategory) {
      const oldCategoryName = selectedCategory.name;
      const newCategoryName = values.name;

      dispatch(categoriesActions.updateCategory({ ...selectedCategory, ...values }));
      dispatch(expensesActions.updateCategoryInExpenses({ oldCategoryName, newCategoryName }));
    }
    handleCloseModal();
  };

  return (
    <div className={styles.expensesWrapper}>
      <Table
        dataSource={categories}
        columns={columnsData}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: 'pointer' }
        })}
      />
      <div className={styles.createBtnWrapper}>
        <Button type="default" onClick={() => handleOpenModal('create')}>
          Создать
        </Button>
      </div>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={selectedCategory}
        operationType={operationType}
      />
    </div>
  );
};
