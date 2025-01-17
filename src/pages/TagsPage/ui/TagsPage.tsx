import { useState } from 'react';
import { Button } from 'antd';

import { TagModal } from '@/features/TagModal/ui/TagModal.tsx';

import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import styles from './TagsPage.module.less';
import { ITag, tagsActions, tagsSelectors } from '@/pages/TagsPage/model/TagsSlice.ts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';

import { TagsTable } from '@/entities';
import { expensesActions } from '@/pages/ExpensesPage/model/expensesSlice.ts';

export type operationType = 'create' | 'edit' | null;

export const TagsPage = () => {
  const tags = useAppSelector(tagsSelectors.getTags);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<ITag | null>(null);
  const [operationType, setOperationType] = useState<operationType>(null);

  const handleOpenModal = (type: operationType, tag: ITag | null = null) => {
    setOperationType(type);
    setSelectedTag(tag);
    setIsModalOpen(true);
  };

  const handleRowClick = (record: ITag) => {
    handleOpenModal('edit', record);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTag(null);
    setOperationType('create');
  };

  const handleFormSubmit = (values: ITag) => {
    if (operationType === 'create') {
      dispatch(tagsActions.addTag(values));
    } else if (operationType === 'edit' && selectedTag) {
      const oldTagName = selectedTag.name;
      const newTagName = values.name;

      dispatch(tagsActions.updateTag({ ...selectedTag, ...values }));
      dispatch(expensesActions.updateTagInExpenses({ oldTagName, newTagName }));
    }
    handleCloseModal();
  };

  const handleDeleteTag = (tagId: string) => {
    dispatch(tagsActions.deleteTag(tagId));
    handleCloseModal();
  };

  return (
    <div className={styles.tagsWrapper}>
      <TagsTable tags={tags} onRowClick={handleRowClick} />
      <TagModal
        existingTags={tags}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        onDelete={handleDeleteTag}
        initialData={selectedTag}
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
