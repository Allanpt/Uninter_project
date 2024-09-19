import { Input } from "@/components/ui/input";
import type React from "react";

type Props = {
  text: string;
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  typeData:
    | "Matriculados"
    | "Transferências"
    | "Documentos pendentes"
    | "Cancelados"
    | "Fluxo de Pessoas"
    | "Leads"
    | "Egressos"
    | "Wholly";
  error?: string;
};

export default function NumberDataForm({
  text,
  state,
  setState,
  typeData,
  error,
}: Props) {
  function handleTextToNumber(
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>
  ) {
    const onlyNumber = Number(e.target.value);
    if (e.target.value === "") {
      setState(0);
    }

    if (!onlyNumber) return;

    setState(onlyNumber);
  }

  return (
    <section className="border-2 p-3 border-slate-200 rounded-md">
      <label htmlFor={typeData}>
        <div className="flex gap-1">
          <p className="w-fit text-xl mb-6">{text}</p>
          {/* {(typeData === "Leads" || typeData === 'Egressos') && <p className="text-red-600 text-xl">*</p>} */}
        </div>
        <Input
          id={typeData}
          type="text"
          className="w-[150px]"
          onChange={(e) => handleTextToNumber(e, setState)}
          value={state}
          min={0}
        />
        {error && <span className="text-red-600">{error}</span>}
      </label>
    </section>
  );
}
