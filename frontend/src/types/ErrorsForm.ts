import type { VerbaCooperadaError } from "./VerbaCooperada";

export type ErrorsForm = {
  mes?: string;
  cancelamentos?: string;
  matriculas?: string;
  verbaCooperada?: VerbaCooperadaError;
  pendentes?: string;
  fluxoPessoas?: string;
  leads?: string;

}