import {
  useReducer,
  createContext,
  Dispatch,
  ReactNode,
  useMemo
} from "react";

import {
  budgetReducer,
  initialState,
  BudgetActions,
  BudgetState
} from "../reducers/budget-reducer";


type BudgetContentProps = {
  state: BudgetState,
  dispatch: Dispatch<BudgetActions>
  expensedBudget:  number
  remainingBudget: number
}

type BudgetProviderProps = {
  children: ReactNode
}

export const BudgetContext = createContext<BudgetContentProps>(null!);

export function BudgetProvider({ children } : BudgetProviderProps) {

  const [state, dispatch] = useReducer(budgetReducer, initialState);
  const expensedBudget: number = useMemo(() => {
    return state.expenses.reduce((total, currentExpense) => total + currentExpense.amount, 0)
  }, [state.expenses]);
  const remainingBudget = state.budget - expensedBudget;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        expensedBudget,
        remainingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}