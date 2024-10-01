export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="m-auto w-full px-20 lg:w-1200">{children}</div>;
}
