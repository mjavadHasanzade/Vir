
import Navbar from "~/components/organisms/navbar";

export default function DahsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <>
      <Navbar />
      {children}
    </>
  );
}
