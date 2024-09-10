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

export default function page() {
  const [mes, setMes] = useState<string | undefined>(undefined);

  console.log(mes);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  }
  return (
    <div className="my-0 mx-auto mt-10 max-w-2xl">
      <p className="text-red-600 text-end text-sm">* Campo OBRIGATÓRIO</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <section className="flex flex-col gap-6 border-2 p-3 border-slate-200 rounded-md">
          <p className="w-fit text-xl">
            Mês do Relatório{" "}
            {!mes ? <span className="text-red-600">*</span> : ""}
          </p>
          <label htmlFor="mes">
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
          </label>
        </section>
        <section className="flex flex-col gap-6 border-2 p-3 border-slate-200 rounded-md">
          <p className="w-fit text-xl">
            Mês do Relatório{" "}
            {!mes ? <span className="text-red-600">*</span> : ""}
          </p>
          <label htmlFor="mes">
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
          </label>
        </section>
      </form>
    </div>
  );
}
