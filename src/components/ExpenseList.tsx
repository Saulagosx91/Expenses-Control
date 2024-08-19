import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail";


export function ExpenseList() {

  const { state } = useBudget();
  const filterExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory)
  : state.expenses;
  const isEmpty = useMemo(() => filterExpenses.length === 0, [filterExpenses]);

  return (
    <div className="mt-10 flex flex-col gap-4">
      <p className="text-gray-600 text-2xl font-bold">{isEmpty ? 'No hay gastos' : 'Lista de Gastos'}</p>
      {
        filterExpenses.map(expense => (
          <ExpenseDetail
            key={expense.id}
            expense={expense}
          />
        ))
      }
    </div>
  )
}