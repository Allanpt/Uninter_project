import type { Aluno } from "@/types/Aluno";
import { fetchData } from "@/lib/apiHelper";
import CardProfit from "./cardProfit";
import PutFile from "./putFile";
import { useMemo } from "react";

const data = fetchData();

export default function Home() {

  const alunos = useMemo(() => {
    return data as Aluno[];
  }, []);
  
  return (
    <div className="flex min-h-screen w-full justify-between">
      <PutFile/>

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
