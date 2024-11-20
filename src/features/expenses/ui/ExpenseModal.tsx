import { memo, useCallback, useEffect} from "react";
import { Button, DatePicker, Form, Input, Modal } from "antd";
import dayjs from "dayjs";
import { IExpense } from "../model/expensesSlice";
import styles from "./ExpenseModal.module.less";

const { TextArea } = Input;

interface ExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: IExpense) => void;
    initialData: IExpense | null;
}

export const ExpenseModal = memo((props: ExpenseModalProps) => {
    const { isOpen, onClose, onSubmit, initialData } = props;
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                ...initialData,
                date: initialData.date ? dayjs(initialData.date, "DD.MM.YYYY") : null,
            });
        }
    }, [initialData, form]);

    const handleFormSubmit = useCallback(async () => {
        try {
            const values = await form.validateFields();
            onSubmit({
                ...values,
                date: values.date?.format("DD.MM.YYYY"),
            });
            onClose();
        } catch (error) {
            console.error("Ошибка валидации формы:", error);
        }
    }, [form, onSubmit, onClose]);

    return (
        <Modal
            title="Информация о расходе"
            open={isOpen}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="date"
                    label="Дата"
                    rules={[{ required: true, message: "Пожалуйста, выберите дату!" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item
                    name="category"
                    label="Категория"
                    rules={[{ required: true, message: "Пожалуйста, введите категорию!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Описание">
                    <TextArea rows={2} />
                </Form.Item>
                <Form.Item name="tags" label="Теги">
                    <Input readOnly />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Потрачено"
                    rules={[{ required: true, message: "Пожалуйста, введите сумму!" }]}
                >
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
