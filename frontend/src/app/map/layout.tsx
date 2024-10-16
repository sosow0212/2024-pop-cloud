export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <div className="h-[calc(100vh-110px)] md:h-screen">{children}</div>;
}
