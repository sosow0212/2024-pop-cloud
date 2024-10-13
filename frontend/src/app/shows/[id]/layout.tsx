export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto w-full px-20 py-30 md:py-50 lg:w-1000">
      {children}
    </div>
  );
}
