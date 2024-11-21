import { useEffect, useState, useCallback } from 'react';
import { Form } from 'antd';
import type { Color } from 'antd/es/color-picker';
import type { Rule } from 'antd/es/form';
import type { ITag } from '@/pages/TagsPage/model/TagsSlice.ts';
import type { operationType } from '@/pages/TagsPage/ui/TagsPage.tsx';

type Props = {
  isOpen: boolean;
  initialData: ITag | null;
  existingTags: ITag[];
  operationType: operationType;
}
export const useTagForm = (props: Props) => {
  const { isOpen, initialData, existingTags, operationType } = props;
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

  const handleColorChange = useCallback((value: Color) => {
    const colorHex = value.toHexString();
    setColor(colorHex);
  }, []);

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
      },
    },
  ];

  return { form, color, setColor, handleColorChange, nameRules};
};
