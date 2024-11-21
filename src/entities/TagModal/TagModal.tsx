import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Modal, ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import type { Rule } from 'antd/es/form';

import styles from './TagModal.module.less';
import { ITag } from '@/pages/TagsPage/model/TagsSlice';
import { operationType } from '@/pages/TagsPage/ui/TagsPage.tsx';

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
  const [form] = Form.useForm();
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (operationType === 'edit' && initialData) {
        form.setFieldsValue(initialData);
        setColor(initialData.color);
      } else {
        form.resetFields();
        setColor(null);
      }
    }
  }, [isOpen, operationType, initialData, form]);

  const handleFormSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onSubmit({ ...values, color: color || DEFAULT_COLOR });
      onClose();
    } catch (error) {
      console.error('Ошибка валидации формы:', error);
    }
  }, [form, onSubmit, color, onClose]);

  const handleColorChange = useCallback((value: Color) => {
    const colorHex = value.toHexString();
    setColor(colorHex);
  }, []);

  const handleDelete = useCallback(() => {
    if (initialData) {
      onDelete(initialData.id);
      onClose();
    }
  }, [initialData, onDelete, onClose]);

  const nameRules: Rule[] = [
    { required: true, message: 'Пожалуйста, введите название!' },
    {
      validator: (_, value: string) => {
        if (!value) return Promise.resolve();

        if (operationType === 'create') {
          const isDuplicate = existingTags.some((tag) => tag.name.toLowerCase() === value.trim().toLowerCase());
          if (isDuplicate) {
            return Promise.reject(new Error('Название уже существует!'));
          }
        }

        return Promise.resolve();
      }
    }
  ];

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

        <div className={styles.submitButtonWrapper}>
          <Button type="default" onClick={handleFormSubmit}>
            {operationType === 'create' ? 'Создать' : 'Сохранить'}
          </Button>
          {operationType === 'edit' && initialData && (
            <Button type="default" danger onClick={handleDelete}>
              Удалить
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
});
