import xlsx from "xlsx";
import fs from "fs";
import path from "path";

interface Aluno {
  Adm_Id: number;
  RU: number;
  Nome: string;
  Nome_oficial: string;
  Cd_turma: number;
  Turma: string;
  Tipo_Servico: string;
  Vl_Titulo: number;
  Vl_Recebido: number;
  Vl_Base_Comissao: number;
  RDC: number;
  Vl_comissao: number;
  Dt_Liquidacao: Date;
  Dt_Vencimento: Date;
  Sinal: string;
  Titulo: number;
  Cd_local: number;
  Local_nome: string;
  "Comissão para Super Polo"?: string;
}
// Carregar o arquivo Excel
const workbook = xlsx.readFile("./prisma/seeds/Comissao Janeiro.xlsx");

const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const db: Aluno[] = xlsx.utils.sheet_to_json(sheet);


const columnNameToDelete = "Comissão para Super Polo";
const admId = 99;

const updatedDb: Aluno[] = db.map((el) => {
  if (columnNameToDelete in el) {
    delete el[columnNameToDelete];
  }

  if (el.Nome_oficial.includes("CURSO SUPERIOR DE")) {
    el.Nome_oficial = el.Nome_oficial.slice(18)
  }
  const liquidacao = Number(el.Dt_Liquidacao)
  const vencimento = Number(el.Dt_Vencimento)
  const handleName = el.Nome.charAt(0) + el.Nome.slice(1).toLowerCase()
  const handleCurso = el.Nome_oficial.charAt(0) + el.Nome_oficial.slice(1).toLowerCase()

  el.Dt_Liquidacao = excelDateToJSDate(liquidacao)
  el.Dt_Vencimento = excelDateToJSDate(vencimento)
  el.Adm_Id = admId
  el.Nome = handleName.split(' ').map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
  el.Nome_oficial = handleCurso.split(' ').map((el) => el.charAt(0).toUpperCase() + el.slice(1)).join(' ')
  return el;
});


const jsonFilePath = path.join(__dirname, "comissao_janeiro.json");

fs.writeFileSync(jsonFilePath, JSON.stringify(updatedDb, null, 2), "utf-8");


function excelDateToJSDate(serial: number) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial) + 0.0000001;
  let total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;
  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
}

