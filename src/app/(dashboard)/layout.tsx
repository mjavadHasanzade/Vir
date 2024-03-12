
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Navbar from "~/components/organisms/navbar";
import { getServerAuthSession } from "~/server/auth";



export const metadata: Metadata = {
  title: "PWA with Next 13",
  description: "PWA application with Next 13",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Rajesh Prajapati" },
    {
      name: "Rajesh Prajapati",
      url: "https://www.linkedin.com/in/mjavadhasanzade/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};
export default async function DahsLayout({ children }: { children: React.ReactNode; }) {

  const session = await getServerAuthSession();

  // if (!session)
  //   redirect("/register");


  return (
    <>
      <Navbar user={{
        name: session?.user.name ?? "undefined",
        image: session?.user.image ?? "/icons/logo.png"
      }} />
      {children}
    </>
  );
}
