import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Dispatch, SetStateAction } from "react";
import { CiSearch } from "react-icons/ci";

type Props = {
  setSearchValue: Dispatch<SetStateAction<string>>;
  handleSearchAluno: VoidFunction;
};

export default function InputAlunoFilter({
  setSearchValue,
  handleSearchAluno,
}: Props) {
  return (
    <>
      <div className="flex flex-col sm:flex-row max-w-[500px] w-full gap-5">
        <label className="flex gap-1 items-center relative w-full ">
          <CiSearch size={"30px"} className="absolute left-1" />
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchAluno();
              }
            }}
            placeholder="Aluno..."
            type="text"
            className="pl-10"
          />
        </label>
        <Button
          onClick={handleSearchAluno}
          size={"lg"}
          className="bg-uninterTheme-600 hover:bg-uninterTheme-500"
        >
          Buscar
        </Button>
      </div>
    </>
  );
}
