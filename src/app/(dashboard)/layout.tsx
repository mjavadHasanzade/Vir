
import { redirect } from "next/navigation";
import Navbar from "~/components/organisms/navbar";
import { getServerAuthSession } from "~/server/auth";

export default async function DahsLayout({ children }: { children: React.ReactNode; }) {

  const session = await getServerAuthSession();

  if (!session)
    redirect("/register");


  return (
    <>
      <Navbar user={{
        name: session.user.name ?? undefined,
        image: session.user.image ?? undefined
      }} />
      {children}
    </>
  );
}
