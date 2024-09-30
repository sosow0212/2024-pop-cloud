export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="lg:w-1200 m-auto w-full px-20">{children}</div>;
}
