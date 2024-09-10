import { Input } from "@/components/ui/input";
import type React from "react";

type Props = {
  state: {
    meta: number;
    matriculados: number;
    falta: number;
  };
  setState: React.Dispatch<
    React.SetStateAction<{
      meta?: number;
      matriculados?: number;
      falta?: number;
    }>
  >;
  error?: string;
};

export default function NumberDataForm({ state, setState, error }: Props) {
  function handleTextToNumber(
    e: React.ChangeEvent<HTMLInputElement>,
    typeState: "meta" | "matriculados" | "falta",
    setState: React.Dispatch<
      React.SetStateAction<{
        meta?: number;
        matriculados?: number;
        falta?: number;
      }>
    >
  ) {
    const onlyNumber = Number(e.target.value);
    if (e.target.value === "") {
      if (typeState === "meta") {
        setState({ meta: 0 });
      }
      if (typeState === "falta") {
        setState({ falta: 0 });
      }
      if (typeState === "matriculados") {
        setState({ matriculados: 0 });
      }
    }

    if (!onlyNumber) return;

    if (typeState === "meta") {
      setState({ meta: onlyNumber });
    }
    if (typeState === "falta") {
      setState({ falta: onlyNumber });
    }
    if (typeState === "matriculados") {
      setState({ matriculados: onlyNumber });
    }
  }

  return (
    <section className="border-2 p-3 border-slate-200 rounded-md">
      <label htmlFor="coop">
        <p className="w-fit text-xl mb-6">Verba Cooperada</p>

        <div className="flex gap-5">
          <p className="text-lg">Meta</p>
          <Input
            id="coop"
            type="text"
            className="w-[150px]"
            onChange={(e) => {
              return handleTextToNumber(e, "meta", setState);
            }}
            value={state.meta}
            min={0}
          />
        </div>
        {error && <span className="text-red-600">{error}</span>}
      </label>
    </section>
  );
}
