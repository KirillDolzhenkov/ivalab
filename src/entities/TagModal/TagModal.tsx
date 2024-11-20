import { memo, useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';

import styles from './TagModal.module.less';
import { ITag } from '@/pages/TagsPage/model/TagsSlice.ts';

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ITag) => void;
  initialData: ITag | null;
  existingTags: ITag[];
}

const DEFAULT_COLOR = '#808080';

export const TagModal = memo((props: TagModalProps) => {
  const { isOpen, onClose, onSubmit, initialData, existingTags } = props;
  const [form] = Form.useForm();
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
      setColor(initialData.color);
    } else {
      setColor(null);
    }
  }, [initialData, form]);

  const handleFormSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onSubmit({ ...values, color });
      onClose();
    } catch (error) {
      console.error('Ошибка валидации формы:', error);
    }
  }, [form, onSubmit, color, onClose]);

  const handleColorChange = useCallback((value: Color) => {
    const colorHex = value.toHexString();
    setColor(colorHex);
  }, []);

  return (
    <Modal title="Информация о теге" open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Название"
          rules={[
            { required: true, message: 'Пожалуйста, введите название!' },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                const isDuplicate = existingTags.some((tag) => tag.name.toLowerCase() === value.trim().toLowerCase());
                return isDuplicate ? Promise.reject(new Error('Название уже существует!')) : Promise.resolve();
              }
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Цвет">
          <ColorPicker value={color || DEFAULT_COLOR} onChange={handleColorChange} />
          {color && <div className={styles.colorPreview} style={{ backgroundColor: color }} />}
        </Form.Item>

        <div className={styles.submitButtonWrapper}>
          <Button type="default" onClick={handleFormSubmit}>
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
});