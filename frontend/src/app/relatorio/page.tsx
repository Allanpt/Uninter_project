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
import CoopDataForm from "./coopDataForm";
import type {
  VerbaCooperada,
  VerbaCooperadaError,
} from "@/types/VerbaCooperada";

const formSchema = z.object({
  mes: z.string().min(1, "Selecione um Mês"),
  cancelamentos: z.number(),
  matriculas: z.number(),
  verbaCooperada: z.object({
    meta: z.number().min(1, "O número da meta deve ser maior que 1"),
    matriculados: z.number(),
    falta: z.number(),
  }),
  pendentes: z.number(),
  fluxoPessoas: z.number(),
  leads: z.number(),
});

export default function Page() {
  const [mes, setMes] = useState<string>("");
  const [cancelamentos, setCancelamentos] = useState<number>(0);
  const [matriculas, setMatriculas] = useState<number>(0);
  const [verbaCooperada, setVerbaCooperada] = useState<VerbaCooperada>({
    meta: 0,
    falta: 0,
    matriculados: 0,
  });
  const [pendentes, setPendentes] = useState<number>(0);
  const [fluxoPessoas, setFluxoPessoas] = useState<number>(0);
  const [leads, setLeads] = useState<number>(0);

  const [errors, setErrors] = useState<{
    mes?: string;
    cancelamentos?: string;
    matriculas?: string;
    verbaCooperada?: VerbaCooperadaError;
    pendentes?: string;
    fluxoPessoas?: string;
    leads?: string;
  }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = formSchema.safeParse({
      mes,
      cancelamentos,
      matriculas,
      verbaCooperada,
      pendentes,
      fluxoPessoas,
      leads,
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
        pendentes: formattedErrors.pendentes?._errors[0],
        fluxoPessoas: formattedErrors.fluxoPessoas?._errors[0],
        leads: formattedErrors.leads?._errors[0],
      });
      return;
    }

    setErrors({});
  }

  return (
    <div className="my-0 mx-auto mt-10 max-w-2xl">
      {(!mes || verbaCooperada.meta === 0 ) && (
        <p className="text-red-600 text-end text-sm">* Campo OBRIGATÓRIO</p>
      )}
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

        <CoopDataForm
          state={{
            meta: verbaCooperada.meta,
            matriculados: verbaCooperada.matriculados,
            falta: verbaCooperada.falta,
          }}
          setState={setVerbaCooperada}
          error={errors.verbaCooperada}
        />

        <NumberDataForm
          text={"Documentos pendentes, quantos faltam entregar?"}
          state={pendentes}
          setState={setPendentes}
          typeData={"Documentos pendentes"}
          error={errors.pendentes}
        />

        <NumberDataForm
          text={"Alunos cancelados no mês?"}
          state={cancelamentos}
          setState={setCancelamentos}
          typeData={"Cancelados"}
          error={errors.cancelamentos}
        />

        <NumberDataForm
          text={"Quantas matrículas foram feitas no mês?"}
          state={matriculas}
          setState={setMatriculas}
          typeData={"Matriculados"}
          error={errors.matriculas}
        />

        <NumberDataForm
          text={"Fluxo de pessoas no polo?"}
          state={fluxoPessoas}
          setState={setFluxoPessoas}
          typeData={"Fluxo de Pessoas"}
          error={errors.fluxoPessoas}
        />

        <NumberDataForm
          text={"Leads"}
          state={leads}
          setState={setLeads}
          typeData={"Leads"}
          error={errors.leads}
        />

        <NumberDataForm
          text={"Egressos"}
          state={fluxoPessoas}
          setState={setFluxoPessoas}
          typeData={"Egressos"}
          error={errors.fluxoPessoas}
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
