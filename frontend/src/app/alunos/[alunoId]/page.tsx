"use client";
import type { Aluno } from "@/types/Aluno";

import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
// import data from "../../../../mockjson.json";
import data from "../../../../../backend/prisma/seeds/comissao_janeiro.json";

import CardData from "./cardData";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi2";
import { TbBook2, TbBuildingEstate } from "react-icons/tb";
import { RiTeamLine } from "react-icons/ri";
import { LuBookCopy } from "react-icons/lu";
import { FaMoneyCheck } from "react-icons/fa";
import Link from "next/link";

export default function AlunoPage() {
  const pathName = usePathname();

  const titulo = useMemo(() => {
    if (!pathName) return;

    return Number(pathName.split("/")[2]);
  }, [pathName]);

  console.log(titulo);

  const aluno: Aluno = useMemo(() => {
    return data.find((aluno) => aluno.Titulo === titulo) as Aluno;
  }, [titulo]);

  function findKey(alunoValue: string | number) {
    if (!aluno) return;

    const findedObject = Object.entries(aluno).find(
      (entry) => entry[1] === alunoValue
    );

    if (!findedObject) return;

    return findedObject[0];
  }

  function findTurma(strTurma: string) {
    return strTurma.split(" ")[0];
  }

  function findTurmaType(strTurma: string) {
    type Turma = "GD" | "ED" | "SP" | "FP" | "FI" | "TPD" | "EJA";

    const turmaType: Turma = strTurma.split(" ")[1] as Turma;

    switch (turmaType) {
      case "GD":
        return "Graduação a Distância";
      case "ED":
        return "Especialização a Distância";
      case "SP":
        return "Semi Presencial";
      case "FP":
        return "Formação Pedagógica";
      case "FI":
        return "Formação Inicial";
      case "TPD":
        return "Técnico Profissionalizante";
      case "EJA":
        return "Educação De Jovens E Adultos";
      default:
        return "N/A";
    }
  }

  function getTitlesAluno(): Aluno[] | undefined {
    const name = aluno.Nome;
    const titlesAluno = data.filter((aluno) => aluno.Nome === name && aluno.Titulo !== titulo);

    if (titlesAluno.length < 1) return;

    return titlesAluno;
  }

  return (
    <div className="flex justify-between">
      {getTitlesAluno() && (
        <div style={{minWidth: '25%', height: '100%', marginTop: '40px'}} className="flex flex-col px-3 ml-4 items-center text-white rounded-md bg-uninterTheme-400">
          <h2 className="my-10 text-5xl">{getTitlesAluno()?.length === 1 ? 'Outro Título' : 'Outros Títulos'}</h2>
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

      <div
        style={{ maxWidth: "1300px", margin: "0 auto" }}
        className="flex justify-center items-center flex-wrap"
      >
        <CardData
          icon={<HiOutlineIdentification />}
          dataKey={findKey(aluno.RU)}
          dataValue={aluno.RU}
          width={200}
        />
        <CardData
          icon={<IoPersonOutline />}
          dataKey={findKey(aluno.Nome)}
          dataValue={aluno.Nome}
        />
        <CardData
          icon={<TbBook2 />}
          dataKey={"Curso"}
          dataValue={aluno.Nome_oficial}
        />
        <CardData
          icon={<TbBuildingEstate />}
          dataKey={"Local"}
          dataValue={aluno.Local_nome}
          width={250}
        />
        <CardData
          icon={<RiTeamLine />}
          dataKey={findKey(aluno.Turma)}
          dataValue={findTurma(aluno.Turma)}
          width={250}
        />
        <CardData
          icon={<LuBookCopy />}
          dataKey={"Tipo do curso"}
          dataValue={findTurmaType(aluno.Turma)}
          width={300}
        />
        <CardData
          icon={<FaMoneyCheck />}
          dataKey={"Serviço"}
          dataValue={aluno.Tipo_Servico}
          width={300}
        />
      </div>
    </div>
  );
}
