import { Button } from "@/components/ui/button";
import {
  DropdownMenuCheckboxItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Columns } from "@/types/Columns";
import { ChevronDown } from "lucide-react";
import React, { type Dispatch, type SetStateAction } from "react";

type Props = {
  tableColumn: Columns[];
  setTableColumn: Dispatch<SetStateAction<Columns[]>>;
};

const initialColumns: Columns[] = [
  "titulo",
  "aluno",
  "tipo",
  "comissao",
  "dataLiquidada",
  "curso",
];

function cleanColumns(columns: Columns[]) {
  return columns.map((el) => {
    let cleanWord = "";
    for (let i = 0; i < el.length; i++) {
      if (el[i + 1]) {
        if (el[i + 1] === el[i + 1].toUpperCase()) {
          cleanWord = `${cleanWord + el[i]} `;
          continue;
        }
      }

      cleanWord += el[i];
    }

    return cleanWord;
  });
}

function strToColumns(str: string): Columns | undefined {
  let finalWord = str;

  if (str.split(" ").length > 1) {
    const doubleWords = str.split(" ");
    const firstWord = doubleWords[0];
    const secondWord = doubleWords[1].charAt(0) + doubleWords[1].slice(1);
    finalWord = `${firstWord}${secondWord}`;
  }

  if (initialColumns.find((el) => el === finalWord)) {
    return initialColumns.find((el) => el === finalWord);
  }
}

export default function DropDownColumns({
  tableColumn,
  setTableColumn,
}: Props) {
  const cleanTableColumn = cleanColumns(tableColumn);

  return (
    <div className="self-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Colunas <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {cleanColumns(initialColumns).map((column) => (
            <DropdownMenuCheckboxItem
              checked={cleanTableColumn.includes(column)}
              key={column}
              className="capitalize"
              onCheckedChange={(value) => {

                const strToColumnType = strToColumns(column);

                if (!strToColumnType) return;

                console.log('aqui');
                
                if (!value) {
                  setTableColumn((state) =>
                    state.filter((el) => el !== strToColumns(column))
                  );
                } else {
                  setTableColumn((state) => [...state, strToColumnType]);
                }
              }}
            >
              {column}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
