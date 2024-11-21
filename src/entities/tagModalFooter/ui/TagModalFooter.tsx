import { Button } from 'antd';
import styles from '../../../features/TagModal/ui/TagModal.module.less';
import { operationType } from '@/pages/TagsPage/ui/TagsPage.tsx';

interface TagModalFooterProps {
  operationType: operationType;
  onSubmit: () => void;
  onDelete?: () => void;
  isEdit: boolean;
}

export const TagModalFooter = ({ operationType, onSubmit, onDelete, isEdit }: TagModalFooterProps) => (
  <div className={styles.submitButtonWrapper}>
    <Button type="default" onClick={onSubmit}>
      {operationType === 'create' ? 'Создать' : 'Сохранить'}
    </Button>
    {isEdit && onDelete && (
      <Button type="default" danger onClick={onDelete}>
        Удалить
      </Button>
    )}
  </div>
);
