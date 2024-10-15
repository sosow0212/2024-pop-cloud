export default function MapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="my-10 flex-1">{children}</div>
    </div>
  );
}
