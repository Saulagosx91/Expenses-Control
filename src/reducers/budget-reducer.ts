import { Category, DraftExpense, Expense } from "../types"
import { v4 as uuidv4 } from "uuid";

export type BudgetActions =
  { type: 'add-budget', payload: { budget: number } } |
  { type: 'display-modal' } |
  { type: 'close-modal' } |
  { type: 'add-expense', payload: { expense: DraftExpense } } |
  { type: 'remove-expense', payload: { id: Expense['id'] } } |
  { type: 'get-expense-by-id', payload: { id: Expense['id'] } } |
  { type: 'update-expense', payload: { expense: Expense } } |
  { type: 'reset-app' } |
  { type: 'add-filter-category', payload: { id: Category['id'] } }


export type BudgetState = {
  budget: number,
  modal: boolean,
  expenses: Expense[],
  editingId: Expense['id'],
  currentCategory: Category['id']
}

const initialBudget = (): number => {
  const localStorageBudget = localStorage.getItem('budget');
  return localStorageBudget ? +localStorageBudget : 0;
}

const initialExpenses = (): Expense[] => {
  const localStorageExpenses = localStorage.getItem('expenses');
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  editingId: '',
  currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {
    ...draftExpense,
    id: uuidv4()
  }
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  const { type } = action;

  switch (type) {
    case 'add-budget': {
      return {
        ...state,
        budget: action.payload.budget
      }
    }

    case 'display-modal': {
      return {
        ...state,
        modal: true
      }
    }

    case 'close-modal': {
      return {
        ...state,
        modal: false,
        editingId: ''
      }
    }

    case 'add-expense': {
      const expense = createExpense(action.payload.expense);
      return {
        ...state,
        expenses: [...state.expenses, expense],
        modal: false
      }
    }

    case 'remove-expense': {
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
      }
    }

    case 'get-expense-by-id': {
      return {
        ...state,
        editingId: action.payload.id,
        modal: true
      }
    }

    case 'update-expense': {
      return {
        ...state,
        expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
        modal: false,
        editingId: ''
      }
    }

    case 'reset-app': {
      localStorage.removeItem('budget');
      localStorage.removeItem('expenses');
      return {
        ...state,
        budget: initialBudget(),
        modal: false,
        expenses: initialExpenses(),
        editingId: ''

      }
    }

    case 'add-filter-category': {
      return {
        ...state,
        currentCategory: action.payload.id
      }
    }
  }

}