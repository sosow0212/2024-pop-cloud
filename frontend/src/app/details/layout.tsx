export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="m-auto w-full p-20 lg:w-1000">{children}</div>;
}
