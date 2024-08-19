import { PropsWithChildren } from "react";

export function ErrorMesage({ children }: PropsWithChildren) {
  return (
      <p className="bg-red-200 p-2 text-red-600 font-bold text-sm text-center uppercase border-l-4 border-l-red-600">
        {children}
      </p>
  )
}