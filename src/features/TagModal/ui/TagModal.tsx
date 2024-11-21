import { memo, useCallback } from 'react';
import { Modal, Form, Input, ColorPicker } from 'antd';
import styles from './TagModal.module.less';

import { operationType } from '@/pages/TagsPage/ui/TagsPage.tsx';
import { ITag } from '@/pages/TagsPage/model/TagsSlice.ts';
import { useTagForm } from '@/entities/tagModalFooter/lib/hooks/useTagForm.tsx';
import { TagModalFooter } from '@/entities';

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ITag) => void;
  onDelete: (tagId: string) => void;
  initialData: ITag | null;
  existingTags: ITag[];
  operationType: operationType;
}

const DEFAULT_COLOR = '#808080';

export const TagModal = memo((props: TagModalProps) => {
  const { isOpen, onClose, onSubmit, onDelete, initialData, existingTags, operationType } = props;

  const { form, color, handleColorChange, nameRules} = useTagForm({
    isOpen,
    initialData,
    existingTags,
    operationType,
  });

  const handleFormSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onSubmit({ ...values, color: color || DEFAULT_COLOR });
      onClose();
    } catch (error) {
      console.error('Ошибка валидации формы:', error);
    }
  }, [form, onSubmit, color, onClose]);

  const handleDelete = useCallback(() => {
    if (initialData) {
      onDelete(initialData.id);
      onClose();
    }
  }, [initialData, onDelete, onClose]);

  return (
    <Modal
      title={operationType === 'create' ? 'Создание нового тега' : 'Редактирование тега'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Название" rules={nameRules}>
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item label="Цвет">
          <ColorPicker value={color || DEFAULT_COLOR} onChange={handleColorChange} />
          {color && <div className={styles.colorPreview} style={{ backgroundColor: color }} />}
        </Form.Item>

        <TagModalFooter
          operationType={operationType}
          onSubmit={handleFormSubmit}
          onDelete={handleDelete}
          isEdit={operationType === 'edit' && !!initialData}
        />
      </Form>
    </Modal>
  );
});
