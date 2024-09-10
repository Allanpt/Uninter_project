"use client";
import type { Aluno } from "@/types/Aluno";
import data from "../../../mockjson.json";
import { useEffect, useState } from "react";
import CardProfit from "./cardProfit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BsCheck2All } from "react-icons/bs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const alunos: Aluno[] = data;
  const [file, setFile] = useState<File | null>(null);
  const [inputWidth, setInputWidth] = useState<number>();
  console.log(file);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      setInputWidth(150);
    }

    if (!file) setInputWidth(undefined);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor, selecione um arquivo Excel.");
      return;
    }
  };

  return (
    <div className="flex min-h-screen w-full justify-between">
      <div className="flex flex-col gap-2 ml-4">
        <h1 className="my-5 text-center text-3xl">
          Insira o relatório de comissão
        </h1>
        <form onSubmit={handleSubmit} className="relative flex gap-5 items-end">
          <div
            style={{ width: `${inputWidth ? `${inputWidth}px` : "auto"}` }}
            className="grid w-full max-w-sm items-center gap-1.5"
          >
            <Label htmlFor="comissao">Relatório de Comissão</Label>
            <div className="relative cursor-pointer">
              <Input
                id="comissao"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {inputWidth && (
                <Label
                  htmlFor="comissao"
                  className="flex absolute text-green-500 bg-slate-50 right-0 bottom-0 w-[40px] h-[40px] items-center justify-center"
                >
                  <BsCheck2All />
                </Label>
              )}
            </div>
          </div>
          <Button disabled={!inputWidth} type="submit">
            Enviar
          </Button>
        </form>
        {inputWidth && (
          <p className="bottom-[-40px] text-slate-400 text-sm cursor-default">
            {file?.name}
          </p>
        )}
      </div>
      <div className="flex flex-col min-w-[400px] gap-5 p-24">
        <CardProfit data={alunos} cardType={"Total"} name={"Receita Total"} />
        <CardProfit
          data={alunos}
          cardType={"Recorrente"}
          name={"Receita recorrente (mensalidade)"}
        />
      </div>
    </div>
  );
}
