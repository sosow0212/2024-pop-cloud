export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <main className="my-10 flex-1">{children}</main>
    </div>
  );
}
