"use client";

import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa6";
import MappedAlunos from "./MappedAlunos";
import { SetStateAction, useCallback, useMemo, useState } from "react";
import type { Aluno } from "@/types/Aluno";
import {
  higherCashLength,
  higherCourseLength,
  higherNameLength,
  higherTitleLength,
} from "./helpers";
import InputAlunoFilter from "./InputAlunoFilter";
import CheckBoxAluno from "./CheckBoxAluno";
import DropDownColumns from "./DropDownColumns";
import type { Columns } from "@/types/Columns";

type Props = {
  alunos: Aluno[];
};

type Sort = "Up" | "Down" | "Base";
export const initialColumns: Columns[] = [
  "titulo",
  "aluno",
  "tipo",
  "comissao",
  "dataLiquidada",
  "curso",
];

function handleSort(state: Sort) {
  if (state === "Base") {
    return "Up";
  }

  if (state === "Up") {
    return "Down";
  }
  return "Base";
}

function changeSortIcon(state: Sort) {
  if (state === "Base") {
    return <FaSort />;
  }

  if (state === "Up") {
    return <FaSortUp />;
  }
  return <FaSortDown />;
}

export default function TableSort({ alunos }: Props) {
  const [sortTitulo, setSortTitulo] = useState<Sort>("Base");
  const [sortAluno, setSortAluno] = useState<Sort>("Base");
  const [sortTipo, setSortTipo] = useState<Sort>("Base");
  const [sortComissao, setSortComissao] = useState<Sort>("Base");
  const [sortDate, setSortDate] = useState<Sort>("Base");

  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState<Aluno[]>(alunos);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [columns, setColumns] = useState<Columns[]>(initialColumns);

  const handleCheckboxChange = (event: {
    target: { name: string; checked: boolean };
  }) => {
    const { name, checked } = event.target;

    if (checked) {
      setSelectedPayments((prev) => [...prev, name]);
    } else {
      setSelectedPayments((prev) => prev.filter((payment) => payment !== name));
    }
  };

  const paymentTypes = useMemo(() => {
    return Array.from(new Set(alunos.map((el) => el.Tipo_Servico)));
  }, [alunos]);

  const resetSort = useCallback(() => {
    setSortTitulo("Base");
    setSortAluno("Base");
    setSortTipo("Base");
    setSortComissao("Base");
    setSortDate("Base");
  }, []);

  function handleSearchAluno() {
    const filtered = alunos.filter((el) =>
      el.Nome.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filtered);
  }

  const sortedData = useCallback(() => {
    return [...filteredData]
      .sort((a: Aluno, b: Aluno) => {
        if (sortTitulo === "Up") {
          return b.Titulo - a.Titulo;
        }

        if (sortTitulo === "Down") {
          return a.Titulo - b.Titulo;
        }

        if (sortAluno === "Up") {
          return b.Nome.localeCompare(a.Nome);
        }

        if (sortAluno === "Down") {
          return a.Nome.localeCompare(b.Nome);
        }

        if (sortTipo === "Up") {
          return b.Tipo_Servico.localeCompare(a.Tipo_Servico);
        }

        if (sortTipo === "Down") {
          return a.Tipo_Servico.localeCompare(b.Tipo_Servico);
        }

        if (sortComissao === "Up") {
          return b.Vl_comissao - a.Vl_comissao;
        }

        if (sortComissao === "Down") {
          return a.Vl_comissao - b.Vl_comissao;
        }

        if (sortDate === "Up") {
          return b.Dt_Liquidacao.localeCompare(a.Dt_Liquidacao);
        }

        if (sortDate === "Down") {
          return a.Dt_Liquidacao.localeCompare(b.Dt_Liquidacao);
        }
        return 0;
      })
      .filter((el) => {
        if (selectedPayments.length !== 0) {
          return selectedPayments.includes(el.Tipo_Servico);
        }
        return el;
      });
  }, [
    filteredData,
    sortTitulo,
    sortAluno,
    sortTipo,
    sortComissao,
    sortDate,
    selectedPayments,
  ]);

  return (
    <div className="flex flex-col px-14 pt-0 gap-5 mt-[100px]">
      <div className="flex flex-col sm:flex-row justify-between gap-7 items-center">
        <InputAlunoFilter
          setSearchValue={setSearchValue}
          handleSearchAluno={handleSearchAluno}
        />
        <DropDownColumns tableColumn={columns} setTableColumn={setColumns} />
      </div>
      <CheckBoxAluno
        paymentTypes={paymentTypes}
        handleCheckboxChange={handleCheckboxChange}
      />
      <div className="w-full overflow-auto">
        <div className="flex flex-row justify-between mb-5">
          {columns.includes("titulo") && (
            <div
              style={{
                minWidth: higherTitleLength,
                maxWidth: higherTitleLength * 3,
              }}
              className="flex  flex-row items-center cursor-pointer transition-all px-2 duration-300 hover:bg-gray-200"
              onClick={() => {
                resetSort();
                setSortTitulo(handleSort(sortTitulo));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSortTitulo(handleSort(sortTitulo));
                }
              }}
            >
              <p>Título</p>
              {changeSortIcon(sortTitulo)}
            </div>
          )}

          {columns.includes("aluno") && (
            <div
              style={{
                minWidth: higherNameLength,
                maxWidth: higherNameLength * 3,
              }}
              className="flex flex-row  items-center cursor-pointer transition-all px-2 duration-300 hover:bg-gray-200"
              onClick={() => {
                resetSort();
                setSortAluno(handleSort(sortAluno));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSortAluno(handleSort(sortAluno));
                }
              }}
            >
              <p>Aluno</p>
              {changeSortIcon(sortAluno)}
            </div>
          )}

          {columns.includes("tipo") && (
            <div
              style={{
                minWidth: higherCashLength,
                maxWidth: higherCashLength * 3,
              }}
              className="flex flex-row  items-center cursor-pointer transition-all px-2 duration-300 hover:bg-gray-200"
              onClick={() => {
                resetSort();
                setSortTipo(handleSort(sortTipo));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSortTipo(handleSort(sortTipo));
                }
              }}
            >
              <p>Tipo</p>
              {changeSortIcon(sortTipo)}
            </div>
          )}

          {columns.includes("comissao") && (
            <div
              style={{
                minWidth: higherCashLength,
                maxWidth: higherCashLength * 3,
              }}
              className="flex flex-row  items-center cursor-pointer transition-all px-2 duration-300 hover:bg-gray-200"
              onClick={() => {
                resetSort();
                setSortComissao(handleSort(sortComissao));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSortComissao(handleSort(sortComissao));
                }
              }}
            >
              <p>Comissão</p>
              {changeSortIcon(sortComissao)}
            </div>
          )}

          {columns.includes("dataLiquidada") && (
            <div
              style={{
                minWidth: higherCashLength * 1.2,
                maxWidth: higherCashLength * 3,
              }}
              className="flex flex-row  items-center cursor-pointer transition-all px-2 duration-300 hover:bg-gray-200"
              onClick={() => {
                resetSort();
                setSortDate(handleSort(sortDate));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSortDate(handleSort(sortDate));
                }
              }}
            >
              <p>Data Liquidada</p>
              {changeSortIcon(sortDate)}
            </div>
          )}

          {columns.includes("curso") && (
            <div
              style={{
                minWidth: higherCourseLength,
                maxWidth: higherCourseLength * 3,
              }}
              className="flex flex-row items-center"
            >
              <p>Curso</p>
            </div>
          )}
        </div>
        <MappedAlunos alunos={sortedData()} columns={columns} />
      </div>
    </div>
  );
}
