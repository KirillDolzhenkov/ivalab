import { memo, useCallback, useEffect } from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { IExpense } from '@/pages/ExpensesPage/model/expensesSlice.ts';
import styles from './ExpenseModal.module.less';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector.ts';
import { categoriesSelectors } from '@/pages/CategoriesPage/model/categoriesSlice.ts';
import { tagsSelectors } from '@/pages/TagsPage/model/TagsSlice.ts';

const { TextArea } = Input;

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: IExpense) => void;
  initialData: IExpense | null;
}

export const ExpenseModal = memo((props: ExpenseModalProps) => {
  const { isOpen, onClose, onSubmit, initialData } = props;
  const categories = useAppSelector(categoriesSelectors.getCategories);
  const tags = useAppSelector(tagsSelectors.getTags);
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        date: initialData.date ? dayjs(initialData.date, 'DD.MM.YYYY') : null
      });
    }
  }, [initialData, form]);

  const handleFormSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      onSubmit({
        ...values,
        date: values.date?.format('DD.MM.YYYY')
      });
      onClose();
    } catch (error) {
      console.error('Ошибка валидации формы:', error);
    }
  }, [form, onSubmit, onClose]);

  return (
    <Modal title="Информация о расходе" open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item name="date" label="Дата" rules={[{ required: true, message: 'Пожалуйста, выберите дату!' }]}>
          <DatePicker style={{ width: '100%' }} />
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
          <TextArea rows={2} />
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
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
});
