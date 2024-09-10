"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathName = usePathname();

  const getLinkClass = (path: string) => {
    const bothStyle = "duration-200 font-bold text-base ";
    const resStyle =
      pathName?.includes(path)
        ? "relative text-white after:absolute after:left-0 after:bottom-[-20px] after:w-full after:h-[2px] after:bg-white"
        : "text-gray-400 hover:text-white";

    return bothStyle + resStyle;
  };

  if (pathName === "/login") return;

  return (
    <nav className="flex gap-10 bg-uninterTheme-600 p-5 box-border">
      <Link href="/home">
        <Image
          src="/uninter-logo-1.png"
          alt="Uninter Logo"
          width={100}
          height={21}
          priority
        />
      </Link>
      <div className="flex gap-4">
        <Link href="/home" className={getLinkClass("/home")}>
          Home
        </Link>
        <Link href="/alunos" className={getLinkClass("/alunos")}>
          Alunos
        </Link>
        <Link href="/relatorio" className={getLinkClass("/relatorio")}>
          Relatório
        </Link>
      </div>
      <Link
        href="login"
        className="duration-200 font-bold text-base text-gray-400 hover:text-white "
      >
        Login
      </Link>
    </nav>
  );
};

export default NavBar;
