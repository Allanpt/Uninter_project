import type { Aluno } from "@/types/Aluno";
import { fetchData } from "@/lib/apiHelper";

const data = fetchData();

export const alunos: Aluno[] = data;

export function handleDate(dateStr: string) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
}

export const higherCashLength = alunos
  .sort(
    (a1, a2) =>
      a2.Vl_comissao.toString().length - a1.Vl_comissao.toString().length
  )[0]
  .Vl_comissao.toString().length * 26;

export const higherTitleLength = alunos
  .sort(
    (a1, a2) => a2.Titulo.toString().length - a1.Titulo.toString().length
  )[0]
  .Titulo.toString().length * 13;

export const higherNameLength = alunos.sort(
  (a1, a2) => a2.Nome.length - a1.Nome.length
)[0].Nome.length * 5;

export const higherCourseLength = alunos.sort(
  (a1, a2) => a2.Nome_oficial.length - a1.Nome_oficial.length
)[0].Nome_oficial.length * 9;
