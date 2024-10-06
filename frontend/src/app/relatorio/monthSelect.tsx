import type React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ErrorsForm } from "@/types/ErrorsForm";

type Props = {
  mes: string;
  setMes: React.Dispatch<React.SetStateAction<string>>;
  errors: ErrorsForm;
};

export default function MonthSelect({ mes, setMes,errors }: Props) {
  return (
    <section className="border-2 p-3 border-slate-200 rounded-md">
      <label htmlFor="mes">
        <p className="w-fit text-xl mb-6">
          Mês do Relatório {!mes ? <span className="text-red-600">*</span> : ""}
        </p>
        <Select onValueChange={setMes}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectItem value="1">Janeiro</SelectItem>
            <SelectItem value="2">Fevereiro</SelectItem>
            <SelectItem value="3">Março</SelectItem>
            <SelectItem value="4">Abril</SelectItem>
            <SelectItem value="5">Maio</SelectItem>
            <SelectItem value="6">Junho</SelectItem>
            <SelectItem value="7">Julho</SelectItem>
            <SelectItem value="8">Agosto</SelectItem>
            <SelectItem value="9">Setembro</SelectItem>
            <SelectItem value="10">Outubro</SelectItem>
            <SelectItem value="11">Novembro</SelectItem>
            <SelectItem value="12">Dezembro</SelectItem>
          </SelectContent>
        </Select>
        {errors.mes && mes === "" && (
          <span className="text-red-600">{errors.mes}</span>
        )}
      </label>
    </section>
  );
}
