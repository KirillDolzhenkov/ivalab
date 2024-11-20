import { memo, useCallback, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { ICategory } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
import styles from './CategoryModal.module.less';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ICategory) => void;
  initialData: ICategory | null;
}

export const CategoryModal = memo((props: CategoryModalProps) => {
  const { isOpen, onClose, onSubmit, initialData } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue(initialData);
    } else {
      form.resetFields();
    }
  }, [initialData, form]);

  const handleFormSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка валидации формы:', error);
    }
  }, [form, onSubmit]);

  return (
    <Modal title="Информация о категории" open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Имя" rules={[{ required: true, message: 'Пожалуйста, введите имя категории!' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <Input />
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
