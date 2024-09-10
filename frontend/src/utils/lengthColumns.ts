import type { Aluno } from "@/types/Aluno";

export function higherCashLength(alunos: Aluno[]) {
  return alunos
    .sort(
      (a1, a2) =>
        a2.Vl_comissao.toString().length - a1.Vl_comissao.toString().length
    )[0]
    .Vl_comissao.toString().length;
}

export function higherTitleLength(alunos: Aluno[]) {
  return alunos
    .sort(
      (a1, a2) => a2.Titulo.toString().length - a1.Titulo.toString().length
    )[0]
    .Titulo.toString().length;
}

export function higherNameLength(alunos: Aluno[]) {
  return alunos.sort((a1, a2) => a2.Nome.length - a1.Nome.length)[0].Nome
    .length;
}

export function higherCourseLength(alunos: Aluno[]) {
  return alunos.sort(
    (a1, a2) => a2.Nome_oficial.length - a1.Nome_oficial.length
  )[0].Nome_oficial.length;
}
