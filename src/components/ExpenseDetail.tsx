import { Expense } from "../types";
import { formatDate } from "../utils";
import { AmountDisplay } from "./AmountDisplay";
import { categories } from "../data/categories";
import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css"

export function ExpenseDetail({ expense }: { expense: Expense }) {
  const categoryInfo = useMemo(() => categories.filter(category => category.id === expense.category), [expense]);
  const { dispatch } = useBudget();

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => { dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}}
      >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex items-center gap-5">
          <div>
            <img src={`/icono_${categoryInfo[0].icon}.svg`} alt="icono gasto" className="w-20" />
          </div>

          <div className="">
            <p className=" ">{categoryInfo[0].name}</p>
            <p>{expense.name}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>

          <AmountDisplay
            amount={expense.amount}
          />

        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}