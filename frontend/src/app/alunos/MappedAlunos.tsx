import type { Aluno } from "@/types/Aluno";
import {
  handleDate,
  higherCashLength,
  higherCourseLength,
  higherNameLength,
  higherTitleLength,
} from "./helpers";
import type { Columns } from "@/types/Columns";
import Link from "next/link";

type Props = {
  alunos: Aluno[];
  columns: Columns[];
};

export default function MappedAlunos({ alunos, columns }: Props) {


  return (
    <div className="flex flex-col gap-3">
      {alunos.map((aluno) => (
        <Link
          key={aluno.Titulo}
          className="flex flex-row justify-between w-full bg-slate-100 cursor-pointer hover:bg-slate-50"
          href={`/alunos/${aluno.Titulo}`}
        >
          {columns.includes("titulo") && (
            <p
              style={{
                minWidth: higherTitleLength,
                maxWidth: higherTitleLength * 3,
              }}
              className="text-lg "
            >
              {aluno.Titulo}
            </p>
          )}

          {columns.includes("aluno") && (
            <div
              style={{
                minWidth: higherNameLength,
                maxWidth: higherNameLength * 3,
              }}
              className="text-lg font-semibold "
            >
              {`${aluno.Nome.split(" ")[0]} ${
                aluno.Nome.split(" ")[aluno.Nome.split(" ").length - 1]
              }`}
            </div>
          )}

          {columns.includes("tipo") && (
            <div
              style={{
                minWidth: higherCashLength,
                maxWidth: higherCashLength * 3,
              }}
              className={`text-lg font-semibold ${
                aluno.Tipo_Servico === "Mensalidade"
                  ? "text-green-600"
                  : "text-yellow-500"
              } `}
            >
              {aluno.Tipo_Servico}
            </div>
          )}

          {columns.includes("comissao") && (
            <div
              style={{
                minWidth: higherCashLength,
                maxWidth: higherCashLength * 3,
              }}
              className="text-lg font-semibold "
            >
              {" "}
              R$
              {aluno.Vl_comissao}
            </div>
          )}

          {columns.includes("dataLiquidada") && (
            <div
              style={{
                minWidth: higherCashLength * 1.2,
                maxWidth: higherCashLength * 3,
              }}
              className="text-lg font-semibold "
            >
              {handleDate(aluno.Dt_Liquidacao)}
            </div>
          )}

          {columns.includes("curso") && (
            <div
              style={{
                minWidth: higherCourseLength,
                maxWidth: higherCourseLength * 3,
              }}
              className="text-lg font-semibold -[9]"
            >
              {aluno.Nome_oficial}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
