import InputLoginForm from "@/components/InputLoginForm";
import Image from "next/image";


export default function Login() {

  return (
    <div className="flex min-h-screen flex-col items-center p-24 gap-20" >
      <Image
        src="/uninter-logo-2.png"
        alt="Vercel Logo"
        width={500}
        height={103}
        priority
      />

      <form method="get" className="flex flex-col gap-5 w-full items-center">
        <InputLoginForm placeholder="Email" type="email"/>
        <InputLoginForm placeholder="Senha" type="password"/>
      </form>
    </div>
  );
}
