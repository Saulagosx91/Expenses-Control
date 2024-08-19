import { AmountDisplay } from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

export function BudgetTracker() {
  const { state, expensedBudget, remainingBudget, dispatch } = useBudget();
  const percentage = +((remainingBudget / state.budget) * 100).toFixed(2);

  let color = '';
  if (percentage >= 75) {
    color = '#3B82F6';
  }

  if (percentage >= 50 && percentage < 75) {
    color = '#34D399'
  }

  if (percentage >= 25 && percentage < 50) {
    color = '#FBBF24'
  }

  if (percentage < 25) {
    color = '#DC2626'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: color,
            trailColor: '#F5F5F5',
            textSize: 9
          })}
          text={`${percentage}% Disponible`}
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() => dispatch({ type: 'reset-app' }) }
        >
          Resetear APP</button>

        <AmountDisplay
          label="Presupuesto"
          amount={state.budget}
        />

        <AmountDisplay
          label="Gastado"
          amount={expensedBudget}
        />

        <AmountDisplay
          label="Disponible"
          amount={remainingBudget}
        />

      </div>
    </div>
  )
}