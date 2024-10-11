export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <main className="mt-10 flex-1">{children}</main>
    </div>
  );
}
