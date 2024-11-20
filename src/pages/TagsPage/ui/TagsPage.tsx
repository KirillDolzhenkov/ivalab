import { useCallback, useState } from 'react';
import { Button } from 'antd';
import { TagsTable } from '@/entities/TagsTable/TagsTable.tsx';
import { TagModal } from '@/entities/TagModal/TagModal.tsx';

import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import styles from './TagsPage.module.less';
import { ITag, tagsActions, tagsSelectors } from '@/pages/TagsPage/model/TagsSlice.ts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch.ts';

export const TagsPage = () => {
  const tags = useAppSelector(tagsSelectors.getTags);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<ITag | null>(null);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
    setSelectedTag(null);
  }, []);

  const handleRowClick = useCallback((record: ITag) => {
    setSelectedTag(record);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTag(null);
  }, []);

  const handleFormSubmit = useCallback((values: ITag) => {
    console.log('Сохранить данные тега:', values);
    dispatch(tagsActions.addTag(values));
    setIsModalOpen(false);
    setSelectedTag(null);
  }, []);

  return (
    <div className={styles.tagsWrapper}>
      <TagsTable tags={tags} onRowClick={handleRowClick} />
      <TagModal
        existingTags={tags}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        initialData={selectedTag}
      />
      <div className={styles.createBtnWrapper}>
        <Button type="default" onClick={handleOpenModal}>
          Создать
        </Button>
      </div>
    </div>
  );
};
