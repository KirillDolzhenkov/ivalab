import { memo, useCallback, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { IExpense } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import styles from './ExpenseModal.module.less';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts';
import { categoriesSelectors } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
import { tagsSelectors } from '@/pages/TagsPage/model/TagsSlice.ts';
import { operationType } from '@/pages/ExpensesPage/ui/ExpensesPage.tsx';

const { TextArea } = Input;

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IExpense) => void;
  onDelete: (expenseId: string) => void;
  initialData: IExpense | null;
  operationType: operationType;
}

export const ExpenseModal = memo((props: ExpenseModalProps) => {
  const { isOpen, onClose, onSubmit, onDelete, initialData, operationType } = props;
  const categories = useAppSelector(categoriesSelectors.getCategories);
  const tags = useAppSelector(tagsSelectors.getTags);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      if (operationType === 'edit' && initialData) {
        const categoryId = categories.find((cat) => cat.name === initialData.category)?.id;
        form.setFieldsValue({
          ...initialData,
          date: initialData.date ? dayjs(initialData.date, 'DD.MM.YYYY') : null,
          tags: initialData.tags || [],
          category: categoryId
        });
      } else {
        form.resetFields();
      }
    }
  }, [isOpen, operationType, initialData, form, categories]);

  const handleFormSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      const categoryId = values.category;
      const category = categories.find((cat) => cat.id === categoryId);

      if (!category) {
        throw new Error('Категория не найдена');
      }

      onSubmit({
        ...values,
        date: values.date?.format('DD.MM.YYYY'),
        category: category.name
      });

      onClose();
    } catch (error) {
      console.error('Ошибка валидации формы:', error);
    }
  }, [form, onSubmit, onClose, categories]);

  const handleDateChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      form.setFieldsValue({ date });
    },
    [form]
  );

  const handleDelete = useCallback(() => {
    if (initialData) {
      onDelete(initialData.id);
      onClose();
    }
  }, [initialData, onDelete, onClose]);

  return (
    <Modal
      title={operationType === 'create' ? 'Создание нового расхода' : 'Редактирование расхода'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" key={initialData?.id || 'new'}>
        <Form.Item name="date" label="Дата" rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}>
          <DatePicker style={{ width: '100%' }} onChange={handleDateChange} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Категория"
          rules={[{ required: true, message: 'Пожалуйста, выберите категорию!' }]}
        >
          <Select placeholder="Выберите категорию">
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="description" label="Описание">
          <TextArea rows={2} autoComplete="off" />
        </Form.Item>

        <Form.Item name="tags" label="Теги">
          <Select mode="multiple" placeholder="Выберите теги" allowClear>
            {tags.map((tag) => (
              <Select.Option key={tag.id} value={tag.name}>
                {tag.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="amount" label="Потрачено" rules={[{ required: true, message: 'Пожалуйста, введите сумму!' }]}>
          <Input type="number" />
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
