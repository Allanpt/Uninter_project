"use client";
import React, { useCallback, useMemo } from "react";
import CardData from "./cardData";
import { LuBookCopy } from "react-icons/lu";
import { FaMoneyCheck } from "react-icons/fa6";
import { RiTeamLine } from "react-icons/ri";
import { TbBook2, TbBuildingEstate } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi2";
import TitlesAluno from "./titlesAluno";
import type { Aluno } from "@/types/Aluno";
import { usePathname } from "next/navigation";
import { fetchData } from "@/lib/apiHelper";

const data = fetchData();

export default function AlunoDetails() {
  const pathName = usePathname();

  const titulo = useMemo(() => {
    if (!pathName) return;

    return Number(pathName.split("/")[2]);
  }, [pathName]);

  const aluno: Aluno = useMemo(() => {
    return data.find((aluno) => aluno.Titulo === titulo) as Aluno;
  }, [titulo]);

  const findKey = useCallback(
    (alunoValue: string | number) => {
      if (!aluno) return;

      const findedObject = Object.entries(aluno).find(
        (entry) => entry[1] === alunoValue
      );

      if (!findedObject) return;

      return findedObject[0];
    },
    [aluno]
  );

  const findTurma = useCallback((strTurma: string) => {
    return strTurma.split(" ")[0];
  }, []);

  const findTurmaType = useCallback((strTurma: string) => {
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
  }, []);

  return (
    <div>
      <TitlesAluno aluno={aluno} titulo={titulo} />
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
