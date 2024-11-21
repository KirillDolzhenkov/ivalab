import { memo, useCallback, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import type { Rule } from 'antd/es/form';
import { ICategory } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
import styles from './CategoryModal.module.less';
import { operationType } from '@/pages/CategoriesPage/ui/CategoriesPage.tsx';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts';
import { categoriesSelectors } from '@/pages/CategoriesPage/model/categoriesSlice.ts';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: ICategory) => void;
  initialData: ICategory | null;
  operationType: operationType;
}

export const CategoryModal = memo((props: CategoryModalProps) => {
  const { isOpen, onClose, onSubmit, initialData, operationType } = props;
  const [form] = Form.useForm();
  const existingCategories = useAppSelector(categoriesSelectors.getCategories);

  useEffect(() => {
    if (isOpen) {
      if (operationType === 'edit' && initialData) {
        form.setFieldsValue(initialData);
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, operationType, initialData, form]);

  const handleFormSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка валидации формы:', error);
    }
  }, [form, onSubmit]);

  const nameRules: Rule[] = [
    { required: true, message: 'Пожалуйста, введите название категории!' },
    {
      validator: (_, value: string) => {
        if (!value) return Promise.resolve();
        const isDuplicate = existingCategories.some(
          (category) => category.name.toLowerCase() === value.trim().toLowerCase()
        );
        return isDuplicate ? Promise.reject(new Error('Название уже существует!')) : Promise.resolve();
      }
    }
  ];

  return (
    <Modal
      title={operationType === 'create' ? 'Создание новой категории' : 'Редактирование категории'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="name" label="Название" rules={nameRules}>
          <Input autoComplete="off" />
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <Input autoComplete="off" />
        </Form.Item>

        <div className={styles.submitButtonWrapper}>
          <Button type="default" onClick={handleFormSubmit}>
            {operationType === 'create' ? 'Создать' : 'Сохранить'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
});
