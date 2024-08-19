import { formatCurrency } from "../utils";

type AmountDisplayProps = {
  label?: string,
  amount: number
}

export function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label && `${label}: `}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}