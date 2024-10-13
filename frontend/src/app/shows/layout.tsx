export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="m-auto h-screen w-full p-25 md:p-30">{children}</div>;
}
