export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full max-w-1000 p-30 sm:p-15">{children}</div>
  );
}
