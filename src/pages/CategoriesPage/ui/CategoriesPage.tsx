import { useState, useCallback } from 'react';
import { Table, Button } from 'antd';
import styles from './Categories.module.less';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts';
import { categoriesSelectors, ICategory } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
import { CategoryModal } from '@/entities/CategoriesModal/CategoriesModal.tsx';

export const CategoriesPage = () => {
  const categories = useAppSelector(categoriesSelectors.getCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  const columnsData = [
    { title: 'Имя', dataIndex: 'name', key: 'name' },
    { title: 'Описание', dataIndex: 'description', key: 'description' }
  ];

  const handleRowClick = useCallback((record: ICategory) => {
    setSelectedCategory(record);
    setIsModalOpen(true);
  }, []);

  const handleOpenModal = useCallback(() => {
    setSelectedCategory(null); // Новый объект, если создание
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  }, []);

  const handleFormSubmit = useCallback(
    (values: ICategory) => {
      console.log('Сохранить данные категории:', values);
      handleCloseModal();
    },
    [handleCloseModal]
  );

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
        <Button type="default" onClick={handleOpenModal}>
          Создать
        </Button>
      </div>
      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={selectedCategory}
      />
    </div>
  );
};
