"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type React from "react";
import { useState } from "react";
import { z } from "zod";
import NumberDataForm from "./numberDataForm";

type VerbaCooperada = {
  meta: number;
  matriculados: number;
  falta: number;
}
type VerbaCooperadaError = {
  meta?: string;
  matriculados?: string;
  falta?: string;
}

const formSchema = z.object({
  mes: z.string().min(1, "Selecione um Mês"),
  cancelamentos: z
    .number()
    .min(0, "O número de cancelamentos deve ser no mínimo 0"),
  matriculas: z.number().min(0, "O número de matrículas deve ser no mínimo 0"),
  verbaCooperada: z.object({
    meta: z.number().min(0, "O número de matrículas deve ser no mínimo 0"),
    matriculados: z
      .number()
      .min(0, "O número de matrículas deve ser no mínimo 0"),
    falta: z.number().min(0, "O número de matrículas deve ser no mínimo 0"),
  }),
});

export default function Page() {
  const [mes, setMes] = useState<string>("");
  const [cancelamentos, setCancelamentos] = useState<number>(0);
  const [matriculas, setMatriculas] = useState<number>(0);

  const [errors, setErrors] = useState<{
    mes?: string;
    cancelamentos?: string;
    matriculas?: string;
    verbaCooperada?: VerbaCooperadaError;
  }>({});

  const [verbaCooperada, setVerbaCooperada] = useState<VerbaCooperada>({ meta: 0, falta: 0, matriculados: 0 });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = formSchema.safeParse({
      mes,
      cancelamentos,
      matriculas,
      verbaCooperada,
    });

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        mes: formattedErrors.mes?._errors[0],
        cancelamentos: formattedErrors.cancelamentos?._errors[0],
        matriculas: formattedErrors.matriculas?._errors[0],
        verbaCooperada: {
          meta: formattedErrors.verbaCooperada?.meta?._errors[0],
          matriculados:
            formattedErrors.verbaCooperada?.matriculados?._errors[0],
          falta: formattedErrors.verbaCooperada?.falta?._errors[0],
        },
      });
      return;
    }

    setErrors({});
  }

  return (
    <div className="my-0 mx-auto mt-10 max-w-2xl">
      <p className="text-red-600 text-end text-sm">* Campo OBRIGATÓRIO</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <section className="border-2 p-3 border-slate-200 rounded-md">
          <label htmlFor="mes">
            <p className="w-fit text-xl mb-6">
              Mês do Relatório{" "}
              {!mes ? <span className="text-red-600">*</span> : ""}
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

        <NumberDataForm
          text={"Alunos cancelados no mês"}
          state={cancelamentos}
          setState={setCancelamentos}
          typeData={"Cancelados"}
          error={errors.cancelamentos}
        />

        <NumberDataForm
          text={"Quantas matrículas foram feitas no mês"}
          state={matriculas}
          setState={setMatriculas}
          typeData={"Matriculados"}
          error={errors.matriculas}
        />
        <button
          type="submit"
          className="self-end bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
