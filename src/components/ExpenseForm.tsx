import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css';
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import type { DraftExpense } from "../types";
import type { Value } from "../types";
import { ErrorMesage } from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";


export function ExpenseForm() {

  const [expense, setExpense] = useState<DraftExpense>({
    name: '',
    amount: 0,
    category: '',
    date: new Date()
  });

  const [error, setError] = useState('');
  const { state, dispatch, remainingBudget } = useBudget();
  const [previousAmanount, setPreviousAmount] = useState(0);

  useEffect(() => {
    if (state.editingId) {
      const editigExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0];
      setExpense(editigExpense);
      setPreviousAmount(editigExpense.amount);
    }
  }, [state.editingId])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmountField = name === 'amount';
    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value
    })

  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios');
      return;
    }

    if (expense.amount - previousAmanount > remainingBudget) {
      setError('El gasto se sale del presupuesto');
      return;
    }

    if (state.editingId) {
      dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } });
    }

    setPreviousAmount(0);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend
        className="uppercase text-center text-2xl font-black border-b-4 py-2 border-blue-500"
      >
        {state.editingId ? 'Editar Gasto' : 'Nuevo Gasto'}
      </legend>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-xl"
        >Nombre Gasto:</label>
        <input
          type="text"
          id="name"
          placeholder="Ingrese el nombre del gasto"
          className="bg-slate-100 p-2"
          name="name"
          value={expense.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="amount"
          className="text-xl"
        >Cantidad:</label>
        <input
          type="number"
          id="amount"
          placeholder="Ingrese la cantidad del gasto"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount === 0 ? '' : expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="category"
          className="text-xl"
        >Categoria:</label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="" disabled>--Seleccione la categoria--</option>
          {
            categories.map(category => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))
          }
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="date"
          className="text-xl"
        >Fecha Gasto:</label>
        <DatePicker
          id="date"
          className="bg-slate-100 p-2 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      {
        error && (
          <ErrorMesage>{error}</ErrorMesage>
        )
      }

      <input
        type="submit"
        className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value="Registrar Gasto"
      />

    </form>
  )
}