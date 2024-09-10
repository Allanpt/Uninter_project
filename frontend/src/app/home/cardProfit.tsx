import type { Aluno } from "@/types/Aluno";
import React from "react";

type Props = {
  data: Aluno[];
  cardType: "Recorrente" | "Total";
  name: string;
};

export default function CardProfit({ data, cardType, name }: Props) {
  return (
    <div className="flex flex-col gap-5 rounded-lg bg-uninterTheme-500 justify-center items-center p-10">
      <p className="text-white text-5xl font-bold">
        R$
        {data
          .reduce((att, current) => {
            if (cardType === "Recorrente") {
              if (current.Tipo_Servico !== "Mensalidade") return att;

              return att + current.Vl_comissao;
            }
            return att + current.Vl_comissao;
          }, 0)
          .toFixed(2)}
      </p>

      <p className="text-white text-center text-xl font-light">{name}</p>
    </div>
  );
}
