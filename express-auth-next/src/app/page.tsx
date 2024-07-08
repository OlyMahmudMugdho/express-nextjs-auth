import Image from "next/image";
import Link from "next/link";
import {isAuthenticated} from "@/utils/Auth";

export default function Home() {

  return (
    <>
      <h1>
      next page
    </h1>
    <Link href={"/login"}>Login page </Link>
    <Link href={"/protected"}>Protected Page</Link>
    </>
  );
}
