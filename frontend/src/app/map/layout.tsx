import MapHeader from "./_components/map-header";

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <MapHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
