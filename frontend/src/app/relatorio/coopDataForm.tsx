import { Input } from "@/components/ui/input";
import type {
  VerbaCooperada,
  VerbaCooperadaError,
} from "@/types/VerbaCooperada";
import type React from "react";
import { useMemo } from "react";

type Props = {
  state: VerbaCooperada;
  setState: React.Dispatch<React.SetStateAction<VerbaCooperada>>;
  error?: VerbaCooperadaError;
};

export default function CoopDataForm({ state, setState, error }: Props) {
  const falta = useMemo(() => {
    if (state.meta === 0) return;

    const faltaValue = state.meta - state.matriculados;

    if (faltaValue < 1) {
      setState((prev) => ({ ...prev, falta: 0 }));

      return 0;
    }

    setState((prev) => ({ ...prev, falta: faltaValue }));

    return faltaValue;
  }, [setState, state.meta, state.matriculados]);

  function handleTextToNumber(
    e: React.ChangeEvent<HTMLInputElement>,
    typeState: "meta" | "matriculados"
  ) {
    const onlyNumber = Number(e.target.value);
    if (e.target.value === "") {
      setState((prev) => ({
        ...prev,
        [typeState]: 0,
      }));
    }

    if (!onlyNumber) return;

    setState((prev) => ({
      ...prev,
      [typeState]: onlyNumber,
    }));
  }

  return (
    <section className="border-2 p-3 border-slate-200 rounded-md">
      <label htmlFor="meta">
        <p className="w-fit text-xl mb-6">
          Verba Cooperada{" "}
          {!state.meta ? <span className="text-red-600">*</span> : ""}
        </p>
        <div className="flex gap-5 items-center">
          <div className="flex gap-2 items-center">
            <p className="text-lg">Meta</p>
            <Input
              id="meta"
              type="text"
              className="w-[150px]"
              onChange={(e) => {
                return handleTextToNumber(e, "meta");
              }}
              value={state.meta}
              min={0}
            />
          </div>

          <label htmlFor="matriculados">
            <div className="flex gap-2 items-center">
              <p className="text-lg">Matriculados</p>
              <Input
                id="matriculados"
                type="text"
                className="w-[150px]"
                onChange={(e) => {
                  return handleTextToNumber(e, "matriculados");
                }}
                value={state.matriculados}
                min={0}
              />
            </div>
          </label>
          <div className="flex gap-2 items-center">
            <p className="text-lg">Falta</p>
            <p>{falta}</p>
          </div>
        </div>
        {error?.meta && state.meta === 0 && (
          <span className="text-red-600">{error?.meta}</span>
        )}
      </label>
    </section>
  );
}
