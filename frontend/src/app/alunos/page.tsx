import { alunos } from "./helpers";
import TableSort from "./TableSort";


export default function Alunos() {
  return (
    <div className="flex flex-col gap-10 justify-center">
      <TableSort alunos={alunos} />
    </div>
  );
}
