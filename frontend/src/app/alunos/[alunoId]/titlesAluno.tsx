import { fetchData } from "@/lib/apiHelper";
import type { Aluno } from "@/types/Aluno";
import Link from "next/link";
import React, { useCallback } from "react";

const data = fetchData();

type Props = {
  aluno: Aluno;
  titulo: number | undefined
}

export default function TitlesAluno({aluno, titulo}: Props) {

  
  const getTitlesAluno = useCallback((): Aluno[] | undefined => {
    const name = aluno.Nome;
    const titlesAluno = data.filter((aluno) => aluno.Nome === name && aluno.Titulo !== titulo);
  
    if (titlesAluno.length < 1) return;
  
    return titlesAluno;
  }, [aluno, titulo]);

  return (
    <div>
      {getTitlesAluno() && (
        <div
          style={{ minWidth: "25%", height: "100%", marginTop: "40px" }}
          className="flex flex-col px-3 ml-4 items-center text-white rounded-md bg-uninterTheme-400"
        >
          <h2 className="my-10 text-5xl">
            {getTitlesAluno()?.length === 1 ? "Outro Título" : "Outros Títulos"}
          </h2>
          {getTitlesAluno()?.map((aluno) => (
            <Link
              href={`/alunos/${aluno.Titulo}`}
              key={aluno.Titulo}
              className="cursor-pointer text-2xl my-2 bg-uninterTheme-500 w-full text-center hover:bg-uninterTheme-300"
            >
              {aluno.Titulo}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
