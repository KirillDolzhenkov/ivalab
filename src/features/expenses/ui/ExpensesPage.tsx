import { useCallback, useState } from "react";
import {ExpensesTable} from "./ExpensesTable";
import {ExpenseModal} from "./ExpenseModal";

import { expensesSelectors, IExpense } from "../model/expensesSlice";
import styles from "./ExpensesPage.module.less";
import {Button} from "antd";
import {useAppSelector} from "@/shared/lib/hooks/useAppSelector.ts";

export const ExpensesPage = () => {
    const expenses = useAppSelector(expensesSelectors.getExpenses);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, [])

    const handleRowClick = useCallback((record: IExpense) => {
        setSelectedExpense(record);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setSelectedExpense(null);
    }, []);

    const handleFormSubmit = useCallback((values: IExpense) => {
        console.log("Сохранить данные:", values);
    }, []);

    return (
        <div className={styles.expensesWrapper}>
            <ExpensesTable expenses={expenses} onRowClick={handleRowClick} />
            <ExpenseModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit}
                initialData={selectedExpense}
            />
            <div className={styles.createBtnWrapper}>
                <Button
                    type="default"
                    onClick={handleOpenModal}
                >Создать</Button>
            </div>
        </div>
    );
};
